import { postService } from '$lib/supabase.js';
import { isErrorType } from '$lib/utils/error.js';

// 서버 사이드에서 데이터 로드
export async function load() {
	try {
		// 최신 포스트와 추천 포스트를 병렬로 가져오기
		const [recentPosts, featuredPosts] = await Promise.all([
			postService.getPosts(4, 0),
			postService.getFeaturedPosts(2)
		]);

		return {
			recentPosts,
			featuredPosts
		};
	} catch (err) {
		console.error('Error loading posts:', err);
		
		// 데이터베이스 테이블이 없는 경우 등은 빈 배열로 처리 (사용자 경험 우선)
		if (isErrorType(err, 'database')) {
			const errorMessage = err instanceof Error ? err.message : String(err);
			if (errorMessage.includes('relation') || errorMessage.includes('does not exist')) {
				return {
					recentPosts: [],
					featuredPosts: []
				};
			}
		}
		
		// 기타 심각한 에러는 에러 페이지로 리다이렉트
		// 하지만 메인 페이지는 사용자 경험을 위해 가능한 한 빈 배열로 처리
		return {
			recentPosts: [],
			featuredPosts: []
		};
	}
} 
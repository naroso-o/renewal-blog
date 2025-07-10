import { postService } from '$lib/supabase.js';

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
	} catch (error) {
		console.error('Error loading posts:', error);
		return {
			recentPosts: [],
			featuredPosts: []
		};
	}
} 
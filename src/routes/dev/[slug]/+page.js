import { postService } from '$lib/supabase.js';
import { isSupabaseError } from '$lib/types.js';
import { createNotFoundError, handleDatabaseError } from '$lib/utils/error.js';

// 동적 라우트는 prerender하지 않음
export const prerender = false;

export async function load({ params }) {
	try {
		const post = await postService.getPostBySlug(params.slug);

		return {
			post
		};
	} catch (err) {
		console.error('Error loading post:', err);
		
		if (isSupabaseError(err) && err.code === 'PGRST116') {
			createNotFoundError('포스트');
		}

		// 데이터베이스 관련 에러 처리
		handleDatabaseError(err, '포스트 불러오기');
	}
}

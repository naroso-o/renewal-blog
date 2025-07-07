import { postService } from '$lib/supabase.js';
import { error } from '@sveltejs/kit';
import { isSupabaseError } from '$lib/types.js';

export async function load({ params }) {
	try {
		const post = await postService.getPostBySlug(params.slug);

		return {
			post
		};
	} catch (err) {
		// 타입 가드를 사용한 안전한 에러 처리
		if (isSupabaseError(err) && err.code === 'PGRST116') {
			// 포스트를 찾을 수 없음
			throw error(404, '포스트를 찾을 수 없습니다.');
		}

		console.error('Error loading post:', err);
		throw error(500, '포스트를 불러오는 중 오류가 발생했습니다.');
	}
}

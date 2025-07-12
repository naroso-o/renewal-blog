// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 빌드 시점 오류 방지를 위한 더미 클라이언트
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : createClient('https://dummy.supabase.co', 'dummy-key');

// 관리자 관련 함수들
export const adminService = {
	// 현재 사용자가 관리자인지 확인
	async isAdmin() {
		const {
			data: { user }
		} = await supabase.auth.getUser();
		if (!user) return false;

		const { data, error } = await supabase
			.from('admin_users')
			.select('id, role, is_active')
			.eq('user_id', user.id)
			.eq('is_active', true)
			.single();

		if (error || !data) return false;
		return true;
	},

	// 현재 사용자가 슈퍼 관리자인지 확인
	async isSuperAdmin() {
		const {
			data: { user }
		} = await supabase.auth.getUser();
		if (!user) return false;

		const { data, error } = await supabase
			.from('admin_users')
			.select('id, role, is_active')
			.eq('user_id', user.id)
			.eq('role', 'super_admin')
			.eq('is_active', true)
			.single();

		console.log("super admin", data);
		if (error || !data) return false;
		return true;
	},
};

// 포스트 관련 함수들
export const postService = {
	// 새 포스트 생성
	async createPost(postData) {
		// slug 생성 (제목을 기반으로)
		const slug = postData.title
			.toLowerCase()
			.replace(/[^a-z0-9가-힣\s]/g, '')
			.replace(/\s+/g, '-')
			.trim();

		const { data, error } = await supabase
			.from('posts')
			.insert({
				title: postData.title,
				content: postData.content,
				slug: slug,
				excerpt: postData.content.substring(0, 150) + '...',
				tags: postData.tags || [],
				status: 'published',
				published_at: postData.published_at,
				view_count: 0,
				featured: false
			})
			.select()
			.single();

		if (error) throw error;
		return data;
	},

	// 발행된 포스트 목록 가져오기 (최신순)
	async getPosts(limit = 10, offset = 0) {
		const { data, error } = await supabase
			.from('posts')
			.select('id, title, slug, excerpt, tags, created_at, published_at, view_count, featured, thumbnail')
			.eq('status', 'published')
			.order('published_at', { ascending: false })
			.range(offset, offset + limit - 1);

		if (error) throw error;
		return data;
	},

	// 특정 포스트 상세 정보 가져오기
	async getPostBySlug(slug) {
		const { data, error } = await supabase
			.from('posts')
			.select('*')
			.eq('slug', slug)
			.eq('status', 'published')
			.single();

		if (error) throw error;

		// 조회수 증가
		await supabase
			.from('posts')
			.update({ view_count: data.view_count + 1 })
			.eq('id', data.id);

		return { ...data, view_count: data.view_count + 1 };
	},

	// 태그별 포스트 가져오기
	async getPostsByTag(tag, limit = 10) {
		const { data, error } = await supabase
			.from('posts')
			.select('id, title, slug, excerpt, tags, created_at, published_at')
			.contains('tags', [tag])
			.eq('status', 'published')
			.order('published_at', { ascending: false })
			.limit(limit);

		if (error) throw error;
		return data;
	},

	// 추천 포스트 가져오기
	async getFeaturedPosts(limit = 3) {
		const { data, error } = await supabase
			.from('posts')
			.select('id, title, slug, excerpt, tags, created_at, published_at')
			.eq('status', 'published')
			.eq('featured', true)
			.order('published_at', { ascending: false })
			.limit(limit);

		if (error) throw error;
		return data;
	},

	// 검색
	async searchPosts(query, limit = 10) {
		const { data, error } = await supabase
			.from('posts')
			.select('id, title, slug, excerpt, tags, created_at, published_at')
			.or(`title.ilike.%${query}%, content.ilike.%${query}%`)
			.eq('status', 'published')
			.order('published_at', { ascending: false })
			.limit(limit);

		if (error) throw error;
		return data;
	},

	// 모든 태그 가져오기
	async getAllTags() {
		const { data, error } = await supabase.from('posts').select('tags').eq('status', 'published');

		if (error) throw error;

		// 모든 태그를 평면화하고 중복 제거
		const allTags = data.flatMap((post) => post.tags || []);
		return [...new Set(allTags)].sort();
	}
};

// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 빌드 시점 오류 방지를 위한 더미 클라이언트
export const supabase =
	supabaseUrl && supabaseKey
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

		console.log('super admin', data);
		if (error || !data) return false;
		return true;
	}
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
			.select(
				'id, title, slug, excerpt, tags, created_at, published_at, view_count, featured, thumbnail'
			)
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

export const pieceService = {
	// 일상 블로그 글 목록 가져오기
	async getPieces(limit = 10, offset = 0) {
		const { data, error } = await supabase
			.from('pieces')
			.select(
				'id, title, slug, tags, created_at, published_at, view_count, featured, thumbnail'
			)
			.eq('status', 'published')
			.order('published_at', { ascending: false })
			.range(offset, offset + limit - 1);

		if (error) throw error;
		return data;
	},

	// 새 일상 블로그 글 생성
	async createPiece(pieceData) {
		// slug 생성 (제목을 기반으로)
		const slug = pieceData.title
			.toLowerCase()
			.replace(/[^a-z0-9가-힣\s]/g, '')
			.replace(/\s+/g, '-')
			.trim();

		const { data, error } = await supabase
			.from('pieces')
			.insert({
				title: pieceData.title,
				content: pieceData.content,
				slug: slug,
				excerpt: pieceData.excerpt || pieceData.content.substring(0, 150) + '...',
				tags: pieceData.tags || [],
				status: 'published',
				published_at: pieceData.published_at || new Date().toISOString(),
				view_count: 0,
				featured: pieceData.featured || false,
				thumbnail: pieceData.thumbnail
			})
			.select()
			.single();

		if (error) throw error;
		return data;
	},

	// 특정 일상 블로그 글 상세 정보 가져오기
	async getPieceBySlug(slug) {
		const { data, error } = await supabase
			.from('pieces')
			.select('*')
			.eq('slug', slug)
			.eq('status', 'published')
			.single();

		if (error) throw error;

		// 조회수 증가
		await supabase
			.from('pieces')
			.update({ view_count: data.view_count + 1 })
			.eq('id', data.id);

		return { ...data, view_count: data.view_count + 1 };
	},

	// 추천 일상 블로그 글 가져오기
	async getFeaturedPieces(limit = 3) {
		const { data, error } = await supabase
			.from('pieces')
			.select('id, title, slug, tags, created_at, published_at, thumbnail')
			.eq('status', 'published')
			.eq('featured', true)
			.order('published_at', { ascending: false })
			.limit(limit);

		if (error) throw error;
		return data;
	}
};

// 댓글 관련 함수들
export const commentService = {
	// 댓글 목록 가져오기
	async getComments(postId) {
		const { data, error } = await supabase
			.from('comments')
			.select('*')
			.eq('post_id', postId)
			.order('created_at', { ascending: true });

		if (error) throw error;
		return data;
	},

	// 익명 댓글 생성
	async createAnonymousComment(postId, content, authorName, passwordHash) {
		const { data, error } = await supabase
			.from('comments')
			.insert({
				post_id: postId,
				content,
				author_name: authorName,
				author_type: 'anonymous',
				password_hash: passwordHash,
				created_at: new Date().toISOString()
			})
			.select()
			.single();

		if (error) throw error;
		return data;
	},

	// GitHub 댓글 생성
	async createGithubComment(postId, content, githubUser) {
		console.log('GitHub 댓글 생성 시도:', githubUser);

		// GitHub 사용자 ID 안전하게 추출
		const githubUserId = githubUser.id || githubUser.sub || githubUser.user_id;
		if (!githubUserId) {
			throw new Error('GitHub 사용자 ID를 찾을 수 없습니다.');
		}

		const { data, error } = await supabase
			.from('comments')
			.insert({
				post_id: postId,
				content,
				author_name: githubUser.name || githubUser.login || githubUser.user_name || '익명',
				author_type: 'github',
				github_user_id: githubUserId.toString(),
				github_username: githubUser.login || githubUser.user_name || githubUser.preferred_username,
				github_avatar_url: githubUser.avatar_url || githubUser.picture,
				created_at: new Date().toISOString()
			})
			.select()
			.single();

		if (error) throw error;
		return data;
	},

	// 댓글 수정
	async updateComment(commentId, content) {
		const { data, error } = await supabase
			.from('comments')
			.update({
				content,
				updated_at: new Date().toISOString(),
				is_edited: true
			})
			.eq('id', commentId)
			.select()
			.single();

		if (error) throw error;
		return data;
	},

	// 댓글 삭제
	async deleteComment(commentId) {
		const { error } = await supabase.from('comments').delete().eq('id', commentId);

		if (error) throw error;
	},

	// 익명 댓글 권한 확인
	async verifyAnonymousComment(commentId, passwordHash) {
		const { data, error } = await supabase
			.from('comments')
			.select('password_hash')
			.eq('id', commentId)
			.eq('author_type', 'anonymous')
			.single();

		if (error) throw error;
		return data && data.password_hash === passwordHash;
	},

	// GitHub 댓글 권한 확인
	async verifyGithubComment(commentId, githubUserId) {
		const { data, error } = await supabase
			.from('comments')
			.select('github_user_id')
			.eq('id', commentId)
			.eq('author_type', 'github')
			.single();

		if (error) throw error;
		return data && data.github_user_id === githubUserId.toString();
	},

	// 댓글 개수 가져오기
	async getCommentCount(postId) {
		const { count, error } = await supabase
			.from('comments')
			.select('*', { count: 'exact', head: true })
			.eq('post_id', postId);

		if (error) throw error;
		return count || 0;
	}
};

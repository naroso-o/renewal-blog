export interface SupabaseError {
	code?: string;
	message?: string;
	details?: string;
	hint?: string;
}

export interface Post {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	content?: string;
	date?: string;
	view_count: number;
	tags?: string[];
	featured?: boolean;
	thumbnail?: string;
	created_at: string;
	updated_at?: string;
	published_at?: string;
}

// 댓글 관련 타입 정의
export interface Comment {
	id: string;
	post_id: string;
	content: string;
	author_name: string;
	author_type: 'anonymous' | 'github';
	github_user_id?: string;
	github_username?: string;
	github_avatar_url?: string;
	password_hash?: string; // 익명 댓글의 비밀번호 해시
	created_at: string;
	updated_at?: string;
	is_edited?: boolean;
}

export interface CommentInput {
	content: string;
	author_name: string;
	password?: string; // 익명 댓글용 비밀번호
}

export interface CommentActionRequest {
	comment_id: string;
	password?: string; // 익명 댓글 수정/삭제 시 필요
}

// 타입 가드 함수
export function isSupabaseError(error: unknown): error is SupabaseError {
	return typeof error === 'object' && error !== null && 'code' in error;
}

// 또는 더 간단한 방법
export function getErrorCode(error: unknown): string | null {
	if (error && typeof error === 'object' && 'code' in error) {
		return (error as { code: string }).code;
	}
	return null;
}

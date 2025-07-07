export interface SupabaseError {
	code?: string;
	message?: string;
	details?: string;
	hint?: string;
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

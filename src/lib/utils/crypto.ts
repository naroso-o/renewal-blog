// 비밀번호 해싱 및 검증을 위한 유틸리티 함수들

/**
 * 비밀번호를 해싱합니다.
 * @param password 원본 비밀번호
 * @returns 해싱된 비밀번호
 */
export async function hashPassword(password: string): Promise<string> {
	const encoder = new TextEncoder();
	const data = encoder.encode(password);
	const hash = await crypto.subtle.digest('SHA-256', data);
	return Array.from(new Uint8Array(hash))
		.map(b => b.toString(16).padStart(2, '0'))
		.join('');
}

/**
 * 비밀번호를 검증합니다.
 * @param password 입력된 비밀번호
 * @param hash 저장된 해시
 * @returns 검증 결과
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
	const hashedInput = await hashPassword(password);
	return hashedInput === hash;
}

/**
 * 랜덤 ID 생성
 * @returns 랜덤 ID 문자열
 */
export function generateRandomId(): string {
	return crypto.randomUUID();
} 
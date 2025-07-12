/**
 * 날짜를 한국어 형식으로 포맷팅
 */
export function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString('ko-KR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

/**
 * 상대적인 시간 표시 (예: 1시간 전, 2일 전)
 */
export function formatRelativeTime(dateString: string): string {
	const now = new Date();
	const date = new Date(dateString);
	const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

	if (diffInHours < 1) return '방금 전';
	if (diffInHours < 24) return `${diffInHours}시간 전`;

	const diffInDays = Math.floor(diffInHours / 24);
	if (diffInDays < 7) return `${diffInDays}일 전`;

	return formatDate(dateString);
} 
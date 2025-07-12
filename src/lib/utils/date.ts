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
 * Date 객체를 받아 상대적인 시간 표시 (예: 1시간 전, 2일 전)
 */
export function formatDistanceToNow(date: Date): string {
	const dateFormatted = new Date(date);
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - dateFormatted.getTime()) / 1000);

	if (diffInSeconds < 60) return '방금 전';
	
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
	
	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) return `${diffInHours}시간 전`;

	const diffInDays = Math.floor(diffInHours / 24);
	if (diffInDays < 7) return `${diffInDays}일 전`;
	
	const diffInWeeks = Math.floor(diffInDays / 7);
	if (diffInWeeks < 4) return `${diffInWeeks}주 전`;
	
	const diffInMonths = Math.floor(diffInDays / 30);
	if (diffInMonths < 12) return `${diffInMonths}개월 전`;
	
	const diffInYears = Math.floor(diffInDays / 365);
	return `${diffInYears}년 전`;
} 
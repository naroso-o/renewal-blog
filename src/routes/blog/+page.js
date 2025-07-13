import { pieceService } from '$lib/supabase.js';
import { isErrorType, handleDatabaseError } from '$lib/utils/error.js';

export async function load({ url }) {
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = 10;
  const offset = (page - 1) * limit;
  
  try {
    const [pieces] = await Promise.all([
      pieceService.getPieces(limit, offset),
    ]);
    
    return {
      pieces,
      currentPage: page,
      hasMore: pieces.length === limit
    };
  } catch (err) {
    console.error('Error loading pieces:', err);
    
    // 데이터베이스 테이블이 없는 경우 등은 빈 배열로 처리
    if (isErrorType(err, 'database')) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      if (errorMessage.includes('relation') || errorMessage.includes('does not exist')) {
        return {
          pieces: [],
          currentPage: 1,
          hasMore: false
        };
      }
    }
    
    // 기타 데이터베이스 에러는 에러 페이지로 리다이렉트
    handleDatabaseError(err, '일상 블로그 데이터 불러오기');
	}
}
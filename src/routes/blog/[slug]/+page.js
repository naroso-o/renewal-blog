import { pieceService } from '$lib/supabase.js';
import { error } from '@sveltejs/kit';
import { isErrorType, handleDatabaseError } from '$lib/utils/error.js';

export async function load({ params }) {
  const { slug } = params;
  
  try {
    const piece = await pieceService.getPieceBySlug(slug);
    
    if (!piece) {
      throw error(404);
    }
    
    return {
      piece
    };
  } catch (err) {
    console.error('Error loading piece:', err);
    
    // 404 에러는 그대로 전달
    if (err && typeof err === 'object' && 'status' in err && err.status === 404) {
      throw err;
    }
    
    // 데이터베이스 테이블이 없는 경우 등의 처리
    if (isErrorType(err, 'database')) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      if (errorMessage.includes('relation') || errorMessage.includes('does not exist')) {
        throw error(404);
      }
    }
    
    // 기타 데이터베이스 에러는 에러 페이지로 리다이렉트
    handleDatabaseError(err, '블로그 포스트 불러오기');
  }
}

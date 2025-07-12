import { error } from '@sveltejs/kit';
import { errorCodes } from '../consts/errors.js';

/**
 * 표준화된 에러 객체를 생성합니다.
 */
export function createError(
	status: number,
	message: string,
	code?: string,
	details?: string
): never {
	return error(status, {
		message,
		code: code || `HTTP_${status}`,
		details: details || message
	});
}

/**
 * 404 Not Found 에러를 생성합니다.
 */
export function createNotFoundError(resource: string = '페이지'): never {
	return createError(
		errorCodes.NOT_FOUND,
		`${resource}를 찾을 수 없습니다.`,
		'NOT_FOUND',
		`요청하신 ${resource}가 존재하지 않거나 삭제되었습니다.`
	);
}

/**
 * 500 Internal Server Error를 생성합니다.
 */
export function createServerError(message: string = '서버 오류가 발생했습니다.', details?: string): never {
	return createError(
		errorCodes.INTERNAL_SERVER_ERROR,
		message,
		'INTERNAL_SERVER_ERROR',
		details
	);
}

/**
 * 403 Forbidden 에러를 생성합니다.
 */
export function createForbiddenError(message: string = '접근 권한이 없습니다.'): never {
	return createError(
		errorCodes.FORBIDDEN,
		message,
		'FORBIDDEN',
		'이 리소스에 접근할 권한이 없습니다.'
	);
}

/**
 * 401 Unauthorized 에러를 생성합니다.
 */
export function createUnauthorizedError(message: string = '인증이 필요합니다.'): never {
	return createError(
		errorCodes.UNAUTHORIZED,
		message,
		'UNAUTHORIZED',
		'로그인이 필요한 페이지입니다.'
	);
}

/**
 * 400 Bad Request 에러를 생성합니다.
 */
export function createBadRequestError(message: string = '잘못된 요청입니다.', details?: string): never {
	return createError(
		errorCodes.BAD_REQUEST,
		message,
		'BAD_REQUEST',
		details
	);
}

/**
 * 데이터베이스 관련 에러를 처리합니다.
 */
export function handleDatabaseError(err: unknown, context: string = '데이터베이스 작업'): never {
	const errorMessage = err instanceof Error ? err.message : String(err);
	
	// 테이블이 존재하지 않는 경우
	if (errorMessage.includes('relation') && errorMessage.includes('does not exist')) {
		return createServerError(
			'데이터베이스가 초기화되지 않았습니다.',
			'관리자에게 문의하여 데이터베이스를 설정해주세요.'
		);
	}
	
	// 연결 오류
	if (errorMessage.includes('connection') || errorMessage.includes('connect')) {
		return createServerError(
			'데이터베이스 연결에 실패했습니다.',
			'일시적인 네트워크 문제일 수 있습니다. 잠시 후 다시 시도해주세요.'
		);
	}
	
	// 권한 오류
	if (errorMessage.includes('permission') || errorMessage.includes('unauthorized')) {
		return createForbiddenError('데이터베이스 접근 권한이 없습니다.');
	}
	
	// 기타 데이터베이스 에러
	return createServerError(
		`${context} 중 오류가 발생했습니다.`,
		errorMessage
	);
}

/**
 * 에러가 특정 타입인지 확인합니다.
 */
export function isErrorType(err: unknown, type: 'network' | 'database' | 'permission' | 'validation'): boolean {
	const errorMessage = err instanceof Error ? err.message : String(err);
	
	switch (type) {
		case 'network':
			return errorMessage.includes('fetch') || 
			       errorMessage.includes('network') || 
			       errorMessage.includes('timeout');
		
		case 'database':
			return errorMessage.includes('relation') || 
			       errorMessage.includes('database') || 
			       errorMessage.includes('connection');
		
		case 'permission':
			return errorMessage.includes('permission') || 
			       errorMessage.includes('unauthorized') || 
			       errorMessage.includes('forbidden');
		
		case 'validation':
			return errorMessage.includes('validation') || 
			       errorMessage.includes('invalid') || 
			       errorMessage.includes('required');
		
		default:
			return false;
	}
}

/**
 * 안전한 에러 메시지를 생성합니다 (민감한 정보 제거).
 */
export function sanitizeErrorMessage(err: unknown, fallback: string = '알 수 없는 오류가 발생했습니다.'): string {
	if (!(err instanceof Error)) {
		return fallback;
	}
	
	const message = err.message;
	
	// 민감한 정보가 포함된 경우 일반적인 메시지 반환
	if (message.includes('password') || 
	    message.includes('token') || 
	    message.includes('secret') || 
	    message.includes('key')) {
		return fallback;
	}
	
	return message || fallback;
} 
import { dev } from '$app/environment';

/** @type {import('@sveltejs/kit').HandleServerError} */
export async function handleError({ error, event, status, message }) {
	const errorId = crypto.randomUUID();
	const errorObj = error instanceof Error ? error : new Error(message || 'Unknown error');
	
	// 에러 로깅
	console.error('🚨 Unexpected Error:', {
		errorId,
		status,
		message: errorObj.message || message,
		stack: errorObj.stack,
		url: event.url.href,
		method: event.request.method,
		userAgent: event.request.headers.get('user-agent'),
		timestamp: new Date().toISOString()
	});

	// 개발 환경에서는 더 자세한 정보 제공
	if (dev) {
		return {
			message: errorObj.message || message || 'Internal Server Error',
			code: 'UNEXPECTED_ERROR',
			details: `Error ID: ${errorId}\nURL: ${event.url.href}\nMethod: ${event.request.method}\nStack: ${errorObj.stack || 'No stack trace available'}`
		};
	}

	// 프로덕션에서는 보안을 위해 제한된 정보만 제공
	return {
		message: '예상치 못한 오류가 발생했습니다.',
		code: 'UNEXPECTED_ERROR',
		details: `문제가 계속 발생하면 다음 오류 ID를 관리자에게 전달해주세요: ${errorId}`
	};
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	// 요청 로깅 (개발 환경에서만)
	if (dev) {
		console.log(`📍 ${event.request.method} ${event.url.pathname}`);
	}

	try {
		const response = await resolve(event);
		return response;
	} catch (error) {
		console.error('🚨 Handle Error:', error);
		throw error;
	}
} 
export const errors = {
	UNAUTHORIZED: 'UNAUTHORIZED',
	FORBIDDEN: 'FORBIDDEN',
	NOT_FOUND: 'NOT_FOUND',
	BAD_REQUEST: 'BAD_REQUEST',
	INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
} as const;

export const errorMessages = {
	[errors.UNAUTHORIZED]: 'Unauthorized',
	[errors.FORBIDDEN]: 'Forbidden',
	[errors.NOT_FOUND]: 'Not Found',
	[errors.BAD_REQUEST]: 'Bad Request',
	[errors.INTERNAL_SERVER_ERROR]: 'Internal Server Error'
} as const;

export const errorCodes = {
	[errors.UNAUTHORIZED]: 401,
	[errors.FORBIDDEN]: 403,
	[errors.NOT_FOUND]: 404,
	[errors.BAD_REQUEST]: 400,
	[errors.INTERNAL_SERVER_ERROR]: 500
} as const;

//----------------------------------------------------------------
//------------------------POSTS ERRORS----------------------------
//----------------------------------------------------------------

export const postErrors = {
	DB_NOT_INITIALIZED: 'DB_NOT_INITIALIZED',
	POSTS_FETCH_ERROR: 'POSTS_FETCH_ERROR',
	POST_CREATE_ERROR: 'POST_CREATE_ERROR',
	POST_UPDATE_ERROR: 'POST_UPDATE_ERROR',
	POST_DELETE_ERROR: 'POST_DELETE_ERROR',
	PERMISSION_DENIED: 'PERMISSION_DENIED',
	DB_CONNECTION_ERROR: 'DB_CONNECTION_ERROR'
} as const;

export const postErrorMessages = {
	[postErrors.DB_NOT_INITIALIZED]: 'Database is not initialized.',
	[postErrors.POSTS_FETCH_ERROR]: 'An error occurred while fetching posts.',
	[postErrors.POST_CREATE_ERROR]: 'An error occurred while creating post.',
	[postErrors.POST_UPDATE_ERROR]: 'An error occurred while updating post.',
	[postErrors.POST_DELETE_ERROR]: 'An error occurred while deleting post.',
	[postErrors.PERMISSION_DENIED]: 'Permission denied.',
	[postErrors.DB_CONNECTION_ERROR]: 'Database connection error.'
} as const;

export const postErrorCodes = {
	[postErrors.DB_NOT_INITIALIZED]: 503,
	[postErrors.POSTS_FETCH_ERROR]: 500,
	[postErrors.POST_CREATE_ERROR]: 500,
	[postErrors.POST_UPDATE_ERROR]: 500,
	[postErrors.POST_DELETE_ERROR]: 500,
	[postErrors.PERMISSION_DENIED]: 403,
	[postErrors.DB_CONNECTION_ERROR]: 503
} as const;

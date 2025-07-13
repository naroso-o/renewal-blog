export const POST_STATUS = {
	DRAFT: 'draft',
	PUBLISHED: 'published'
} as const;

export type PostStatus = typeof POST_STATUS[keyof typeof POST_STATUS];

export const POST_STATUS_OPTIONS = [
	{ value: POST_STATUS.DRAFT, label: '초안' },
	{ value: POST_STATUS.PUBLISHED, label: '발행' }
]; 
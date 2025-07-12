export interface PostMetadata {
	title: string;
	excerpt?: string;
	published_at?: string;
	created_at: string;
	updated_at: string;
	tags?: string[];
}

/**
 * 포스트 메타데이터를 기반으로 SEO 정보 생성
 */
export function generateSEOData(post: PostMetadata) {
	return {
		title: `${post.title} - naroso-o.blog`,
		description: post.excerpt || post.title,
		openGraph: {
			title: post.title,
			description: post.excerpt || post.title,
			type: 'article',
			publishedTime: post.published_at || post.created_at,
			modifiedTime: post.updated_at,
			tags: post.tags || []
		}
	};
}

/**
 * 포스트 상태 정보 생성
 */
export function generatePostStatus(post: PostMetadata) {
	return {
		isUpdated: post.updated_at !== post.created_at,
		publishedDate: post.published_at || post.created_at,
		updatedDate: post.updated_at
	};
} 
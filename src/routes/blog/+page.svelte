<!-- src/routes/blog/+page.svelte -->
<script>
	export let data;

	function formatDate(dateString) {
		return new Date(dateString).toLocaleDateString('ko-KR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function formatRelativeTime(dateString) {
		const now = new Date();
		const date = new Date(dateString);
		const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

		if (diffInHours < 1) return '방금 전';
		if (diffInHours < 24) return `${diffInHours}시간 전`;

		const diffInDays = Math.floor(diffInHours / 24);
		if (diffInDays < 7) return `${diffInDays}일 전`;

		return formatDate(dateString);
	}
</script>

<svelte:head>
	<title>블로그 - naroso-o.blog</title>
	<meta name="description" content="developer naroso-o's blog" />
</svelte:head>

<div class="container">
	<header class="blog-header">
		<h1>블로그</h1>
		<p class="subtitle">개발과 기술에 대한 이야기</p>
	</header>

	<div class="posts-list">
		{#each data.posts as post}
			<article class="post-item">
				<header class="post-header">
					{#if post.featured}
						<span class="featured-badge">⭐ 추천</span>
					{/if}
					<h2>
						<a href="/blog/{post.slug}">{post.title}</a>
					</h2>
				</header>

				<p class="excerpt">{post.excerpt}</p>

				<footer class="post-footer">
					<div class="meta-info">
						<time class="date">{formatRelativeTime(post.published_at || post.created_at)}</time>
						<span class="separator">•</span>
						<span class="view-count">조회 {post.view_count}회</span>
					</div>

					{#if post.tags && post.tags.length > 0}
						<div class="tags">
							{#each post.tags as tag}
								<a href="/blog/tag/{tag}" class="tag">#{tag}</a>
							{/each}
						</div>
					{/if}
				</footer>
			</article>
		{/each}
	</div>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.blog-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.blog-header h1 {
		color: #1a202c;
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	.subtitle {
		color: #4a5568;
		font-size: 1.1rem;
	}

	.posts-list {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.post-item {
		background: white;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		padding: 2rem;
		transition: all 0.2s ease;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.post-item:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		border-color: #cbd5e0;
	}

	.post-header {
		margin-bottom: 1rem;
	}

	.featured-badge {
		display: inline-block;
		background: #fef5e7;
		color: #d69e2e;
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.875rem;
		font-weight: 500;
		margin-bottom: 0.75rem;
	}

	.post-item h2 {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
	}

	.post-item h2 a {
		text-decoration: none;
		color: #1a202c;
		transition: color 0.2s ease;
	}

	.post-item h2 a:hover {
		color: #3182ce;
	}

	.excerpt {
		color: #4a5568;
		line-height: 1.6;
		margin-bottom: 1.5rem;
		font-size: 1rem;
	}

	.post-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.meta-info {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: #718096;
	}

	.separator {
		color: #cbd5e0;
	}

	.tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.tag {
		background: #edf2f7;
		color: #4a5568;
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.875rem;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.tag:hover {
		background: #e2e8f0;
		color: #2d3748;
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}

		.blog-header h1 {
			font-size: 2rem;
		}

		.post-item {
			padding: 1.5rem;
		}

		.post-footer {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>

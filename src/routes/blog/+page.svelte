<script>
	export let data;
</script>

<svelte:head>
	<title>블로그 - 내 블로그</title>
	<meta name="description" content="모든 블로그 포스트를 확인하세요." />
</svelte:head>

<h1>모든 글</h1>

<div class="posts-list">
	{#each data.posts as post}
		<article class="post-item">
			<h2>
				<a href="/blog/{post.slug}">{post.title}</a>
			</h2>
			<p class="excerpt">{post.excerpt}</p>
			<div class="meta">
				<time class="date">{post.date}</time>
				<span class="category">{post.category}</span>
			</div>
		</article>
	{/each}
</div>

<style>
	h1 {
		color: #333;
		margin-bottom: 2rem;
	}

	.posts-list {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.post-item {
		padding: 1.5rem;
		border: 1px solid #e9ecef;
		border-radius: 8px;
		background: white;
	}

	.post-item h2 {
		margin-bottom: 1rem;
	}

	.post-item h2 a {
		text-decoration: none;
		color: #333;
	}

	.post-item h2 a:hover {
		color: #007bff;
	}

	.excerpt {
		color: #666;
		line-height: 1.6;
		margin-bottom: 1rem;
	}

	.meta {
		display: flex;
		gap: 1rem;
		font-size: 0.9rem;
		color: #999;
	}

	.category {
		background: #f8f9fa;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		color: #666;
	}
</style>

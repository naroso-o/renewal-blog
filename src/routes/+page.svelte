<!-- src/routes/+page.svelte -->
<script>
	import { onMount } from 'svelte';

	let recentPosts = [];
	let featuredPosts = [];
	let loading = true;
	let error = null;

	onMount(async () => {
		try {
			// 최신 포스트와 추천 포스트를 병렬로 가져오기
			const [recentResponse, featuredResponse] = await Promise.all([
				fetch('/api/posts?limit=4'),
				fetch('/api/posts?featured=true&limit=2')
			]);

			if (!recentResponse.ok || !featuredResponse.ok) {
				throw new Error('포스트를 불러올 수 없습니다.');
			}

			recentPosts = await recentResponse.json();
			featuredPosts = await featuredResponse.json();
		} catch (err) {
			error = err.message;
			console.error('Error fetching posts:', err);
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>내 블로그</title>
	<meta name="description" content="개발과 기술에 대한 이야기를 나누는 공간입니다." />
</svelte:head>

<section class="hero">
	<h2>안녕하세요! 👋</h2>
	<p>개발과 기술에 대한 이야기를 나누는 공간입니다.</p>
	<div class="hero-buttons">
		<a href="/blog" class="btn-primary">모든 글 보기</a>
		<a href="/about" class="btn-secondary">소개</a>
	</div>
</section>

{#if loading}
	<div class="loading-section">
		<div class="spinner"></div>
		<p>글을 불러오는 중...</p>
	</div>
{:else if error}
	<section class="error-section">
		<h2>⚠️ 문제가 발생했습니다</h2>
		<p>{error}</p>
		<button class="retry-btn" on:click={() => window.location.reload()}> 다시 시도 </button>
	</section>
{:else}
	<!-- 추천 포스트 섹션 -->
	{#if featuredPosts.length > 0}
		<section class="featured-posts">
			<h2>⭐ 추천 글</h2>
			<div class="featured-grid">
				{#each featuredPosts as post}
					<article class="featured-card">
						<div class="featured-badge">추천</div>
						<h3>
							<a href="/blog/{post.slug}">{post.title}</a>
						</h3>
						<p class="excerpt">{post.excerpt}</p>
						<div class="card-footer">
							<time class="date">{post.date}</time>
							<span class="view-count">👁️ {post.view_count}</span>
						</div>
					</article>
				{/each}
			</div>
		</section>
	{/if}

	<!-- 최신 포스트 섹션 -->
	<section class="recent-posts">
		<div class="section-header">
			<h2>📝 최근 글</h2>
			<a href="/blog" class="view-all">전체 보기 →</a>
		</div>

		<div class="posts-grid">
			{#each recentPosts as post}
				<article class="post-card">
					<h3>
						<a href="/blog/{post.slug}">{post.title}</a>
					</h3>
					<p class="excerpt">{post.excerpt}</p>
					<div class="card-footer">
						<time class="date">{post.date}</time>
						<div class="tags">
							{#if post.tags && post.tags.length > 0}
								{#each post.tags.slice(0, 2) as tag}
									<span class="tag">#{tag}</span>
								{/each}
							{/if}
						</div>
					</div>
				</article>
			{/each}
		</div>

		{#if recentPosts.length === 0}
			<div class="empty-state">
				<p>아직 작성된 글이 없습니다.</p>
				<p>첫 번째 글을 작성해보세요! ✍️</p>
			</div>
		{/if}
	</section>
{/if}

<style>
	/* 히어로 섹션 */
	.hero {
		text-align: center;
		padding: 6rem 2rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		margin: -2rem -2rem 3rem -2rem;
		position: relative;
		overflow: hidden;
	}

	.hero::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>')
			repeat;
		animation: float 20s infinite linear;
	}

	@keyframes float {
		0% {
			transform: translateY(0px);
		}
		100% {
			transform: translateY(-100px);
		}
	}

	.hero h2 {
		font-size: clamp(2.5rem, 5vw, 4rem);
		margin-bottom: 1rem;
		font-weight: 800;
		position: relative;
		z-index: 1;
	}

	.hero p {
		font-size: 1.2rem;
		opacity: 0.9;
		margin-bottom: 2rem;
		position: relative;
		z-index: 1;
	}

	.hero-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
		position: relative;
		z-index: 1;
	}

	.btn-primary,
	.btn-secondary {
		padding: 0.75rem 2rem;
		border-radius: 50px;
		text-decoration: none;
		font-weight: 600;
		transition: all 0.3s ease;
		border: 2px solid transparent;
	}

	.btn-primary {
		background: white;
		color: #667eea;
	}

	.btn-primary:hover {
		background: transparent;
		color: white;
		border-color: white;
	}

	.btn-secondary {
		background: transparent;
		color: white;
		border-color: rgba(255, 255, 255, 0.3);
	}

	.btn-secondary:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	/* 로딩 섹션 */
	.loading-section {
		text-align: center;
		padding: 4rem 2rem;
	}

	.spinner {
		width: 40px;
		height: 40px;
		border: 4px solid #f3f4f6;
		border-top: 4px solid #667eea;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 0 auto 1rem;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	/* 에러 섹션 */
	.error-section {
		text-align: center;
		padding: 4rem 2rem;
		max-width: 600px;
		margin: 0 auto;
	}

	.error-section h2 {
		color: #dc2626;
		margin-bottom: 1rem;
	}

	.retry-btn {
		background: #667eea;
		color: white;
		border: none;
		padding: 0.75rem 2rem;
		border-radius: 8px;
		cursor: pointer;
		font-weight: 500;
		margin-top: 1rem;
		transition: background 0.2s ease;
	}

	.retry-btn:hover {
		background: #5a67d8;
	}

	/* 추천 포스트 섹션 */
	.featured-posts {
		max-width: 1200px;
		margin: 0 auto 4rem;
		padding: 0 2rem;
	}

	.featured-posts h2 {
		color: #1f2937;
		margin-bottom: 2rem;
		font-size: 2rem;
		text-align: center;
	}

	.featured-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 2rem;
	}

	.featured-card {
		background: linear-gradient(135deg, #fef3c7, #fde68a);
		border-radius: 16px;
		padding: 2rem;
		position: relative;
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}

	.featured-card:hover {
		transform: translateY(-5px);
	}

	.featured-badge {
		position: absolute;
		top: -10px;
		right: 20px;
		background: #f59e0b;
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-size: 0.875rem;
		font-weight: 600;
	}

	.featured-card h3 {
		margin-bottom: 1rem;
		font-size: 1.25rem;
	}

	.featured-card h3 a {
		text-decoration: none;
		color: #1f2937;
	}

	.featured-card h3 a:hover {
		color: #d97706;
	}

	/* 최신 포스트 섹션 */
	.recent-posts {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem 4rem;
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	.section-header h2 {
		color: #1f2937;
		font-size: 2rem;
		margin: 0;
	}

	.view-all {
		color: #667eea;
		text-decoration: none;
		font-weight: 500;
		transition: color 0.2s ease;
	}

	.view-all:hover {
		color: #5a67d8;
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.post-card {
		background: white;
		border-radius: 12px;
		padding: 2rem;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
		border: 1px solid #f3f4f6;
	}

	.post-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
	}

	.post-card h3 {
		margin-bottom: 1rem;
		font-size: 1.25rem;
		line-height: 1.4;
	}

	.post-card h3 a {
		text-decoration: none;
		color: #1f2937;
	}

	.post-card h3 a:hover {
		color: #667eea;
	}

	.excerpt {
		color: #6b7280;
		line-height: 1.6;
		margin-bottom: 1.5rem;
		font-size: 0.95rem;
	}

	.card-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.date {
		color: #9ca3af;
		font-size: 0.875rem;
	}

	.view-count {
		color: #9ca3af;
		font-size: 0.875rem;
	}

	.tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.tag {
		background: #f3f4f6;
		color: #6b7280;
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.8rem;
	}

	.empty-state {
		text-align: center;
		padding: 3rem;
		color: #6b7280;
	}

	/* 반응형 디자인 */
	@media (max-width: 768px) {
		.hero {
			padding: 4rem 1rem;
		}

		.hero h1 {
			font-size: 2.5rem;
		}

		.featured-grid {
			grid-template-columns: 1fr;
		}

		.posts-grid {
			grid-template-columns: 1fr;
		}

		.section-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.hero-buttons {
			flex-direction: column;
			align-items: center;
		}

		.btn-primary,
		.btn-secondary {
			width: 200px;
		}
	}

	@media (max-width: 480px) {
		.featured-posts,
		.recent-posts {
			padding: 0 1rem 2rem;
		}

		.post-card,
		.featured-card {
			padding: 1.5rem;
		}
	}
</style>

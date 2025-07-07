<script>
	import { onMount } from 'svelte';

	let posts = [];
	let loading = true;

	onMount(async () => {
		// 실제로는 API나 데이터베이스에서 가져옴
		posts = [
			{
				id: 1,
				title: 'SvelteKit으로 블로그 만들기',
				excerpt: 'SvelteKit을 사용해서 현대적인 블로그를 만드는 방법을 알아보세요.',
				date: '2025-01-15',
				slug: 'sveltekit-blog-tutorial'
			},
			{
				id: 2,
				title: 'JavaScript 최신 기능들',
				excerpt: 'ES2024의 새로운 기능들과 실용적인 사용법을 소개합니다.',
				date: '2025-01-10',
				slug: 'javascript-new-features'
			},
			{
				id: 3,
				title: '웹 성능 최적화 팁',
				excerpt: '웹사이트 성능을 향상시키는 실용적인 팁들을 정리했습니다.',
				date: '2025-01-05',
				slug: 'web-performance-tips'
			}
		];
		loading = false;
	});
</script>

<svelte:head>
	<title>내 블로그</title>
	<meta name="description" content="개발과 기술에 대한 이야기를 나누는 공간입니다." />
</svelte:head>

<section class="hero">
	<h1>안녕하세요! 👋</h1>
	<p>개발과 기술에 대한 이야기를 나누는 공간입니다.</p>
</section>

<section class="recent-posts">
	<h2>최근 글</h2>

	{#if loading}
		<div class="loading">글을 불러오는 중...</div>
	{:else}
		<div class="posts-grid">
			{#each posts as post}
				<article class="post-card">
					<h3>
						<a href="/blog/{post.slug}">{post.title}</a>
					</h3>
					<p class="excerpt">{post.excerpt}</p>
					<time class="date">{post.date}</time>
				</article>
			{/each}
		</div>
	{/if}
</section>

<style>
	.hero {
		text-align: center;
		padding: 4rem 0;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		margin: -2rem -2rem 2rem -2rem;
	}

	.hero h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.hero p {
		font-size: 1.2rem;
		opacity: 0.9;
	}

	.recent-posts h2 {
		color: #333;
		margin-bottom: 2rem;
		font-size: 2rem;
	}

	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.post-card {
		background: white;
		border-radius: 8px;
		padding: 1.5rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s ease;
	}

	.post-card:hover {
		transform: translateY(-4px);
	}

	.post-card h3 {
		margin-bottom: 1rem;
	}

	.post-card h3 a {
		text-decoration: none;
		color: #333;
	}

	.post-card h3 a:hover {
		color: #007bff;
	}

	.excerpt {
		color: #666;
		line-height: 1.6;
		margin-bottom: 1rem;
	}

	.date {
		color: #999;
		font-size: 0.9rem;
	}

	.loading {
		text-align: center;
		padding: 2rem;
		color: #666;
	}

	@media (max-width: 768px) {
		.hero {
			padding: 2rem 0;
		}

		.hero h1 {
			font-size: 2rem;
		}

		.posts-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

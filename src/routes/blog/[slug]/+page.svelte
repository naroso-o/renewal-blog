<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
	export let data;

	$: post = data.post;

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

	// 간단한 마크다운 파싱 (나중에 marked.js 등으로 교체 가능)
	function parseMarkdown(content) {
		return (
			content
				// 헤딩
				.replace(/^### (.*$)/gim, '<h3>$1</h3>')
				.replace(/^## (.*$)/gim, '<h2>$1</h2>')
				.replace(/^# (.*$)/gim, '<h1>$1</h1>')
				// 볼드/이탤릭
				.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
				.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
				.replace(/\*(.*?)\*/g, '<em>$1</em>')
				// 인라인 코드
				.replace(/`([^`]+)`/g, '<code>$1</code>')
				// 코드 블록
				.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
				// 링크
				.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
				// 줄바꿈
				.replace(/\n\n/g, '</p><p>')
				.replace(/\n/g, '<br>')
				// 문단 감싸기
				.replace(/^(.)/gm, '<p>$1')
				.replace(/(.)$/gm, '$1</p>')
				// 중복 문단 태그 정리
				.replace(/<p><h([1-6])>/g, '<h$1>')
				.replace(/<\/h([1-6])><\/p>/g, '</h$1>')
				.replace(/<p><pre>/g, '<pre>')
				.replace(/<\/pre><\/p>/g, '</pre>')
		);
	}
</script>

<svelte:head>
	<title>{post.title} - 내 블로그</title>
	<meta name="description" content={post.excerpt || post.title} />

	<!-- Open Graph 메타태그 -->
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.excerpt || post.title} />
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={post.published_at || post.created_at} />
	<meta property="article:modified_time" content={post.updated_at} />
	{#if post.tags}
		{#each post.tags as tag}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}
</svelte:head>

<div class="container">
	<!-- 네비게이션 -->
	<nav class="breadcrumb">
		<a href="/">홈</a>
		<span class="separator">›</span>
		<a href="/blog">블로그</a>
		<span class="separator">›</span>
		<span class="current">{post.title}</span>
	</nav>

	<!-- 포스트 헤더 -->
	<header class="post-header">
		{#if post.featured}
			<div class="featured-badge">⭐ 추천 포스트</div>
		{/if}

		<h1 class="post-title">{post.title}</h1>

		<div class="post-meta">
			<div class="meta-left">
				<time class="publish-date">
					📅 {formatRelativeTime(post.published_at || post.created_at)}
				</time>

				<span class="view-count">
					👁️ {post.view_count} 조회
				</span>

				{#if post.updated_at !== post.created_at}
					<span class="updated-date">
						✏️ {formatRelativeTime(post.updated_at)} 수정
					</span>
				{/if}
			</div>

			{#if post.tags && post.tags.length > 0}
				<div class="tags">
					{#each post.tags as tag}
						<a href="/blog/tag/{tag}" class="tag">#{tag}</a>
					{/each}
				</div>
			{/if}
		</div>
	</header>

	<!-- 포스트 내용 -->
	<article class="post-content">
		{#if post.excerpt}
			<div class="excerpt">
				<strong>요약:</strong>
				{post.excerpt}
			</div>
		{/if}

		<div class="content">
			{@html parseMarkdown(post.content)}
		</div>
	</article>

	<!-- 포스트 푸터 -->
	<footer class="post-footer">
		<div class="feedback">
			<p class="feedback-title">이 글이 도움이 되었나요?</p>
			<div class="feedback-buttons">
				<button class="feedback-btn helpful"> 👍 도움됨 </button>
				<button class="feedback-btn share"> 🔗 공유하기 </button>
				<button class="feedback-btn comment"> 💬 댓글 남기기 </button>
			</div>
		</div>

		<div class="navigation">
			<a href="/blog" class="back-to-list"> ← 블로그 목록으로 돌아가기 </a>
		</div>
	</footer>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
		line-height: 1.7;
	}

	/* 브래드크럼 네비게이션 */
	.breadcrumb {
		margin-bottom: 2rem;
		font-size: 0.9rem;
		color: #6b7280;
	}

	.breadcrumb a {
		color: #3b82f6;
		text-decoration: none;
	}

	.breadcrumb a:hover {
		text-decoration: underline;
	}

	.separator {
		margin: 0 0.5rem;
		color: #d1d5db;
	}

	.current {
		color: #374151;
		font-weight: 500;
	}

	/* 포스트 헤더 */
	.post-header {
		margin-bottom: 3rem;
		text-align: center;
	}

	.featured-badge {
		display: inline-block;
		background: linear-gradient(135deg, #fef3c7, #fde68a);
		color: #d97706;
		padding: 0.5rem 1rem;
		border-radius: 25px;
		font-size: 0.875rem;
		font-weight: 600;
		margin-bottom: 1rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.post-title {
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 800;
		color: #111827;
		line-height: 1.2;
		margin-bottom: 1.5rem;
	}

	.post-meta {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	}

	.meta-left {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
		font-size: 0.9rem;
		color: #6b7280;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		justify-content: center;
	}

	.tag {
		background: #f3f4f6;
		color: #374151;
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.875rem;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.tag:hover {
		background: #e5e7eb;
		transform: translateY(-1px);
	}

	/* 포스트 내용 */
	.post-content {
		margin-bottom: 3rem;
	}

	.excerpt {
		background: #f8fafc;
		border-left: 4px solid #3b82f6;
		padding: 1.5rem;
		margin-bottom: 2rem;
		border-radius: 0 8px 8px 0;
		font-size: 1.1rem;
		color: #374151;
	}

	/* 마크다운 스타일링 */
	:global(.content h1) {
		font-size: 2.25rem;
		font-weight: 700;
		color: #111827;
		margin: 2rem 0 1rem 0;
		line-height: 1.2;
	}

	:global(.content h2) {
		font-size: 1.875rem;
		font-weight: 600;
		color: #111827;
		margin: 2rem 0 1rem 0;
		line-height: 1.3;
		border-bottom: 2px solid #e5e7eb;
		padding-bottom: 0.5rem;
	}

	:global(.content h3) {
		font-size: 1.5rem;
		font-weight: 600;
		color: #374151;
		margin: 1.5rem 0 0.75rem 0;
	}

	:global(.content p) {
		margin-bottom: 1.5rem;
		color: #374151;
	}

	:global(.content code) {
		background: #f1f5f9;
		color: #e11d48;
		padding: 0.125rem 0.375rem;
		border-radius: 4px;
		font-size: 0.875em;
		font-family:
			'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
	}

	:global(.content pre) {
		background: #1e293b;
		color: #e2e8f0;
		padding: 1.5rem;
		border-radius: 8px;
		overflow-x: auto;
		margin: 1.5rem 0;
		font-size: 0.875rem;
		line-height: 1.5;
	}

	:global(.content pre code) {
		background: none;
		color: inherit;
		padding: 0;
		border-radius: 0;
		font-size: inherit;
	}

	:global(.content a) {
		color: #3b82f6;
		text-decoration: none;
		border-bottom: 1px solid transparent;
		transition: border-color 0.2s ease;
	}

	:global(.content a:hover) {
		border-bottom-color: #3b82f6;
	}

	:global(.content strong) {
		font-weight: 600;
		color: #111827;
	}

	:global(.content em) {
		font-style: italic;
		color: #6b7280;
	}

	/* 포스트 푸터 */
	.post-footer {
		border-top: 1px solid #e5e7eb;
		padding-top: 2rem;
	}

	.feedback {
		text-align: center;
		margin-bottom: 2rem;
	}

	.feedback-title {
		font-size: 1.1rem;
		color: #374151;
		margin-bottom: 1rem;
	}

	.feedback-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.feedback-btn {
		background: #f9fafb;
		border: 1px solid #d1d5db;
		color: #374151;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.feedback-btn:hover {
		background: #f3f4f6;
		transform: translateY(-1px);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.feedback-btn.helpful:hover {
		background: #ecfdf5;
		border-color: #10b981;
		color: #059669;
	}

	.feedback-btn.share:hover {
		background: #eff6ff;
		border-color: #3b82f6;
		color: #2563eb;
	}

	.feedback-btn.comment:hover {
		background: #fef3c7;
		border-color: #f59e0b;
		color: #d97706;
	}

	.navigation {
		text-align: center;
	}

	.back-to-list {
		color: #6b7280;
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.2s ease;
	}

	.back-to-list:hover {
		color: #3b82f6;
	}

	/* 반응형 디자인 */
	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}

		.post-meta {
			align-items: flex-start;
		}

		.meta-left {
			justify-content: flex-start;
			flex-direction: column;
			gap: 0.5rem;
		}

		.tags {
			justify-content: flex-start;
		}

		.feedback-buttons {
			flex-direction: column;
			align-items: center;
		}

		.feedback-btn {
			width: 100%;
			max-width: 200px;
		}

		:global(.content pre) {
			padding: 1rem;
			font-size: 0.8rem;
		}
	}

	/* 다크모드 대응 (선택사항) */
	@media (prefers-color-scheme: dark) {
		.container {
			color: #e5e7eb;
		}

		.post-title {
			color: #f9fafb;
		}

		.excerpt {
			background: #374151;
			color: #e5e7eb;
		}

		:global(.content h1),
		:global(.content h2) {
			color: #f9fafb;
		}

		:global(.content h3) {
			color: #d1d5db;
		}

		:global(.content p) {
			color: #d1d5db;
		}
	}
</style>

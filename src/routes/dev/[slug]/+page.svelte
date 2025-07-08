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
	<title>{post.title} - naroso-o.blog</title>
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

<div class="max-w-4xl mx-auto px-4 py-8 leading-relaxed">
	<!-- 네비게이션 -->
	<nav class="mb-8 text-sm text-gray-500">
		<a href="/" class="text-blue-500 hover:underline">홈</a>
		<span class="mx-2 text-gray-300">›</span>
		<a href="/blog" class="text-blue-500 hover:underline">블로그</a>
		<span class="mx-2 text-gray-300">›</span>
		<span class="text-gray-700 font-medium">{post.title}</span>
	</nav>

	<!-- 포스트 헤더 -->
	<header class="mb-12 text-center">
		{#if post.featured}
			<div
				class="inline-block bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm"
			>
				⭐ 추천 포스트
			</div>
		{/if}

		<h1 class="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
			{post.title}
		</h1>

		<div class="flex flex-col gap-4 items-center">
			<div class="flex flex-wrap gap-4 justify-center text-sm text-gray-500">
				<time class="flex items-center">
					📅 {formatRelativeTime(post.published_at || post.created_at)}
				</time>

				<span class="flex items-center">
					👁️ {post.view_count} 조회
				</span>

				{#if post.updated_at !== post.created_at}
					<span class="flex items-center">
						✏️ {formatRelativeTime(post.updated_at)} 수정
					</span>
				{/if}
			</div>

			{#if post.tags && post.tags.length > 0}
				<div class="flex flex-wrap gap-2 justify-center">
					{#each post.tags as tag}
						<a
							href="/blog/tag/{tag}"
							class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200"
							>#{tag}</a
						>
					{/each}
				</div>
			{/if}
		</div>
	</header>

	<!-- 포스트 내용 -->
	<article class="mb-12">
		{#if post.excerpt}
			<div class="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
				<strong class="text-blue-900">요약:</strong>
				<span class="text-blue-800">{post.excerpt}</span>
			</div>
		{/if}

		<div class="prose prose-lg max-w-none">
			{@html parseMarkdown(post.content)}
		</div>
	</article>

	<!-- 포스트 푸터 -->
	<footer class="border-t border-gray-200 pt-8">
		<div class="text-center mb-8">
			<p class="text-lg text-gray-700 mb-4">이 글이 도움이 되었나요?</p>
			<div class="flex gap-4 justify-center flex-wrap">
				<button
					class="px-6 py-3 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-all duration-200"
				>
					👍 도움됨
				</button>
				<button
					class="px-6 py-3 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
				>
					🔗 공유하기
				</button>
				<button
					class="px-6 py-3 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-700 transition-all duration-200"
				>
					💬 댓글 남기기
				</button>
			</div>
		</div>

		<div class="text-center">
			<a href="/dev" class="text-gray-500 hover:text-blue-500 transition-colors duration-200">
				← 개발 로그로 돌아가기
			</a>
		</div>
	</footer>
</div>

<style>
	/* 마크다운 스타일링 */
	:global(.prose h1) {
		@apply text-4xl font-bold text-gray-900 mt-8 mb-4 leading-tight;
	}

	:global(.prose h2) {
		@apply text-3xl font-semibold text-gray-900 mt-8 mb-4 leading-tight border-b-2 border-gray-200 pb-2;
	}

	:global(.prose h3) {
		@apply text-2xl font-semibold text-gray-800 mt-6 mb-3;
	}

	:global(.prose p) {
		@apply mb-6 text-gray-700;
	}

	:global(.prose code) {
		@apply bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm font-mono;
	}

	:global(.prose pre) {
		@apply bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto my-6 text-sm leading-relaxed;
	}

	:global(.prose pre code) {
		@apply bg-transparent text-inherit p-0 rounded-none text-inherit;
	}

	:global(.prose a) {
		@apply text-blue-500 no-underline border-b border-transparent hover:border-blue-500 transition-colors duration-200;
	}

	:global(.prose strong) {
		@apply font-semibold text-gray-900;
	}

	:global(.prose em) {
		@apply italic text-gray-600;
	}

	/* 반응형 디자인 */
	@media (max-width: 768px) {
		:global(.prose pre) {
			@apply p-4 text-xs;
		}
	}
</style>

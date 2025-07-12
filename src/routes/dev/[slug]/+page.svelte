<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { formatRelativeTime } from '$lib/utils/date';
	import {
		initializeMarkdownSystem,
		parseMarkdown,
		highlightCodeBlocks
	} from '$lib/utils/markdown';
	import { generateSEOData, generatePostStatus } from '$lib/utils/meta';
	import 'highlight.js/styles/github-dark.css';

	export let data;

	$: post = data.post;
	$: seoData = generateSEOData(post);
	$: postStatus = generatePostStatus(post);

	// 마크다운 시스템 초기화
	onMount(() => {
		initializeMarkdownSystem();
	});

	// 포스트 내용 변경 시 하이라이팅 적용
	$: if (post && typeof window !== 'undefined') {
		setTimeout(() => {
			highlightCodeBlocks();
		}, 50);
	}
</script>

<svelte:head>
	<title>{seoData.title}</title>
	<meta name="description" content={seoData.description} />

	<!-- Open Graph 메타태그 -->
	<meta property="og:title" content={seoData.openGraph.title} />
	<meta property="og:description" content={seoData.openGraph.description} />
	<meta property="og:type" content={seoData.openGraph.type} />
	<meta property="article:published_time" content={seoData.openGraph.publishedTime} />
	<meta property="article:modified_time" content={seoData.openGraph.modifiedTime} />
	{#if seoData.openGraph.tags.length > 0}
		{#each seoData.openGraph.tags as tag}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-8 leading-relaxed">
	<!-- 네비게이션 -->
	<nav class="mb-8 text-sm text-gray-500">
		<a href="{base}/" class="text-primary-500 hover:underline">홈</a>
		<span class="mx-2 text-gray-300">›</span>
		<a href="{base}/dev" class="text-primary-500 hover:underline">개발 로그</a>
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
					{formatRelativeTime(postStatus.publishedDate)} 작성
				</time>

				<span class="flex items-center">
					| 조회수 {post.view_count}
				</span>

				{#if postStatus.isUpdated}
					<span class="flex items-center">
						| {formatRelativeTime(postStatus.updatedDate)} 수정
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
			<div class="bg-primary-50 border-l-4 border-primary-500 p-6 mb-8 rounded-r-lg">
				<strong class="text-primary-900">요약:</strong>
				<span class="text-primary-800">{post.excerpt.replace(/<[^>]*>/g, '')}</span>
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
			<a href="{base}/dev" class="text-gray-500 hover:text-blue-500 transition-colors duration-200">
				← 개발 로그로 돌아가기
			</a>
		</div>
	</footer>
</div>

<style>
	@import '../../../app.css';
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

	/* 인라인 코드 스타일 */
	:global(.prose code:not(pre code)) {
		@apply bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm font-mono;
	}

	/* 코드 블록 스타일 */
	:global(.prose pre) {
		@apply rounded-lg overflow-x-auto my-6 text-sm leading-relaxed;
	}

	/* highlight.js 스타일과 호환 */
	:global(.prose pre code) {
		@apply block p-6 font-mono;
	}

	/* highlight.js 테마 커스터마이징 */
	:global(.hljs) {
		@apply rounded-lg;
	}

	:global(.prose img) {
		@apply max-w-full h-auto rounded-lg shadow-sm my-4 mx-auto block;
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

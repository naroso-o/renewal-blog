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
	import { Button } from '../../../lib';

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
	<nav class="mb-8 text-sm">
		<a href="{base}/" class="text-brand-primary hover:underline">홈</a>
		<span class="mx-2 text-secondary">›</span>
		<a href="{base}/dev" class="text-brand-primary hover:underline">개발 로그</a>
		<span class="mx-2 text-secondary">›</span>
		<span class="text-primary font-medium">{post.title}</span>
	</nav>

	<!-- 포스트 헤더 -->
	<header class="mb-12 text-center">
		{#if post.featured}
			<div
				class="inline-block bg-background-gradient px-4 py-2 rounded-full text-sm mb-4 shadow-sm text-inverse font-medium"
			>
				⭐ 추천 포스트
			</div>
		{/if}

		<h1 class="text-3xl md:text-5xl font-extrabold text-primary leading-tight py-3 sm:py-6 md:py-8">
			{post.title}
		</h1>

		<div class="flex flex-col gap-4 items-center">
			<div class="flex flex-wrap gap-4 justify-center text-sm text-tertiary">
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
							class="text-brand-primary px-3 py-1 rounded-full text-sm transition-colors duration-200"
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
			<div class="bg-background border-l-4 border-primary p-6 mb-8 rounded-r-lg">
				<strong class="text-primary">요약:</strong>
				<span class="text-primary">{post.excerpt.replace(/<[^>]*>/g, '')}</span>
			</div>
		{/if}

		<div class="prose prose-lg max-w-none">
			{@html parseMarkdown(post.content)}
		</div>
	</article>

	<!-- 포스트 푸터 -->
	<footer class="border-t border-primary pt-8">
		<div class="text-center mb-8">
			<p class="text-lg text-secondary mb-4">이 글이 도움이 되었나요?</p>
			<div class="flex gap-4 justify-center flex-wrap">
				<Button onclick={() => {}} variant="secondary" size="md">❤️ 좋아요</Button>
				<Button onclick={() => {}} variant="secondary" size="md">🔗 공유하기</Button>
			</div>
		</div>

		<div class="text-center">
			<a
				href="{base}/dev"
				class="text-brand-primary hover:underline transition-colors duration-200"
			>
				← 개발 로그로 돌아가기
			</a>
		</div>
	</footer>
</div>

<style>
	@import '../../../app.css';

	/* 마크다운 스타일링 - 다크모드 대응 */
	:global(.prose h1) {
		font-size: 2.25rem;
		font-weight: 700;
		color: var(--color-text-primary);
		margin-top: 2rem;
		margin-bottom: 1rem;
		line-height: 1.25;
	}

	:global(.prose h2) {
		font-size: 1.875rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin-top: 2rem;
		margin-bottom: 1rem;
		line-height: 1.25;
		border-bottom: 2px solid var(--color-border-primary);
		padding-bottom: 0.5rem;
	}

	:global(.prose h3) {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}

	:global(.prose p) {
		margin-bottom: 1.5rem;
		color: var(--color-text-secondary);
		line-height: 1.6;
	}

	/* 인라인 코드 스타일 - 다크모드 대응 */
	:global(.prose code:not(pre code)) {
		background-color: var(--color-bg-tertiary);
		color: var(--color-error);
		padding: 0.125rem 0.25rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
		font-family: var(--font-mono);
		border: 1px solid var(--color-border-primary);
	}

	/* 코드 블록 스타일 */
	:global(.prose pre) {
		border-radius: 0.5rem;
		overflow-x: auto;
		margin: 1.5rem 0;
		font-size: 0.875rem;
		line-height: 1.5;
		background-color: var(--color-bg-tertiary);
		border: 1px solid var(--color-border-primary);
	}

	/* highlight.js 스타일과 호환 */
	:global(.prose pre code) {
		display: block;
		padding: 1.5rem;
		font-family: var(--font-mono);
		background-color: transparent;
		color: var(--color-text-primary);
	}

	/* highlight.js 테마 커스터마이징 */
	:global(.hljs) {
		border-radius: 0.5rem;
		background-color: var(--color-bg-tertiary) !important;
	}

	/* 이미지 스타일 */
	:global(.prose img) {
		max-width: 100%;
		height: auto;
		border-radius: 0.5rem;
		box-shadow: 0 1px 3px var(--color-card-shadow);
		margin: 1rem auto;
		display: block;
	}

	/* 링크 스타일 */
	:global(.prose a) {
		color: var(--color-brand-primary);
		text-decoration: none;
		border-bottom: 1px solid transparent;
		transition: all 0.2s ease;
	}

	:global(.prose a:hover) {
		border-bottom-color: var(--color-brand-primary);
	}

	/* 강조 텍스트 */
	:global(.prose strong) {
		font-weight: 600;
		color: var(--color-text-primary);
	}

	:global(.prose em) {
		font-style: italic;
		color: var(--color-text-tertiary);
	}

	/* 목록 스타일 */
	:global(.prose ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
		margin-bottom: 1.5rem;
		color: var(--color-text-secondary);
	}

	:global(.prose ol) {
		list-style-type: decimal;
		padding-left: 1.5rem;
		margin-bottom: 1.5rem;
		color: var(--color-text-secondary);
	}

	:global(.prose li) {
		margin-bottom: 0.5rem;
		line-height: 1.6;
	}

	/* 인용 블록 */
	:global(.prose blockquote) {
		border-left: 4px solid var(--color-brand-primary);
		padding-left: 1rem;
		margin: 1.5rem 0;
		color: var(--color-text-tertiary);
		font-style: italic;
		background-color: var(--color-bg-secondary);
		border-radius: 0 0.25rem 0.25rem 0;
		padding: 1rem;
	}

	/* 표 스타일 */
	:global(.prose table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1.5rem 0;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		overflow: hidden;
	}

	:global(.prose th) {
		background-color: var(--color-bg-secondary);
		color: var(--color-text-primary);
		padding: 0.75rem;
		text-align: left;
		font-weight: 600;
		border-bottom: 2px solid var(--color-border-primary);
	}

	:global(.prose td) {
		padding: 0.75rem;
		color: var(--color-text-secondary);
		border-bottom: 1px solid var(--color-border-secondary);
	}

	:global(.prose tr:hover td) {
		background-color: var(--color-bg-secondary);
	}

	/* 구분선 */
	:global(.prose hr) {
		border: none;
		border-top: 2px solid var(--color-border-primary);
		margin: 2rem 0;
	}

	/* 반응형 디자인 */
	@media (max-width: 768px) {
		:global(.prose h1) {
			font-size: 1.875rem;
		}

		:global(.prose h2) {
			font-size: 1.5rem;
		}

		:global(.prose h3) {
			font-size: 1.25rem;
		}

		:global(.prose pre) {
			font-size: 0.75rem;
		}

		:global(.prose pre code) {
			padding: 1rem;
		}
	}
</style>

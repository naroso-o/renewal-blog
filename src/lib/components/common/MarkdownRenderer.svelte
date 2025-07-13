<script lang="ts">
	import { onMount } from 'svelte';
	import {
		initializeMarkdownSystem,
		parseMarkdown,
		highlightCodeBlocks
	} from '$lib/utils/markdown';
	import 'highlight.js/styles/github-dark.css';

	export let content: string;
	export let showExcerpt: boolean = false;
	export let excerpt: string = '';

	// 마크다운 시스템 초기화
	onMount(() => {
		initializeMarkdownSystem();
	});

	// 콘텐츠 변경 시 하이라이팅 적용
	$: if (content && typeof window !== 'undefined') {
		setTimeout(() => {
			highlightCodeBlocks();
		}, 50);
	}
</script>

{#if showExcerpt && excerpt}
	<div class="bg-background border-l-4 border-primary p-6 mb-8 rounded-r-lg">
		<strong class="text-primary">요약:</strong>
		<span class="text-primary">{excerpt.replace(/<[^>]*>/g, '')}</span>
	</div>
{/if}

<div class="prose prose-lg max-w-none">
	{@html parseMarkdown(content)}
</div>

<style>
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

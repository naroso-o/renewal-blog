<script lang="ts">
	import { base } from '$app/paths';
	import PostFooter from '$lib/components/dev-log/PostFooter.svelte';
	import MarkdownRenderer from '$lib/components/common/MarkdownRenderer.svelte';
	import { generateSEOData, generatePostStatus } from '$lib/utils/meta';
	import { formatDistanceToNow } from '$lib/utils/date';

	export let data;

	$: post = data.post;
	$: seoData = generateSEOData(post);
	$: postStatus = generatePostStatus(post);
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
				class="inline-block bg-background-gradient text-primary px-4 py-2 rounded-full text-sm mb-4 shadow-sm font-medium"
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
					{formatDistanceToNow(post.created_at)} 작성
				</time>

				<span class="flex items-center">
					| 조회수 {post.view_count}
				</span>

				{#if postStatus.isUpdated}
					<span class="flex items-center">
						| {formatDistanceToNow(post.updated_at)} 수정
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
		<MarkdownRenderer
			content={post.content}
			showExcerpt={post.excerpt ? true : false}
			excerpt={post.excerpt || ''}
		/>
	</article>

	<!-- 포스트 푸터 -->
	<PostFooter postId={post.id} />
</div>

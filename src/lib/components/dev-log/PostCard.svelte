<script lang="ts">
	import { base } from '$app/paths';
	import { formatDate } from '../../utils/date';
	import type { Post } from '../../types';

	export let post: Post;
	export let variant: 'gradient' | 'default' = 'default';
	export let maxTags: number | null = null;
	export let href: string | null = null;

	$: console.log(post.thumbnail);

	$: displayTags = maxTags ? post.tags?.slice(0, maxTags) : post.tags;
	$: isGradient = variant === 'gradient';
</script>

<article
	class={`w-84 rounded-xl bg-card-bg border border-primary shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden flex flex-col ${
		isGradient ? 'bg-background-gradient' : ''
	}`}
>
	<!-- 썸네일 이미지 -->
	{#if post.thumbnail}
		<div class="h-48 w-full overflow-hidden">
			<img
				src={post.thumbnail}
				alt={post.title}
				class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
			/>
		</div>
	{:else}
		<!-- 썸네일이 없는 경우 기본 배경 -->
		<div
			class="h-48 w-full bg-gradient-to-br from-primary/20 to-brand-primary/20 flex items-center justify-center"
		>
			<div class="text-primary/50 text-4xl font-bold">
				{post.title.charAt(0).toUpperCase()}
			</div>
		</div>
	{/if}

	<!-- 콘텐츠 영역 -->
	<div class="p-6 flex-1">
		<!-- header -->
		<header class="mb-4">
			<h3 class="font-semibold leading-tight text-xl mb-2">
				<a
					href={href || `${base}/dev/${post.slug}`}
					class="hover:text-brand-primary text-primary transition-colors duration-200 line-clamp-2"
				>
					{post.title}
				</a>
			</h3>
		</header>

		<!-- excerpt -->
		<p class="leading-relaxed mb-6 text-secondary text-sm line-clamp-4">
			{post.excerpt}
		</p>

		<!-- footer -->
		<footer class="space-y-4 mt-auto">
			<!-- date -->
			<div class="flex items-center gap-2 text-sm">
				<time class="date text-tertiary">{formatDate(post.created_at)}</time>
			</div>

			<!-- tags -->
			{#if displayTags && displayTags.length > 0}
				<div class="flex gap-2 flex-wrap">
					{#each displayTags as tag}
						<a
							href="{base}/dev/tag/{tag}"
							class="px-2 py-1 rounded-full text-xs transition-colors duration-200 bg-surface text-tertiary hover:bg-primary/10"
						>
							#{tag}
						</a>
					{/each}
				</div>
			{/if}
		</footer>
	</div>
</article>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-4 {
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>

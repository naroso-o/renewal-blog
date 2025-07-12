<script lang="ts">
	import { base } from '$app/paths';
	import { formatDate, formatRelativeTime } from '../utils/date';
	import type { Post } from '../types';

	export let post: Post;
	export let variant: 'grid' | 'list' = 'grid';
	export let showViewCount = false;
	export let maxTags: number | null = null;

	$: isGrid = variant === 'grid';
	$: displayTags = maxTags ? post.tags?.slice(0, maxTags) : post.tags;
</script>

<article
	class="rounded-xl bg-card-bg p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
		{isGrid ? ' border border-primary' : 'border border-primary-200 hover:border-primary-500'}"
>
	<header class="mb-4">
		<h3 class="font-semibold leading-tight {isGrid ? 'text-xl pb-2 sm:pb-4' : 'text-2xl'}">
			<a
				href="{base}/dev/{post.slug}"
				class="hover:text-brand-primary text-primary transition-colors duration-200">{post.title}</a
			>
		</h3>
	</header>

	<p class="leading-relaxed mb-6 text-secondary">
		{post.excerpt}
	</p>

	<footer class="flex justify-between items-center flex-wrap gap-4">
		<div class="flex items-center gap-2 text-sm">
			<time class="date {isGrid ? 'text-tertiary' : 'text-gray-500'}">
				{isGrid
					? formatDate(post.created_at)
					: formatRelativeTime(post.published_at || post.created_at)}
			</time>

			{#if showViewCount}
				<span class="text-gray-300">•</span>
				<span class="view-count text-gray-500">조회 {post.view_count}회</span>
			{/if}
		</div>

		{#if displayTags && displayTags.length > 0}
			<div class="flex gap-2 flex-wrap">
				{#each displayTags as tag}
					<a
						href="/blog/tag/{tag}"
						class="px-3 py-1 rounded-full text-xs transition-colors duration-200 bg-surface text-tertiary"
						>#{tag}</a
					>
				{/each}
			</div>
		{/if}
	</footer>
</article>

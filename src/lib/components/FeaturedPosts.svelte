<script lang="ts">
	import { base } from '$app/paths';
	import type { Post } from '$lib/types';
	import { formatDate } from '../utils/date';

	export let posts: Post[] = [];
</script>

{#if posts.length > 0}
	<section class="max-w-6xl mx-auto mb-16 px-8">
		<h2 class="text-3xl font-bold text-primary text-center py-4">📌 Pinned</h2>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			{#each posts as post}
				<article
					class="relative bg-background-gradient rounded-2xl p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1"
				>
					<div
						class="absolute -top-3 right-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium"
					>
						개발 로그
					</div>
					<h3 class="text-xl font-semibold pb-2 sm:pb-4">
						<a
							href="{base}/dev/{post.slug}"
							class="text-primary hover:text-brand-primary transition-colors duration-200"
							>{post.title}</a
						>
					</h3>
					<p class="text-secondary mb-6 leading-relaxed">{post.excerpt}</p>
					<div class="flex justify-between items-center text-sm text-tertiary">
						<time>{formatDate(post.created_at)}</time>
						<div class="flex gap-2 flex-wrap">
							{#if post.tags && post.tags.length > 0}
								{#each post.tags.slice(0, 2) as tag}
									<span class="bg-surface text-tertiary px-3 py-1 rounded-full text-xs">#{tag}</span
									>
								{/each}
							{/if}
						</div>
					</div>
				</article>
			{/each}
		</div>
	</section>
{/if}

<script lang="ts">
	import { base } from '$app/paths';
	import type { Post } from '$lib/types';

	export let posts: Post[] = [];
</script>

{#if posts.length > 0}
	<section class="max-w-6xl mx-auto mb-16 px-8">
		<h2 class="text-3xl font-bold text-gray-900 text-center py-4">📌 Pinned</h2>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			{#each posts as post}
				<article
					class="relative bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1"
				>
					<div
						class="absolute -top-3 right-6 bg-primary-500 text-white px-4 py-2 rounded-full text-sm"
					>
						개발 로그
					</div>
					<h3 class="text-xl font-semibold mb-4">
						<a
							href="{base}/dev/{post.slug}"
							class="text-primary-500 hover:text-primary-600 transition-colors duration-200"
							>{post.title}</a
						>
					</h3>
					<p class="text-text mb-6 leading-relaxed">{post.excerpt}</p>
					<div class="flex justify-between items-center text-sm text-text-light">
						<time>{post.date}</time>
						<span>조회수: {post.view_count || 0}</span>
					</div>
				</article>
			{/each}
		</div>
	</section>
{/if}

<script lang="ts">
	import { base } from '$app/paths';
	import PageHeader from '../../lib/components/PageHeader.svelte';

	export let data;

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('ko-KR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function formatRelativeTime(dateString: string) {
		const now = new Date();
		const date = new Date(dateString);
		const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

		if (diffInHours < 1) return '방금 전';
		if (diffInHours < 24) return `${diffInHours}시간 전`;

		const diffInDays = Math.floor(diffInHours / 24);
		if (diffInDays < 7) return `${diffInDays}일 전`;

		return formatDate(dateString);
	}
</script>

<svelte:head>
	<title>블로그 - naroso-o.blog</title>
	<meta name="description" content="developer naroso-o's blog" />
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-8">
	<PageHeader title="개발 로그" description="개발 중 마주친 경험과 이슈들을 기록합니다." />

	<div class="space-y-8">
		{#each data.posts as post}
			<article
				class="bg-white border border-primary-200 rounded-xl p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary-500"
			>
				<header class="mb-4">
					<!-- {#if post.featured}
						<span
							class="inline-block bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium mb-3"
							>⭐ 추천</span
						>
					{/if} -->
					<h3 class="text-2xl font-semibold">
						<a
							href="{base}/dev/{post.slug}"
							class="text-gray-900 hover:text-primary-600 transition-colors duration-200"
							>{post.title}</a
						>
					</h3>
				</header>

				<p class="text-gray-600 leading-relaxed mb-6">{post.excerpt}</p>

				<footer class="flex justify-between items-center flex-wrap gap-4">
					<div class="flex items-center gap-2 text-sm text-gray-500">
						<time class="date">{formatRelativeTime(post.published_at || post.created_at)}</time>
						<span class="text-gray-300">•</span>
						<span class="view-count">조회 {post.view_count}회</span>
					</div>

					{#if post.tags && post.tags.length > 0}
						<div class="flex gap-2 flex-wrap">
							{#each post.tags as tag}
								<a
									href="/blog/tag/{tag}"
									class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 hover:text-gray-800 transition-colors duration-200"
									>#{tag}</a
								>
							{/each}
						</div>
					{/if}
				</footer>
			</article>
		{/each}
	</div>
</div>

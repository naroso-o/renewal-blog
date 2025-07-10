<script lang="ts">
	import FeaturedPosts from '$lib/components/FeaturedPosts.svelte';
	import HeroBanner from '$lib/components/HeroBanner.svelte';
	import type { Post } from '$lib/types';

	// 서버에서 받은 데이터
	export let data: {
		recentPosts: Post[];
		featuredPosts: Post[];
	};

	$: ({ recentPosts, featuredPosts } = data);
</script>

<svelte:head>
	<title>naroso-o.blog</title>
	<meta name="description" content="developer naroso-o's blog" />
</svelte:head>

<HeroBanner />
<!-- 추천 포스트 섹션 -->
<FeaturedPosts posts={featuredPosts} />

<!-- 최신 포스트 섹션 -->
<section class="max-w-6xl mx-auto px-8 pb-16">
	<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
		<h2 class="text-3xl font-bold text-gray-900">📝 최근 글</h2>
		<a href="/dev" class="font-medium transition-colors duration-200 hover:text-primary-500"
			>전체 보기 →</a
		>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
		{#each recentPosts as post}
			<article
				class="bg-white rounded-xl p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-gray-100"
			>
				<h3 class="text-xl font-semibold mb-4 leading-tight">
					<a
						href="/dev/{post.slug}"
						class="text-gray-900 hover:text-primary-500 transition-colors duration-200"
						>{post.title}</a
					>
				</h3>
				<p class="text-gray-600 mb-6 leading-relaxed text-sm">{post.excerpt}</p>
				<div class="flex justify-between items-center flex-wrap gap-2">
					<time class="text-sm text-gray-500">{post.date}</time>
					<div class="flex gap-2 flex-wrap">
						{#if post.tags && post.tags.length > 0}
							{#each post.tags.slice(0, 2) as tag}
								<span class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">#{tag}</span>
							{/each}
						{/if}
					</div>
				</div>
			</article>
		{/each}
	</div>

	{#if recentPosts.length === 0}
		<div class="text-center py-12 text-gray-500">
			<p>아직 작성된 글이 없습니다.</p>
			<p>첫 번째 글을 작성해보세요! ✍️</p>
		</div>
	{/if}
</section>

<style>
	/* 기존 float 애니메이션 */
	@keyframes float {
		0% {
			transform: translateY(0px);
		}
		100% {
			transform: translateY(-100px);
		}
	}
</style>

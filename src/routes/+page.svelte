<script lang="ts">
	import { base } from '$app/paths';
	import FeaturedPosts from '$lib/components/FeaturedPosts.svelte';
	import HeroBanner from '$lib/components/HeroBanner.svelte';
	import PostCard from '$lib/components/PostCard.svelte';
	import type { Post } from '$lib/types';
	import { formatDate } from '../lib/utils/date';

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
		<h2 class="text-3xl font-bold text-primary">📝 최근 글</h2>
		<a
			href="{base}/dev"
			class="font-medium text-brand-primary hover:text-brand-accent transition-colors duration-200"
			>전체 보기 →</a
		>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
		{#each recentPosts as post}
			<PostCard {post} variant="grid" maxTags={2} />
		{/each}
	</div>

	{#if recentPosts.length === 0}
		<div class="text-center py-12 text-tertiary">
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

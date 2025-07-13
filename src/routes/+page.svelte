<script lang="ts">
	import { base } from '$app/paths';
	import HeroBanner from '$lib/components/home/HeroBanner.svelte';
	import PostCard from '$lib/components/dev-log/PostCard.svelte';
	import type { Post } from '$lib/types';
	import HeroSection from '../lib/components/home/HeroSection.svelte';
	import NoPostMessage from '../lib/components/common/NoPostMessage.svelte';

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
<!-- {#if featuredPosts.length > 0}
	<HeroSection title="📌 Pinned" moreLink={`${base}/dev?pinned=true`}>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			{#each featuredPosts as post}
				<PostCard {post} variant="gradient" href={`${base}/dev/${post.slug}`} />
			{/each}
		</div>
	</HeroSection>
{/if} -->

<!-- 최신 포스트 섹션 -->
{#if recentPosts.length > 0}
	<HeroSection title="📝 최근 글" moreLink={`${base}/dev`}>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each recentPosts as post}
				<div class="place-self-center">
					<PostCard {post} href={`${base}/dev/${post.slug}`} />
				</div>
			{/each}
		</div>
		{#if recentPosts.length === 0}
			<NoPostMessage />
		{/if}
	</HeroSection>
{/if}

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

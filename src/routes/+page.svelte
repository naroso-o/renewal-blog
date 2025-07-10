<script lang="ts">
	import { onMount } from 'svelte';
	import FeaturedPosts from '$lib/components/FeaturedPosts.svelte';
	import HeroBanner from '$lib/components/HeroBanner.svelte';
	import type { Post } from '$lib/types';

	let recentPosts: Post[] = [];
	let featuredPosts: Post[] = [];
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		try {
			// 최신 포스트와 추천 포스트를 병렬로 가져오기
			const [recentResponse, featuredResponse] = await Promise.all([
				fetch('/api/posts?limit=4'),
				fetch('/api/posts?featured=true&limit=2')
			]);

			if (!recentResponse.ok || !featuredResponse.ok) {
				throw new Error('포스트를 불러올 수 없습니다.');
			}

			recentPosts = await recentResponse.json();
			featuredPosts = await featuredResponse.json();
		} catch (err) {
			error = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
			console.error('Error fetching posts:', err);
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>naroso-o.blog</title>
	<meta name="description" content="developer naroso-o's blog" />
</svelte:head>

<HeroBanner />

{#if loading}
	<div class="text-center py-16 px-8">
		<div
			class="w-10 h-10 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"
		></div>
		<p>글을 불러오는 중...</p>
	</div>
{:else if error}
	<section class="text-center py-16 px-8 max-w-2xl mx-auto">
		<h2 class="text-3xl font-bold text-red-600 mb-4">⚠️ 문제가 발생했습니다</h2>
		<p class="text-gray-600 mb-8">{error}</p>
		<button
			class="px-8 py-3 bg-primary-500 text-white rounded-lg font-medium transition-colors duration-200 hover:bg-primary-600"
			on:click={() => window.location.reload()}>다시 시도</button
		>
	</section>
{:else}
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

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
			{#each recentPosts as post}
				<article
					class="bg-white rounded-xl p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-gray-100"
				>
					<h3 class="text-xl font-semibold mb-4 leading-tight">
						<a
							href="/blog/{post.slug}"
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
									<span class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs"
										>#{tag}</span
									>
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

<script lang="ts">
	import PageHeader from '../../lib/components/PageHeader.svelte';
	import PostCard from '../../lib/components/PostCard.svelte';

	export let data;
</script>

<svelte:head>
	<title>블로그 - naroso-o.blog</title>
	<meta name="description" content="developer naroso-o's blog" />
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-8">
	<PageHeader title="개발 로그" description="개발 중 마주친 경험과 이슈들을 기록합니다." />

	<div class="space-y-8">
		{#each data.posts as post}
			<div class="place-self-center">
				<PostCard {post} variant="default" />
			</div>
		{/each}
	</div>
</div>

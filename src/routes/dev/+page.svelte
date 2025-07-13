<script lang="ts">
	import PageHeader from '../../lib/components/common/PageHeader.svelte';
	import PostCard from '../../lib/components/dev-log/PostCard.svelte';

	export let data;
</script>

<svelte:head>
	<title>naroso-o 개발 로그</title>
	<meta name="description" content="developer naroso-o's dev log" />
</svelte:head>

<div class="max-w-6xl mx-auto px-4 py-8">
	<PageHeader title="개발 로그" description="개발 중 마주친 경험과 이슈들을 기록합니다." />

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
		{#each data.posts as post}
			<div class="place-self-center">
				<PostCard {post} variant="default" />
			</div>
		{/each}
	</div>
</div>

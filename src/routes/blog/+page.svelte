<script lang="ts">
	import PageHeader from '$lib/components/common/PageHeader.svelte';
	import NoPostMessage from '../../lib/components/common/NoPostMessage.svelte';
	import PieceCard from '../../lib/components/life-blog/PieceCard.svelte';

	export let data;
</script>

<svelte:head>
	<title>naroso-o 일상 블로그</title>
	<meta name="description" content="developer naroso-o's daily life blog" />
</svelte:head>

<div class="max-w-6xl mx-auto px-4 py-8">
	<PageHeader title="블로그" description="일상을 기록합니다." />

	{#if data.pieces && data.pieces.length > 0}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each data.pieces as piece}
				<div class="place-self-center">
					<PieceCard {piece} />
				</div>
			{/each}
		</div>
	{:else}
		<NoPostMessage />
	{/if}
</div>

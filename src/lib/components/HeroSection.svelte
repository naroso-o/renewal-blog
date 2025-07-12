<script lang="ts">
	import type { Snippet } from 'svelte';

	export let title: string;
	export let moreLink: string | null = null;
	export let children: Snippet;
</script>

<section class="max-w-6xl mx-auto mb-16 px-8">
	<h2 class="text-3xl font-bold text-primary text-center pt-0 pb-2 sm:pb-4">
		{title}
	</h2>
	<div class="flex justify-end">
		{#if moreLink}
			<a
				href={moreLink}
				class="text-brand-primary hover:text-brand-accent transition-colors duration-200 pb-4"
				>더보기 →</a
			>
		{/if}
	</div>
	{@render children()}
</section>

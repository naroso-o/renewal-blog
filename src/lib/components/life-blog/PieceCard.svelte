<script lang="ts">
	import type { Piece } from '../../types';
	import { base } from '$app/paths';

	export let piece: Piece;
	export let href: string = `${base}/blog/${piece.slug}`;

	let imgElement: HTMLImageElement;
	let isLandscape = false;

	function handleImageLoad() {
		if (imgElement) {
			isLandscape = imgElement.naturalWidth > imgElement.naturalHeight;
		}
	}
</script>

<article
	class={`w-96 rounded-xl bg-card-bg border border-primary shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden flex flex-col`}
>
	<a {href} class="block">
		{#if piece.thumbnail}
			<div class={`w-full overflow-hidden ${isLandscape ? 'h-54' : 'h-80'}`}>
				<img
					bind:this={imgElement}
					src={piece.thumbnail}
					alt={piece.title}
					class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
					on:load={handleImageLoad}
				/>
			</div>
		{:else}
			<!-- 썸네일이 없는 경우 기본 배경 -->
			<div
				class="h-72 w-full bg-gradient-to-br from-primary/20 to-brand-primary/20 flex items-center justify-center"
			>
				<div class="text-primary/50 text-4xl font-bold">
					{piece.title.charAt(0).toUpperCase()}
				</div>
			</div>
		{/if}
	</a>
</article>

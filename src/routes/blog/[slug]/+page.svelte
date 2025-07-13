<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { formatDate, formatDistanceToNow } from '$lib/utils/date.js';
	import Comments from '$lib/components/dev-log/Comments.svelte';
	import MarkdownRenderer from '$lib/components/common/MarkdownRenderer.svelte';
	import type { Piece } from '$lib/types.js';

	export let data: { piece: Piece };
	$: piece = data.piece;

	let liked = false;
	let likesCount = 0;
	let bookmarked = false;
	let showShareMenu = false;

	onMount(() => {
		// 좋아요, 북마크 상태를 로컬 스토리지에서 불러오기
		const storedLikes = localStorage.getItem(`piece-${piece.id}-liked`);
		const storedBookmark = localStorage.getItem(`piece-${piece.id}-bookmarked`);

		liked = storedLikes === 'true';
		bookmarked = storedBookmark === 'true';

		// 실제 좋아요 수는 서버에서 가져와야 하지만, 여기서는 기본값 설정
		likesCount = Math.floor(Math.random() * 100) + 10;
	});
</script>

<svelte:head>
	<title>{piece.title} - naroso-o 일상 블로그</title>
	<meta name="description" content={piece.excerpt || ''} />
	<meta property="og:title" content={piece.title} />
	<meta property="og:description" content={piece.excerpt || ''} />
	{#if piece.thumbnail}
		<meta property="og:image" content={piece.thumbnail} />
	{/if}
</svelte:head>

<div class="min-h-screen bg-gray-50 py-8">
	<div class="max-w-7xl mx-auto px-4">
		<!-- 뒤로가기 버튼 -->
		<div class="mb-6">
			<a
				href="{base}/blog"
				class="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
			>
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
				블로그로 돌아가기
			</a>
		</div>

		<!-- 메인 카드 -->
		<div class="bg-white rounded-lg shadow-lg overflow-hidden w-full mx-auto">
			<!-- 헤더 -->
			<div class="p-4 border-b border-gray-200 flex items-center justify-between">
				<div class="flex items-end justify-between gap-3">
					<span class="font-semibold">{piece.title}</span>
					<span class="text-sm text-gray-500">{formatDate(piece.created_at)}</span>
				</div>
			</div>

			<!-- 이미지 -->
			<div
				class="w-full bg-gray-100 flex items-center justify-center"
				style="min-height: 200px; max-height: 600px;"
			>
				{#if piece.thumbnail}
					<img
						src={piece.thumbnail}
						alt={piece.title}
						class="max-w-full max-h-full object-contain"
						style="max-height: 600px;"
					/>
				{:else}
					<div
						class="w-full h-80 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
					>
						<div class="text-white/50 text-6xl font-bold">
							{piece.title.charAt(0).toUpperCase()}
						</div>
					</div>
				{/if}
			</div>

			<!-- 콘텐츠 -->
			<div class="p-4">
				{#if piece.content}
					<MarkdownRenderer
						content={piece.content}
						showExcerpt={piece.excerpt ? true : false}
						excerpt={piece.excerpt || ''}
					/>
				{/if}
				{#if piece.tags && piece.tags.length > 0}
					<div class="flex flex-wrap gap-2 mb-3 mt-4">
						{#each piece.tags as tag}
							<span class="text-brand-primary text-sm">#{tag}</span>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<!-- 클릭 외부 감지를 위한 이벤트 리스너 -->
<svelte:window
	on:click={(e) => {
		if (
			showShareMenu &&
			e.target &&
			(e.target as Element).closest &&
			!(e.target as Element).closest('.relative')
		) {
			showShareMenu = false;
		}
	}}
/>

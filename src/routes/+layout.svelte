<script lang="ts">
	import { base } from '$app/paths';
	import ThemeToggle from '../lib/components/header/ThemeToggle.svelte';
	import AdminLink from '../lib/components/header/AdminLink.svelte';

	let isDrawerOpen = false;

	function toggleDrawer() {
		isDrawerOpen = !isDrawerOpen;
	}

	function closeDrawer() {
		isDrawerOpen = false;
	}
</script>

<div class="flex flex-col min-h-screen">
	<header
		class="sticky top-0 z-50 px-4 py-4 md:px-8 bg-background/95 backdrop-blur-md border-b border-primary"
	>
		<div class="flex items-center justify-between">
			<!-- 로고 -->
			<a href="/" class="text-primary no-underline tracking-tight">
				<img src="/logo.png" alt="logo" class="w-10 h-10" />
			</a>

			<!-- 데스크톱 네비게이션 -->
			<nav class="hidden md:flex items-center justify-start gap-8">
				<a
					href="{base}/dev"
					class="text-primary no-underline transition-colors duration-200 tracking-normal hover:text-secondary"
					>개발 로그</a
				>
				<a
					href="{base}/blog"
					class="text-primary no-underline transition-colors duration-200 tracking-normal hover:text-secondary"
					>블로그</a
				>
			</nav>

			<!-- 데스크톱 우측 메뉴 -->
			<div class="items-center justify-end gap-4 hidden md:flex">
				<AdminLink />
				<ThemeToggle />
			</div>

			<!-- 모바일 햄버거 메뉴 버튼 -->
			<button
				class="md:hidden p-2 text-primary hover:text-secondary transition-colors duration-200"
				on:click={toggleDrawer}
				aria-label="메뉴 열기"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					></path>
				</svg>
			</button>
		</div>
	</header>

	<!-- 모바일 drawer 메뉴 -->
	{#if isDrawerOpen}
		<!-- 백드롭 -->
		<div
			class="fixed inset-0 bg-black/50 z-40 md:hidden"
			on:click={closeDrawer}
			on:keydown={(e) => e.key === 'Escape' && closeDrawer()}
			aria-label="메뉴 닫기"
			role="button"
			tabindex="0"
		></div>

		<!-- drawer 메뉴 -->
		<div
			class="fixed top-0 right-0 h-full max-w-72 w-full bg-background border-l border-primary z-50 md:hidden transform transition-transform duration-300 ease-in-out"
		>
			<!-- drawer 헤더 -->
			<div class="flex items-center justify-between p-4 border-b border-primary">
				<span class="text-primary font-semibold">메뉴</span>
				<button
					class="p-2 text-primary hover:text-secondary transition-colors duration-200"
					on:click={closeDrawer}
					aria-label="메뉴 닫기"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						></path>
					</svg>
				</button>
			</div>

			<!-- drawer 메뉴 내용 -->
			<nav class="p-4 space-y-4">
				<a
					href="{base}/dev"
					class="block text-primary no-underline transition-colors duration-200 tracking-normal hover:text-secondary py-2"
					on:click={closeDrawer}>개발 로그</a
				>
				<a
					href="{base}/blog"
					class="block text-primary no-underline transition-colors duration-200 tracking-normal hover:text-secondary py-2"
					on:click={closeDrawer}>블로그</a
				>
				<div class="flex items-center gap-2 justify-end">
					<AdminLink />
					<ThemeToggle />
				</div>
			</nav>
		</div>
	{/if}

	<main class="flex-1">
		<slot />
	</main>

	<footer class="pt-2 bg-background/95 backdrop-blur-md text-center border-t border-primary">
		<p class="m-0 text-secondary">&copy; 2025 naroso-o.blog</p>
	</footer>
</div>

<style>
	@import '../app.css';
</style>

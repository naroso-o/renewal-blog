<script lang="ts">
	import { base } from '$app/paths';
	import ThemeToggle from '../lib/components/ThemeToggle.svelte';
	import AdminLink from '../lib/components/AdminLink.svelte';
</script>

<div class="flex flex-col min-h-screen">
	<header
		class="sticky top-0 z-50 px-4 py-4 md:px-8 bg-background/95 backdrop-blur-md border-b border-primary"
	>
		<nav class="grid grid-cols-3 items-center max-w-6xl mx-auto gap-4">
			<div class="flex justify-start">
				<a href="/" class="text-primary no-underline tracking-tight">
					<img src="/logo.png" alt="logo" class="w-10 h-10" />
				</a>
			</div>

			<div class="flex items-center justify-center gap-6 md:gap-8">
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
			</div>

			<div class="flex items-center justify-end gap-4">
				<AdminLink />
				<ThemeToggle />
			</div>
		</nav>
	</header>

	<main class="flex-1">
		<slot />
	</main>

	<footer class="pt-2 bg-background/95 backdrop-blur-md text-center border-t border-primary">
		<p class="m-0 text-secondary">&copy; 2025 naroso-o.blog</p>
	</footer>
</div>

<style>
	@import '../app.css';

	/* 모바일 반응형 조정 */
	@media (max-width: 768px) {
		nav {
			grid-template-columns: auto 1fr auto;
			gap: 1rem;
		}

		/* 모바일에서 네비게이션 링크 간격 조정 */
		nav > div:nth-child(2) {
			gap: 1rem;
		}
	}

	/* 매우 작은 화면에서 네비게이션 세로 정렬 */
	@media (max-width: 480px) {
		nav {
			grid-template-columns: 1fr;
			grid-template-rows: auto auto auto;
			gap: 0.75rem;
			text-align: center;
		}

		nav > div {
			justify-content: center;
		}

		/* 모바일에서 아이콘들만 오른쪽 정렬 유지 */
		nav > div:last-child {
			justify-content: center;
		}
	}
</style>

<script lang="ts">
	import { base } from '$app/paths';
</script>

<div class="flex flex-col min-h-screen">
	<header
		class="sticky top-0 z-50 px-4 py-4 md:px-8 bg-white/95 backdrop-blur-md border-b border-gray-200"
	>
		<nav
			class="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto gap-4 md:gap-0"
		>
			<a href="/" class="text-gray-800 no-underline tracking-tight">홈</a>
			<div class="flex gap-6 md:gap-8">
				<a
					href="{base}/dev"
					class="text-gray-600 no-underline transition-colors duration-200 tracking-normal hover:text-blue-500"
					>개발 로그</a
				>
				<a
					href="{base}/blog"
					class="text-gray-600 no-underline transition-colors duration-200 tracking-normal hover:text-blue-500"
					>블로그</a
				>
				<a
					href="{base}/admin"
					class="text-gray-600 no-underline transition-colors duration-200 tracking-normal hover:text-blue-500"
					>관리자</a
				>
			</div>
		</nav>
	</header>

	<main class="flex-1">
		<slot />
	</main>

	<footer class="px-8 py-8 bg-gray-50 text-center border-t border-gray-200">
		<p class="m-0 text-gray-500">&copy; 2025 naroso-o.blog</p>
	</footer>
</div>

<style>
	@import '../app.css';
</style>

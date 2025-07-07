<!-- src/routes/+layout.svelte -->
<script>
	import '../app.css';
</script>

<div class="app">
	<header>
		<nav>
			<a href="/" class="logo">내 블로그</a>
			<div class="nav-links">
				<a href="/">홈</a>
				<a href="/blog">블로그</a>
				<a href="/about">소개</a>
			</div>
		</nav>
	</header>

	<main>
		<slot />
	</main>

	<footer>
		<p>&copy; 2025 My Blog. 개발과 기술을 사랑하는 블로그입니다.</p>
	</footer>
</div>

<style>
	/* 레이아웃과 색상만 정의 - 폰트는 글로벌 CSS에서 관리 */
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	header {
		padding: 1rem 2rem;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid #e5e7eb;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
		margin: 0 auto;
	}

	.logo {
		color: #1f2937;
		text-decoration: none;
		letter-spacing: var(--tracking-tight);
	}

	.nav-links {
		display: flex;
		gap: 2rem;
	}

	.nav-links a {
		color: #4b5563;
		text-decoration: none;
		transition: color 0.2s ease;
		letter-spacing: var(--tracking-normal);
	}

	.nav-links a:hover {
		color: #3b82f6;
	}

	main {
		flex: 1;
		padding: 0;
	}

	footer {
		padding: 2rem;
		background: #f9fafb;
		text-align: center;
		border-top: 1px solid #e5e7eb;
	}

	footer p {
		margin: 0;
		color: #6b7280;
	}

	@media (max-width: 768px) {
		header {
			padding: 1rem;
		}

		nav {
			flex-direction: column;
			gap: 1rem;
		}

		.nav-links {
			gap: 1.5rem;
		}
	}
</style>

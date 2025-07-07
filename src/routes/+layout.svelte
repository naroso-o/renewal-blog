<div class="app">
	<header>
		<nav>
			<a href="/">홈</a>
			<a href="/blog">블로그</a>
			<a href="/about">소개</a>
		</nav>
	</header>

	<main>
		<slot />
	</main>

	<footer>
		<p>&copy; 2025 My Blog. All rights reserved.</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	header {
		padding: 1rem;
		background: #f8f9fa;
		border-bottom: 1px solid #e9ecef;
	}

	nav {
		display: flex;
		gap: 1rem;
	}

	nav a {
		text-decoration: none;
		color: #333;
		font-weight: 500;
	}

	nav a:hover {
		color: #007bff;
	}

	main {
		flex: 1;
		padding: 2rem;
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
	}

	footer {
		padding: 1rem;
		background: #333;
		color: white;
		text-align: center;
	}
</style>

<script lang="ts">
	import { base } from '$app/paths';
	import Button from './Button.svelte';
</script>

<section
	class="w-full relative text-center py-24 bg-background-gradient text-primary mb-12 overflow-hidden"
>
	<!-- 움직이는 빗방울 배경 애니메이션 -->
	<div class="absolute inset-0 overflow-hidden">
		<!-- 빗방울들 - 테두리 위주로 배치 -->
		<div class="raindrop raindrop-1"></div>
		<div class="raindrop raindrop-2"></div>
		<div class="raindrop raindrop-3"></div>
		<div class="raindrop raindrop-4"></div>
		<div class="raindrop raindrop-5"></div>
		<div class="raindrop raindrop-6"></div>
		<div class="raindrop raindrop-7"></div>
		<div class="raindrop raindrop-8"></div>
		<div class="raindrop raindrop-9"></div>
		<div class="raindrop raindrop-10"></div>
		<div class="raindrop raindrop-11"></div>
		<div class="raindrop raindrop-12"></div>
	</div>

	<div class="relative z-10">
		<h2 class="text-4xl md:text-6xl font-extrabold mb-4 text-brand-primary">안녕하세요.</h2>
		<p class="text-xl text-inverse mb-8">개발, 일상 이야기를 모은 공간입니다.</p>
		<div class="flex flex-col items-center sm:flex-row gap-4 justify-center flex-wrap">
			<Button href={`${base}/dev`} variant="primary" size="lg">개발 로그</Button>
			<Button href={`${base}/blog`} variant="secondary" size="lg">블로그</Button>
		</div>
	</div>
</section>

<style>
	@import '../../app.css';
	/* 빗방울 애니메이션 */
	.raindrop {
		position: absolute;
		width: 2px;
		height: 20px;
		background: linear-gradient(to bottom, #f25287, #e02257);
		border-radius: 0 0 50% 50%;
		animation: raindrop-fall 3s linear infinite;
		opacity: 0.6;
	}

	.raindrop-1 {
		left: 5%;
		animation-delay: 0s;
	}
	.raindrop-2 {
		left: 15%;
		animation-delay: 0.5s;
	}
	.raindrop-3 {
		left: 25%;
		animation-delay: 1s;
	}
	.raindrop-4 {
		left: 35%;
		animation-delay: 1.5s;
	}
	.raindrop-5 {
		left: 65%;
		animation-delay: 2s;
	}
	.raindrop-6 {
		left: 75%;
		animation-delay: 2.5s;
	}
	.raindrop-7 {
		left: 85%;
		animation-delay: 0.3s;
	}
	.raindrop-8 {
		left: 95%;
		animation-delay: 0.8s;
	}
	.raindrop-9 {
		left: 8%;
		animation-delay: 1.2s;
	}
	.raindrop-10 {
		left: 92%;
		animation-delay: 1.7s;
	}
	.raindrop-11 {
		left: 12%;
		animation-delay: 2.2s;
	}
	.raindrop-12 {
		left: 88%;
		animation-delay: 0.7s;
	}

	@keyframes raindrop-fall {
		0% {
			transform: translateY(-100px);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		100% {
			transform: translateY(100vh);
			opacity: 0;
		}
	}
</style>

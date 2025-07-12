<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '../lib';
	import { onMount } from 'svelte';

	// 에러 타입별 메시지와 액션 정의
	const errorMessages: Record<
		number,
		{
			title: string;
			description: string;
			icon: string;
			actions: Array<{ label: string; href: string; variant?: 'primary' | 'secondary' }>;
		}
	> = {
		404: {
			title: '페이지를 찾을 수 없습니다',
			description: '요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.',
			icon: '🔍',
			actions: [
				{ label: '홈으로 돌아가기', href: '/', variant: 'primary' },
				{ label: '개발 로그 보기', href: '/dev', variant: 'secondary' }
			]
		},
		500: {
			title: '서버 오류가 발생했습니다',
			description: '일시적인 서버 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
			icon: '⚠️',
			actions: [
				{ label: '새로고침', href: '', variant: 'primary' },
				{ label: '홈으로 돌아가기', href: '/', variant: 'secondary' }
			]
		},
		403: {
			title: '접근 권한이 없습니다',
			description: '이 페이지에 접근할 권한이 없습니다.',
			icon: '🔒',
			actions: [
				{ label: '홈으로 돌아가기', href: '/', variant: 'primary' },
				{ label: '로그인', href: '/admin', variant: 'secondary' }
			]
		}
	};

	// 기본 에러 메시지
	const defaultError = {
		title: '알 수 없는 오류가 발생했습니다',
		description: '예상치 못한 오류가 발생했습니다. 관리자에게 문의해주세요.',
		icon: '❌',
		actions: [
			{ label: '홈으로 돌아가기', href: '/', variant: 'primary' as const },
			{ label: '새로고침', href: '', variant: 'secondary' as const }
		]
	};

	$: currentError = errorMessages[page.status] || defaultError;
	$: errorDetails = page.error;

	function handleRefresh() {
		if (typeof window !== 'undefined') {
			window.location.reload();
		}
	}

	// 에러 로깅 (개발 환경에서만)
	onMount(() => {
		if (typeof window !== 'undefined' && import.meta.env.DEV) {
			console.group('🚨 SvelteKit Error Details');
			console.log('Status:', page.status);
			console.log('Error:', errorDetails);
			console.log('URL:', page.url.href);
			console.groupEnd();
		}
	});
</script>

<svelte:head>
	<title>{page.status} - {currentError.title}</title>
	<meta name="description" content={currentError.description} />
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-background px-4 py-8">
	<div class="max-w-md w-full text-center">
		<!-- 에러 아이콘 -->
		<div class="text-6xl mb-6 animate-bounce">
			{currentError.icon}
		</div>

		<!-- 에러 상태 코드 -->
		<div class="text-4xl font-bold text-primary mb-4">
			{page.status}
		</div>

		<!-- 에러 제목 -->
		<h1 class="text-xl font-semibold text-primary mb-3">
			{currentError.title}
		</h1>

		<!-- 에러 설명 -->
		<p class="text-secondary mb-6 leading-relaxed">
			{currentError.description}
		</p>

		<!-- 에러 메시지 (개발 환경에서만 표시) -->
		{#if errorDetails && (errorDetails.code || errorDetails.details)}
			<div class="bg-surface border border-primary/20 rounded-lg p-4 mb-6 text-left">
				<div class="text-sm font-medium text-primary mb-2">기술적 세부사항:</div>

				{#if errorDetails.code}
					<div class="text-xs text-secondary mb-1">
						<span class="font-medium">코드:</span>
						{errorDetails.code}
					</div>
				{/if}

				{#if errorDetails.message}
					<div class="text-xs text-secondary mb-1">
						<span class="font-medium">메시지:</span>
						{errorDetails.message}
					</div>
				{/if}

				{#if errorDetails.details}
					<div class="text-xs text-secondary">
						<span class="font-medium">세부사항:</span>
						{errorDetails.details}
					</div>
				{/if}
			</div>
		{/if}

		<!-- 액션 버튼들 -->
		<div class="flex flex-col sm:flex-row gap-3 justify-center">
			{#each currentError.actions as action}
				{#if action.href === ''}
					<Button
						onclick={() => handleRefresh()}
						variant={action.variant || 'primary'}
						size="md"
						fullWidth={true}
					>
						{action.label}
					</Button>
				{:else}
					<Button
						href={action.href}
						variant={action.variant || 'primary'}
						size="md"
						fullWidth={true}
					>
						{action.label}
					</Button>
				{/if}
			{/each}
		</div>

		<!-- 추가 도움말 -->
		<div class="mt-8 text-xs text-tertiary">
			<p>문제가 계속 발생하면 관리자에게 문의해주세요.</p>
			<p class="mt-1">에러 코드: {page.status} | 시간: {new Date().toLocaleString('ko-KR')}</p>
		</div>
	</div>
</div>

<style>
	@keyframes bounce {
		0%,
		20%,
		53%,
		80%,
		100% {
			transform: translateY(0);
		}
		40%,
		43% {
			transform: translateY(-10px);
		}
		70% {
			transform: translateY(-5px);
		}
		90% {
			transform: translateY(-2px);
		}
	}

	.animate-bounce {
		animation: bounce 2s infinite;
	}
</style>

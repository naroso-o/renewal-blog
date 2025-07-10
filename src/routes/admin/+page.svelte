<script>
	import Signin from '$lib/components/Signin.svelte';
	import BlogEditor from '$lib/components/BlogEditor.svelte';
	import { supabase, adminService } from '$lib/supabase.js';
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button.svelte';

	let isSignedIn = false;
	let isAdmin = false;
	let loading = true;

	onMount(async () => {
		// 현재 세션 확인
		const {
			data: { session }
		} = await supabase.auth.getSession();
		isSignedIn = !!session;

		if (isSignedIn) {
			// 관리자 권한 확인
			isAdmin = await adminService.isAdmin();
		}

		loading = false;

		// 인증 상태 변경 감지
		supabase.auth.onAuthStateChange(async (event, session) => {
			isSignedIn = !!session;

			if (isSignedIn) {
				isAdmin = await adminService.isAdmin();
			} else {
				isAdmin = false;
			}
		});
	});

	async function handleSignOut() {
		await supabase.auth.signOut();
	}
</script>

{#if loading}
	<div class="min-h-screen flex items-center justify-center">
		<div class="text-lg">로딩 중...</div>
	</div>
{:else if isSignedIn && isAdmin}
	<div class="min-h-screen bg-gray-50">
		<header class="flex justify-end p-4">
			<Button size="sm" onclick={handleSignOut}>로그아웃</Button>
		</header>
		<!-- 메인 콘텐츠 -->
		<main>
			<BlogEditor />
		</main>
	</div>
{:else if isSignedIn && !isAdmin}
	<div class="min-h-screen flex items-center justify-center bg-gray-50">
		<div class="max-w-md w-full space-y-8 p-6">
			<div class="text-center">
				<h2 class="text-3xl font-bold text-gray-900 mb-4">접근 권한 없음</h2>
				<p class="text-gray-600 mb-8">관리자 권한이 필요합니다. 관리자에게 문의하세요.</p>
				<div class="space-y-4">
					<button
						on:click={handleSignOut}
						class="w-full px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
					>
						로그아웃
					</button>
				</div>
			</div>
		</div>
	</div>
{:else}
	<Signin />
{/if}

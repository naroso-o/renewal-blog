<script lang="ts">
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
		<main>
			<BlogEditor />
		</main>
	</div>
{:else}
	<Signin />
{/if}

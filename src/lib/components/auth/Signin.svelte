<script lang="ts">
	import { supabase } from '$lib/supabase.js';
	import Button from '../entity/Button.svelte';
	import Input from '../entity/Input.svelte';

	let email = '';
	let password = '';
	let loading = false;
	let error = '';

	async function handleSignIn() {
		if (!email || !password) {
			error = '이메일과 비밀번호를 입력해주세요.';
			return;
		}

		loading = true;
		error = '';

		try {
			const { data, error: signInError } = await supabase.auth.signInWithPassword({
				email,
				password
			});

			if (signInError) {
				error = signInError.message;
			} else {
				// 로그인 성공 시 페이지 새로고침
				window.location.reload();
			}
		} catch (err) {
			error = '로그인 중 오류가 발생했습니다.';
			console.error('Sign in error:', err);
		} finally {
			loading = false;
		}
	}

	// async function handleSignUp() {
	// 	if (!email || !password) {
	// 		error = '이메일과 비밀번호를 입력해주세요.';
	// 		return;
	// 	}

	// 	loading = true;
	// 	error = '';

	// 	try {
	// 		const { data, error: signUpError } = await supabase.auth.signUp({
	// 			email,
	// 			password
	// 		});

	// 		if (signUpError) {
	// 			error = signUpError.message;
	// 		} else {
	// 			error = '가입 확인 이메일을 확인해주세요.';
	// 		}
	// 	} catch (err) {
	// 		error = '회원가입 중 오류가 발생했습니다.';
	// 		console.error('Sign up error:', err);
	// 	} finally {
	// 		loading = false;
	// 	}
	// }
</script>

<div class="min-h-screen flex justify-center bg-background py-24 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-primary">관리자 로그인</h2>
			<p class="mt-2 text-center text-sm text-secondary">블로그 포스트를 작성하려면 로그인하세요</p>
		</div>
		<form class="mt-8 space-y-6" onsubmit={handleSignIn}>
			<div class="rounded-md shadow-sm -space-y-px">
				<Input
					id="email"
					label="이메일"
					bind:value={email}
					type="email"
					required
					placeholder="이메일 주소"
					className="sr-only"
				/>
				<Input
					id="password"
					label="비밀번호"
					bind:value={password}
					type="password"
					required
					placeholder="비밀번호"
					className="sr-only"
				/>
			</div>

			{#if error}
				<div class="text-red-600 text-sm text-center">
					{error}
				</div>
			{/if}

			<div class="flex justify-center">
				<Button type="submit" size="md">로그인</Button>
			</div>
		</form>
	</div>
</div>

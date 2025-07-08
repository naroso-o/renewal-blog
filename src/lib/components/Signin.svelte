<script>
	import { supabase } from '$lib/supabase.js';
	import { goto } from '$app/navigation';

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

	async function handleSignUp() {
		if (!email || !password) {
			error = '이메일과 비밀번호를 입력해주세요.';
			return;
		}

		loading = true;
		error = '';

		try {
			const { data, error: signUpError } = await supabase.auth.signUp({
				email,
				password
			});

			if (signUpError) {
				error = signUpError.message;
			} else {
				error = '가입 확인 이메일을 확인해주세요.';
			}
		} catch (err) {
			error = '회원가입 중 오류가 발생했습니다.';
			console.error('Sign up error:', err);
		} finally {
			loading = false;
		}
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">관리자 로그인</h2>
			<p class="mt-2 text-center text-sm text-gray-600">블로그 포스트를 작성하려면 로그인하세요</p>
		</div>
		<form class="mt-8 space-y-6" on:submit|preventDefault={handleSignIn}>
			<div class="rounded-md shadow-sm -space-y-px">
				<div>
					<label for="email" class="sr-only">이메일</label>
					<input
						id="email"
						bind:value={email}
						type="email"
						required
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
						placeholder="이메일 주소"
					/>
				</div>
				<div>
					<label for="password" class="sr-only">비밀번호</label>
					<input
						id="password"
						bind:value={password}
						type="password"
						required
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
						placeholder="비밀번호"
					/>
				</div>
			</div>

			{#if error}
				<div class="text-red-600 text-sm text-center">
					{error}
				</div>
			{/if}

			<div class="flex space-x-4">
				<button
					type="submit"
					disabled={loading}
					class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
				>
					{loading ? '로그인 중...' : '로그인'}
				</button>
				<button
					type="button"
					on:click={handleSignUp}
					disabled={loading}
					class="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
				>
					{loading ? '가입 중...' : '회원가입'}
				</button>
			</div>
		</form>
	</div>
</div>

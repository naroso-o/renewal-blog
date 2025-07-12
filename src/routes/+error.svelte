<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '../lib';
</script>

<div class="max-w-4xl mx-auto px-4 py-8">
	<div class="flex flex-col items-center justify-center gap-8">
		<h1 class="text-center text-2xl font-bold">{page.status} {page.error?.message}</h1>
		<Button href="/" variant="primary">돌아가기</Button>
	</div>
</div>

<style>
	h1 {
		font-size: 2rem;
		font-weight: bold;
		color: #333;
	}
</style>

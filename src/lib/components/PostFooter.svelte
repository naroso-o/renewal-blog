<script lang="ts">
	import { base } from '$app/paths';
	import Button from './Button.svelte';
	import Comments from './Comments.svelte';

	export let postId: string;
</script>

<footer class="border-t border-primary pt-8">
	<div class="text-center mb-8">
		<p class="text-lg text-secondary mb-4">이 글이 도움이 되었나요?</p>
		<div class="flex gap-4 justify-center flex-wrap">
			<Button onclick={() => {}} variant="secondary" size="md">❤️ 좋아요</Button>
			<Button onclick={() => {}} variant="secondary" size="md">🔗 공유하기</Button>
		</div>
	</div>

	<div class="text-center">
		<a href="{base}/dev" class="text-brand-primary hover:underline transition-colors duration-200">
			← 개발 로그로 돌아가기
		</a>
	</div>

	<Comments {postId} />
</footer>

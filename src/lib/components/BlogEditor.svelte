<script lang="ts">
	import { marked } from 'marked';
	import { supabase } from '$lib/supabase.js';
	import { browser } from '$app/environment';
	import Button from './Button.svelte';

	let title = '';
	let content = '';
	let isSaving = false;
	let saveMessage = '';
	let showPreview = false;

	// 마크다운을 HTML로 변환
	$: htmlContent = marked(content);

	async function savePost() {
		if (!title.trim() || !content.trim()) {
			saveMessage = '제목과 내용을 모두 입력해주세요.';
			return;
		}

		isSaving = true;
		saveMessage = '';

		try {
			// slug 생성 (제목을 기반으로)
			const slug = title
				.toLowerCase()
				.replace(/[^a-z0-9가-힣\s]/g, '')
				.replace(/\s+/g, '-')
				.trim();

			// Supabase에 직접 저장
			const { data, error } = await supabase
				.from('posts')
				.insert({
					title: title.trim(),
					content: content.trim(),
					slug: slug,
					excerpt: content.trim().substring(0, 150) + '...',
					tags: [],
					status: 'published',
					published_at: new Date().toISOString(),
					view_count: 0,
					featured: false
				})
				.select()
				.single();

			if (error) {
				console.error('Supabase Error:', error);
				saveMessage = '포스트 저장에 실패했습니다. 다시 시도해주세요.';
			} else {
				saveMessage = '포스트가 성공적으로 저장되었습니다!';
				// 저장 후 폼 초기화
				title = '';
				content = '';
			}
		} catch (error) {
			console.error('Error saving post:', error);
			saveMessage = '네트워크 오류가 발생했습니다. 다시 시도해주세요.';
		} finally {
			isSaving = false;
		}
	}

	function togglePreview() {
		showPreview = !showPreview;
	}
</script>

<div class="max-w-7xl mx-auto p-6">
	<h1 class="text-3xl font-bold mb-6 text-gray-800">블로그 에디터</h1>

	<div class="space-y-6">
		<!-- 제목 입력 -->
		<div>
			<label for="title" class="block text-sm font-medium text-gray-700 mb-2"> 제목 </label>
			<input
				id="title"
				type="text"
				bind:value={title}
				placeholder="포스트 제목을 입력하세요"
				class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
			/>
		</div>

		<!-- 에디터 컨트롤 -->
		<div class="flex items-center justify-between">
			<label for="content" class="block text-sm font-medium text-gray-700"> 내용 </label>
			<Button type="button" size="sm" onclick={togglePreview} variant="outline">
				{showPreview ? '편집 모드' : '미리보기'}
			</Button>
		</div>

		<!-- 에디터/미리보기 영역 -->
		<div class="grid {showPreview ? 'grid-cols-2 gap-4' : 'grid-cols-1'}">
			<!-- 마크다운 에디터 -->
			<div class={showPreview ? '' : 'w-full'}>
				<textarea
					bind:value={content}
					placeholder="마크다운으로 포스트 내용을 작성하세요..."
					class="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
				></textarea>
			</div>

			<!-- 미리보기 -->
			{#if showPreview}
				<div class="border border-gray-300 rounded-lg p-4 h-96 overflow-y-auto">
					<div class="prose prose-sm max-w-none">
						{@html htmlContent}
					</div>
				</div>
			{/if}
		</div>

		<!-- 마크다운 도움말 -->
		<div class="bg-gray-50 p-4 rounded-lg">
			<h3 class="text-sm font-medium text-gray-700 mb-2">마크다운 문법 도움말</h3>
			<div class="text-xs text-gray-600 space-y-1">
				<p><strong>제목:</strong> # 제목1, ## 제목2, ### 제목3</p>
				<p><strong>굵게:</strong> **굵은 텍스트**</p>
				<p><strong>기울임:</strong> *기울임 텍스트*</p>
				<p><strong>링크:</strong> [텍스트](URL)</p>
				<p><strong>이미지:</strong> ![대체텍스트](이미지URL)</p>
				<p><strong>코드:</strong> `인라인 코드` 또는 ```코드 블록```</p>
			</div>
		</div>

		<!-- 저장 버튼 -->
		<div class="flex items-center space-x-4">
			<Button type="submit" size="md" onclick={savePost}>저장</Button>
			{#if isSaving}
				<span class="text-sm text-gray-600">저장 중...</span>
			{/if}

			{#if saveMessage}
				<span class="text-sm {saveMessage.includes('성공') ? 'text-green-600' : 'text-red-600'}">
					{saveMessage}
				</span>
			{/if}
		</div>
	</div>
</div>

<style>
	/* 마크다운 미리보기 스타일 */
	:global(.prose) {
		color: #374151;
	}

	:global(.prose h1) {
		font-size: 1.5rem;
		font-weight: 700;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}

	:global(.prose h2) {
		font-size: 1.25rem;
		font-weight: 600;
		margin-top: 1.25rem;
		margin-bottom: 0.5rem;
	}

	:global(.prose h3) {
		font-size: 1.125rem;
		font-weight: 600;
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}

	:global(.prose p) {
		margin-bottom: 0.75rem;
		line-height: 1.6;
	}

	:global(.prose code) {
		background-color: #1f2937;
		color: #f9fafb;
		padding: 0.125rem 0.25rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
	}

	:global(.prose pre) {
		background-color: #1f2937;
		color: #f9fafb;
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin-bottom: 0.75rem;
	}

	:global(.prose pre code) {
		background-color: transparent;
		color: #f9fafb;
		padding: 0;
	}

	:global(.prose blockquote) {
		border-left: 4px solid #d1d5db;
		padding-left: 1rem;
		margin-left: 0;
		color: #6b7280;
	}

	:global(.prose ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
		margin-bottom: 0.75rem;
	}

	:global(.prose ol) {
		list-style-type: decimal;
		padding-left: 1.5rem;
		margin-bottom: 0.75rem;
	}

	:global(.prose li) {
		margin-bottom: 0.25rem;
	}
</style>

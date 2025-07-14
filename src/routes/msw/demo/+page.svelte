<script lang="ts">
	export let data;
	const { values } = data;
</script>

<div class="p-6 max-w-2xl mx-auto">
	<h1 class="text-2xl font-bold mb-4">MSW 데모 페이지</h1>
	
	<div class="bg-gray-100 p-4 rounded-lg">
		<h2 class="text-lg font-semibold mb-2">MSW로 받은 데이터:</h2>
		
		<div class="mb-3">
			<strong>메시지:</strong> {values.message}
		</div>
		
		<div class="mb-3">
			<strong>아이템 목록:</strong>
			<ul class="list-disc list-inside ml-4">
				{#each values.items as item}
					<li>{item}</li>
				{/each}
			</ul>
		</div>
	</div>
</div> 
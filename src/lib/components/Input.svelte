<script lang="ts">
	export let id: string;
	export let label: string;
	export let value: string;
	export let type: string;
	export let required: boolean;
	export let placeholder: string;
	export let className: string;
	export let oninput: ((event: Event) => void) | undefined = undefined;

	// 값 변경 시 부모 컴포넌트에 알림
	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		value = target.value;
		if (oninput) {
			oninput(event);
		}
	}
</script>

<div>
	<label for={id} class={className}>{label}</label>
	<input
		{id}
		bind:value
		{type}
		{required}
		class="appearance-none rounded-none relative block w-full px-3 py-2 border bg-background border-primary placeholder-secondary text-primary rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
		{placeholder}
		on:input={handleInput}
	/>
</div>

<script lang="ts">
	export let id: string = '';
	export let label: string = '';
	export let value: string = '';
	export let type: string = 'text';
	export let required: boolean = false;
	export let placeholder: string = '';
	export let className: string = '';
	export let error: string = '';
	export let minlength: number | undefined = undefined;
	export let oninput: ((event: Event) => void) | undefined = undefined;

	// 값 변경 시 부모 컴포넌트에 알림
	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		value = target.value;
		if (oninput) {
			oninput(event);
		}
	}

	$: inputClasses = [
		'appearance-none rounded-none relative block w-full px-3 py-2 border bg-surface',
		'placeholder-secondary text-primary rounded-md focus:outline-none focus:ring-2',
		'focus:ring-brand-primary focus:border-transparent focus:z-10 sm:text-sm',
		'transition-all duration-200',
		error ? 'border-red-500 focus:ring-red-500' : 'border-primary/20'
	].join(' ');
</script>

<div class="w-full">
	{#if label}
		<label for={id} class="block text-sm font-medium text-primary mb-1 {className}">
			{label}
		</label>
	{/if}
	<input
		{id}
		bind:value
		{type}
		{required}
		{minlength}
		class={inputClasses}
		{placeholder}
		on:input={handleInput}
	/>
	{#if error}
		<p class="mt-1 text-sm text-red-500">{error}</p>
	{/if}
</div>

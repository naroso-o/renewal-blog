<script lang="ts">
	export let value: string = '';
	export let placeholder: string = '';
	export let options: { value: string; label: string }[] = [];
	export let disabled: boolean = false;
</script>

<select
	bind:value
	{disabled}
	class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
>
	{#if placeholder}
		<option value="" disabled selected={value === ''}>{placeholder}</option>
	{/if}
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>

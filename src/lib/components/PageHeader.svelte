<script lang="ts">
	export let title: string = '';
	export let description: string = '';
</script>

<header class="text-center mt-12 mb-16">
	<h2 class="text-4xl font-bold text-gray-900 mb-2">{title}</h2>
	<p class="text-lg text-gray-600">{description}</p>
</header>

<style>
	@import '../../app.css';
</style>

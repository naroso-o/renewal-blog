<script lang="ts">
	export let variant: 'fill' | 'outline' = 'fill';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let type: 'button' | 'submit' = 'button';
	export let onclick: () => void = () => {};

	// 기본 클래스
	let baseClasses =
		'inline-flex cursor-pointer whitespace-nowrap items-center justify-center font-semibold transition-all duration-300 rounded-xl no-underline';

	// 크기별 클래스
	let sizeClasses = {
		sm: 'px-4 py-2 text-sm max-w-24',
		md: 'px-8 py-3 text-base max-w-32',
		lg: 'px-10 py-4 text-lg max-w-40'
	};

	// 스타일별 클래스
	let variantClasses = {
		fill: 'bg-gradient-to-r from-primary-400 to-primary-600 text-white shadow-lg hover:shadow-xl hover:scale-105',
		outline:
			'bg-white text-color-text border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:scale-105'
	};

	$: buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`;
</script>

<button {type} {onclick} class={buttonClasses}>
	<slot />
</button>

<style>
</style>

<script lang="ts">
	export let href: string;
	export let variant: 'fill' | 'outline' = 'fill';
	export let size: 'sm' | 'md' | 'lg' = 'md';

	// 기본 클래스
	let baseClasses =
		'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-full no-underline';

	// 크기별 클래스
	let sizeClasses = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-8 py-3 text-base',
		lg: 'px-10 py-4 text-lg'
	};

	// 스타일별 클래스
	let variantClasses = {
		fill: 'bg-gradient-to-r from-primary-400 to-primary-600 text-white shadow-lg hover:shadow-xl hover:scale-105',
		outline:
			'bg-white text-color-text border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:scale-105'
	};

	$: buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`;
</script>

<a {href} class={buttonClasses}>
	<slot />
</a>

<style>
	/* 전역 링크 스타일 무시 */
	a {
		text-decoration: none !important;
	}

	a:hover {
		text-decoration: none !important;
		color: inherit !important;
	}
</style>

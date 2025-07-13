<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled: boolean = false;
	export let href: string | undefined = undefined;
	export let fullWidth: boolean = false;
	export let onclick: () => void = () => {};

	$: baseClasses = [
		'inline-flex items-center justify-center gap-2 font-medium no-underline',
		'border rounded-lg transition-all duration-200 focus:outline-none',
		'focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--color-border-focus)]',
		fullWidth ? 'w-full' : '',
		disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-px'
	]
		.filter(Boolean)
		.join(' ');

	$: sizeClasses = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-6 py-3 text-lg'
	}[size];

	$: variantClasses = {
		primary: [
			'bg-gradient-to-br from-[#f25287] to-[#e02257] text-white border-transparent',
			'hover:from-[#f86ea0] hover:to-[#f25287] hover:shadow-lg hover:shadow-pink-500/30',
			'active:from-[#e02257] active:to-[#c3133f] active:translate-y-0'
		].join(' '),

		secondary: [
			'bg-gradient-to-br from-[#fdf2f6] to-[#f9e7e7] text-[#c3133f] border-[color:var(--color-border-primary)]',
			'hover:from-[#fccee1] hover:to-[#f7d9d9] hover:border-[color:var(--color-border-focus)]',
			'hover:shadow-lg hover:shadow-pink-500/20 active:from-[#f7d9d9] active:to-[#eeb3b3] active:translate-y-0'
		].join(' '),

		ghost: [
			'bg-transparent text-[color:var(--color-btn-ghost-text)] border-transparent',
			'hover:bg-[color:var(--color-btn-ghost-hover)]'
		].join(' '),

		outline: [
			'bg-transparent text-[color:var(--color-btn-secondary-text)] border-[color:var(--color-border-primary)]',
			'hover:bg-[color:var(--color-btn-secondary-hover)] hover:border-[color:var(--color-border-focus)]'
		].join(' '),

		danger: [
			'bg-gradient-to-br from-red-500 to-red-600 text-white border-transparent',
			'hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:shadow-red-500/30',
			'active:from-red-700 active:to-red-800 active:translate-y-0'
		].join(' ')
	}[variant];

	$: classes = `${baseClasses} ${sizeClasses} ${variantClasses}`;
</script>

{#if href}
	<a {href} class={classes} role="button" tabindex={disabled ? -1 : 0} aria-disabled={disabled}>
		<slot />
	</a>
{:else}
	<button {type} {disabled} class={classes} {onclick}>
		<slot />
	</button>
{/if}

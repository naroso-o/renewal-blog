export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {},
    },
	plugins: [(await import('@tailwindcss/typography')).default]
};
/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	try {
		const response = await fetch('/msw/demo/__data.json');
		const data = await response.json();
		return data;
	} catch (error) {
		// Fallback data if MSW is not enabled or error occurs
		console.warn('MSW data fetch failed:', error);
		return {
			values: ['production', 'data', 'not', 'msw']
		};
	}
} 
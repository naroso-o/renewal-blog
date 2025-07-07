import { postService } from '$lib/supabase.js'

export async function load({ url }) {
  const page = parseInt(url.searchParams.get('page') || '1')
  const limit = 10
  const offset = (page - 1) * limit
  
  try {
    const [posts, allTags] = await Promise.all([
      postService.getPosts(limit, offset),
      postService.getAllTags()
    ])
    
    return {
      posts,
      allTags,
      currentPage: page,
      hasMore: posts.length === limit
    }
  } catch (error) {
    console.error('Error loading posts:', error)
    return {
      posts: [],
      allTags: [],
      currentPage: 1,
      hasMore: false,
      error: error instanceof Error ? error.message : 'Unknown error'
		};
	}
}
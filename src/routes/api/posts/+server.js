// src/routes/api/posts/+server.js
import { json } from '@sveltejs/kit'
import { postService } from '$lib/supabase.js'

export async function GET({ url }) {
  try {
    const limit = parseInt(url.searchParams.get('limit') || '5') // 홈페이지용으로 기본 5개
    const featured = url.searchParams.get('featured') === 'true'
    
    let posts
    
    if (featured) {
      // 추천 포스트만 가져오기
      posts = await postService.getFeaturedPosts(limit)
    } else {
      // 최신 포스트 가져오기
      posts = await postService.getPosts(limit, 0)
    }
    
    // 홈페이지용 날짜 포맷 추가
    const formattedPosts = posts.map(post => ({
      ...post,
      date: new Date(post.published_at || post.created_at).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }))
    
    return json(formattedPosts)
  } catch (error) {
    console.error('API Error:', error)
    return json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
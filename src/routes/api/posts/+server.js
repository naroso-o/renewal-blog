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

export async function POST({ request }) {
  try {
    const { title, content } = await request.json()
    
    // 입력 검증
    if (!title || !content) {
      return json({ error: '제목과 내용은 필수입니다.' }, { status: 400 })
    }
    
    if (title.trim().length < 1) {
      return json({ error: '제목을 입력해주세요.' }, { status: 400 })
    }
    
    if (content.trim().length < 1) {
      return json({ error: '내용을 입력해주세요.' }, { status: 400 })
    }

    // 포스트 저장 (postService 사용)
    const newPost = await postService.createPost({
      title: title.trim(),
      content: content.trim(),
      published_at: new Date().toISOString()
    })
    
    return json({
      success: true,
      post: newPost,
      message: '포스트가 성공적으로 저장되었습니다.'
    })
    
  } catch (error) {
    console.error('POST API Error:', error)
    return json({ 
      error: '포스트 저장 중 오류가 발생했습니다.',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
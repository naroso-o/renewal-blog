// src/routes/api/posts/+server.js
import { json } from '@sveltejs/kit'
import { postService } from '$lib/supabase.js'
import { postErrorMessages, postErrors } from '$lib/consts/errors.js'

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
  } catch (err) {
    console.error('API Error:', err);
    
    const errorMessage = err instanceof Error ? err.message : String(err);
    
    // 데이터베이스 테이블이 없는 경우
    if (errorMessage.includes('relation') || errorMessage.includes('does not exist')) {
      return json({ 
        error: postErrorMessages[postErrors.DB_NOT_INITIALIZED],
        message: postErrorMessages[postErrors.DB_NOT_INITIALIZED],
        code: postErrors.DB_NOT_INITIALIZED
      }, { status: 503 });
    }
    
    // 기타 서버 에러
    return json({ 
      error: postErrorMessages[postErrors.POSTS_FETCH_ERROR],
      message: postErrorMessages[postErrors.POSTS_FETCH_ERROR],
      code: postErrors.POSTS_FETCH_ERROR,
      details: errorMessage
    }, { status: 500 });
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
    
  } catch (err) {
    console.error('POST API Error:', err);
    
    const errorMessage = err instanceof Error ? err.message : String(err);
    
    // 권한 관련 에러
    if (errorMessage.includes('permission') || errorMessage.includes('unauthorized')) {
      return json({ 
        error: postErrorMessages[postErrors.PERMISSION_DENIED],
        message: postErrorMessages[postErrors.PERMISSION_DENIED],
        code: postErrors.PERMISSION_DENIED
      }, { status: 403 });
    }
    
    // 데이터베이스 연결 에러
    if (errorMessage.includes('connection') || errorMessage.includes('connect')) {
      return json({ 
        error: postErrorMessages[postErrors.DB_CONNECTION_ERROR],
        message: postErrorMessages[postErrors.DB_CONNECTION_ERROR],
        code: postErrors.DB_CONNECTION_ERROR
      }, { status: 503 });
    }
    
    // 기타 서버 에러
    return json({ 
      error: postErrorMessages[postErrors.POST_CREATE_ERROR],
      message: postErrorMessages[postErrors.POST_CREATE_ERROR],
      code: postErrors.POST_CREATE_ERROR,
      details: errorMessage
    }, { status: 500 });
  }
}
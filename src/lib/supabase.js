// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// 포스트 관련 함수들
export const postService = {
  // 발행된 포스트 목록 가져오기 (최신순)
  async getPosts(limit = 10, offset = 0) {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, tags, created_at, published_at, view_count, featured')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1)
    
    if (error) throw error
    return data
  },

  // 특정 포스트 상세 정보 가져오기
  async getPostBySlug(slug) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    
    if (error) throw error
    
    // 조회수 증가
    await supabase
      .from('posts')
      .update({ view_count: data.view_count + 1 })
      .eq('id', data.id)
    
    return { ...data, view_count: data.view_count + 1 }
  },

  // 태그별 포스트 가져오기
  async getPostsByTag(tag, limit = 10) {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, tags, created_at, published_at')
      .contains('tags', [tag])
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  },

  // 추천 포스트 가져오기
  async getFeaturedPosts(limit = 3) {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, tags, created_at, published_at')
      .eq('status', 'published')
      .eq('featured', true)
      .order('published_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  },

  // 검색
  async searchPosts(query, limit = 10) {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, tags, created_at, published_at')
      .or(`title.ilike.%${query}%, content.ilike.%${query}%`)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  },

  // 모든 태그 가져오기
  async getAllTags() {
    const { data, error } = await supabase
      .from('posts')
      .select('tags')
      .eq('status', 'published')
    
    if (error) throw error
    
    // 모든 태그를 평면화하고 중복 제거
    const allTags = data.flatMap(post => post.tags || [])
    return [...new Set(allTags)].sort()
  }
}
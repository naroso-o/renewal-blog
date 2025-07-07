// src/routes/blog/+page.js
export async function load() {
    // 실제로는 데이터베이스나 API에서 가져옴
    const posts = [
      {
        id: 1,
        title: "SvelteKit으로 블로그 만들기",
        excerpt: "SvelteKit을 사용해서 현대적인 블로그를 만드는 방법을 알아보세요.",
        date: "2025-01-15",
        slug: "sveltekit-blog-tutorial",
        category: "Tutorial"
      },
      {
        id: 2,
        title: "JavaScript 최신 기능들",
        excerpt: "ES2024의 새로운 기능들과 실용적인 사용법을 소개합니다.",
        date: "2025-01-10",
        slug: "javascript-new-features",
        category: "JavaScript"
      },
      {
        id: 3,
        title: "웹 성능 최적화 팁",
        excerpt: "웹사이트 성능을 향상시키는 실용적인 팁들을 정리했습니다.",
        date: "2025-01-05",
        slug: "web-performance-tips",
        category: "Performance"
      }
    ]
  
    return {
      posts
    }
  }
  
  // src/routes/blog/[slug]/+page.js
  
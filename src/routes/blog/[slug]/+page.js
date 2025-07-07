export async function load({ params }) {
    const { slug } = params
    
    // 실제로는 데이터베이스에서 slug로 포스트 조회
    const post = {
      title: "SvelteKit으로 블로그 만들기",
      content: `
  # SvelteKit으로 블로그 만들기
  
  SvelteKit은 Svelte를 기반으로 한 풀스택 웹 프레임워크입니다.
  
  ## 특징
  
  - **빠른 성능**: 컴파일 타임 최적화
  - **간단한 라우팅**: 파일 기반 라우팅 시스템
  - **SSR 지원**: 서버 사이드 렌더링
  - **정적 사이트 생성**: JAMstack 아키텍처 지원
  
  ## 시작하기
  
  \`\`\`bash
  npm create svelte@latest my-blog
  cd my-blog
  npm install
  npm run dev
  \`\`\`
  
  이제 여러분도 SvelteKit으로 멋진 블로그를 만들어보세요!
      `,
      date: "2025-01-15",
      category: "Tutorial",
      slug
    }
    
    return {
      post
    }
  }
-- pieces 테이블에 테스트 데이터 추가
INSERT INTO pieces (title, slug, excerpt, content, tags, status, featured, view_count, published_at) VALUES
(
  '첫 번째 일상 이야기',
  'first-daily-story',
  '오늘은 새로운 프로젝트를 시작했습니다. 많은 것을 배우고 있어요.',
  '# 첫 번째 일상 이야기

오늘은 새로운 프로젝트를 시작했습니다. 

## 새로운 시작

SvelteKit을 사용해서 블로그를 만들고 있는데, 정말 재미있는 경험이에요.

### 오늘 배운 것들
- Supabase 데이터베이스 설정
- TypeScript 타입 정의
- Svelte 컴포넌트 구조

앞으로 더 많은 것을 배우고 싶어요!',
  ARRAY['일상', '개발', '시작'],
  'published',
  false,
  0,
  NOW()
),
(
  '커피와 함께하는 코딩',
  'coding-with-coffee',
  '좋은 커피와 함께하는 코딩 시간은 언제나 즐거워요.',
  '# 커피와 함께하는 코딩

## 오늘의 커피

오늘은 에티오피아 원두로 내린 커피를 마시며 코딩했습니다.

### 코딩하며 든 생각들
- 좋은 환경이 생산성을 높인다
- 작은 휴식이 큰 도움이 된다
- 꾸준함이 가장 중요하다

커피 한 잔의 여유가 주는 힘을 느끼는 하루였습니다.',
  ARRAY['일상', '커피', '코딩'],
  'published',
  true,
  5,
  NOW() - INTERVAL '1 day'
),
(
  '주말의 산책',
  'weekend-walk',
  '주말 오후, 공원을 산책하며 느낀 소소한 일상의 행복.',
  '# 주말의 산책

## 공원에서의 시간

주말 오후, 근처 공원을 산책했습니다.

### 산책하며 본 것들
- 꽃이 피어나는 나무들
- 뛰어노는 아이들
- 벤치에 앉아 책을 읽는 사람들

일상 속 작은 행복을 느끼는 시간이었습니다.',
  ARRAY['일상', '산책', '여유'],
  'published',
  false,
  2,
  NOW() - INTERVAL '2 days'
); 
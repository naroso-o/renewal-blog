# My Blog

SvelteKit과 Supabase를 사용한 블로그 애플리케이션입니다.

## 설정 방법

### 1. Supabase 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트를 생성합니다.
2. 프로젝트 설정에서 URL과 API 키를 복사합니다.
3. 프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가합니다:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 개발

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build
```

## 기능

- **마크다운 에디터**: 실시간 미리보기와 함께
- **관리자 인증**: Supabase 인증 기반
- **권한 관리**: 관리자/슈퍼 관리자 역할 구분
- **보안**: RLS 정책으로 데이터 보호
- **반응형 디자인**: 모바일/데스크톱 모두 지원

## 관리자 권한

- 블로그 포스트 작성/수정/삭제

## 보안

- Row Level Security (RLS) 활성화
- 인증된 관리자만 포스트 작성 가능
- 슈퍼 관리자만 관리자 계정 관리 가능

## 관리자 설정 순서

1. **회원가입**: `/admin`에서 계정 생성
2. **이메일 확인**: Supabase에서 이메일 확인
3. **블로그 포스트 작성**: 관리자 권한으로 접근 가능

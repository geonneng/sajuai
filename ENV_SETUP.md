# 환경변수 설정 가이드

## Gemini API Key 설정

1. Google AI Studio에서 API 키를 발급받으세요:
   - https://makersuite.google.com/app/apikey 방문
   - Google 계정으로 로그인
   - "Create API Key" 클릭

2. 프로젝트 루트에 `.env.local` 파일을 생성하세요:

```bash
# .env.local
GEMINI_API_KEY=your_api_key_here
```

3. `.env.local` 파일에 발급받은 API 키를 입력하세요.

**중요**: `.env.local` 파일은 Git에 커밋되지 않습니다. 보안을 위해 절대 공개 저장소에 업로드하지 마세요.


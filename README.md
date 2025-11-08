# 🔮 Gemini Saju - AI 사주 분석 웹앱

Google의 Gemini API를 활용하여 사용자의 사주 정보를 기반으로 개인화된 운세를 제공하고, AI와 자유롭게 사주 관련 Q&A를 나눌 수 있는 모던 웹 애플리케이션입니다.

## ✨ 주요 기능

### 1. 사용자 정보 입력 (Page 1)
- 생년월일(8자리), 출생시간, 성별 입력
- 실시간 입력값 유효성 검사
- 로딩 상태 표시

### 2. AI 운세 분석 결과 (Page 2)
- **오늘의 운세** ☀️
- **재물운** 💰
- **애정운** 💖
- 실시간 Gemini API 응답 (Mock Data 없음)

### 3. AI 사주 Q&A 챗봇 (Page 3)
- 사용자의 사주 정보를 컨텍스트로 유지
- 자유로운 질문과 답변
- 대화 기록 유지

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Animation**: Framer Motion

### Backend
- **API**: Next.js API Routes
- **AI**: Google Gemini API (@google/generative-ai)

## 🎨 디자인

- **테마**: 다크 모드 전용
- **배경**: 블랙 (Black)
- **액센트 컬러**: 민트 (Emerald/Cyan)
- **레이아웃**: 스크롤 금지 (100vh), 페이지 전환 방식
- **애니메이션**: Framer Motion을 활용한 부드러운 페이지 전환

## 📦 설치 및 실행

### 1. 의존성 설치

\`\`\`bash
npm install
\`\`\`

### 2. 환경변수 설정

프로젝트 루트에 \`.env.local\` 파일을 생성하고 Gemini API 키를 설정하세요:

\`\`\`bash
GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`

**API 키 발급 방법:**
1. https://makersuite.google.com/app/apikey 방문
2. Google 계정으로 로그인
3. "Create API Key" 클릭
4. 생성된 키를 복사하여 \`.env.local\`에 붙여넣기

자세한 내용은 [ENV_SETUP.md](./ENV_SETUP.md)를 참고하세요.

### 3. 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

브라우저에서 http://localhost:3000 을 열어 확인하세요.

### 4. 프로덕션 빌드

\`\`\`bash
npm run build
npm start
\`\`\`

## 📁 프로젝트 구조

\`\`\`
sajuai/
├── app/
│   ├── api/
│   │   ├── fortune/
│   │   │   └── route.ts        # 운세 분석 API
│   │   └── chat/
│   │       └── route.ts        # 챗봇 API
│   ├── globals.css             # 글로벌 스타일
│   ├── layout.tsx              # 루트 레이아웃
│   └── page.tsx                # 메인 페이지 (페이지 전환 관리)
├── components/
│   ├── ui/                     # shadcn/ui 컴포넌트
│   ├── Page1Input.tsx          # 사용자 정보 입력
│   ├── Page2Fortune.tsx        # 운세 결과
│   └── Page3Chat.tsx           # AI 챗봇
├── lib/
│   ├── store.ts                # Zustand 상태 관리
│   └── utils.ts                # 유틸리티 함수
└── ...
\`\`\`

## 🔑 주요 특징

### 1. 100% 실시간 AI 응답
- Mock Data 없이 모든 콘텐츠는 Gemini API가 실시간으로 생성
- 사용자별 맞춤 분석

### 2. 안전한 API 키 관리
- 클라이언트에 API 키 노출 없음
- Next.js API Routes를 통한 서버 사이드 호출

### 3. 매끄러운 UX
- 로딩 상태 인디케이터
- 페이지 전환 애니메이션
- 반응형 디자인 (모바일/데스크톱)

### 4. 입력 유효성 검사
- 생년월일 형식 및 유효성 자동 검증
- 실시간 에러 메시지 표시

## 🚀 사용 방법

1. **정보 입력**: 생년월일(YYYYMMDD), 출생시간(00-23시), 성별 선택
2. **운세 확인**: AI가 분석한 오늘의 운세, 재물운, 애정운 확인
3. **AI 상담**: 추가 질문을 통해 더 깊은 사주 상담 진행
4. **처음으로**: 언제든지 새로운 정보로 다시 시작 가능

## 📋 범위 외 기능

다음 기능들은 현재 버전에 포함되지 않습니다:
- 회원가입/로그인
- 결제 및 유료 서비스
- 만세력, 오행 차트 등 복잡한 데이터 시각화
- 타로, 별자리 등 사주 외 다른 운세

## 🤝 기여

이 프로젝트는 PRD(Product Requirements Document)를 기반으로 구현되었습니다.

## 📄 라이선스

MIT License

## 👨‍💻 개발자

AI 기반 사주 분석 서비스 - Gemini Saju

---

**Note**: 이 애플리케이션은 엔터테인먼트 목적으로 제작되었으며, 실제 사주 분석을 대체하지 않습니다.


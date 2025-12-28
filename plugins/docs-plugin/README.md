# `/docs` - 프로젝트 문서 자동화

API 명세, README, CHANGELOG를 자동으로 생성하거나 최신 상태로 유지하는 문서 자동화 플러그인입니다.

## 📋 주요 기능

### API 명세 생성/갱신
- OpenAPI/Swagger 스펙 자동 생성
- 엔드포인트 자동 감지 (Next.js, Express, FastAPI)
- 요청/응답 스키마 추출
- 예제 코드 포함

### README.md 작성/갱신
- 프로젝트 정보 자동 추출
- 기술 스택 감지
- 설치 및 사용 가이드 생성
- Badge 자동 생성

### CHANGELOG.md 작성/갱신
- Git 커밋 히스토리 분석
- Conventional Commits 기반 자동 분류
- 버전별 변경 사항 정리
- 시맨틱 버저닝 준수

## 🚀 사용 방법

### API 명세 생성
```bash
/docs --type api
```

**출력:** `docs/API.md` 또는 `openapi.yaml`

### README 작성/업데이트
```bash
/docs --type readme
```

**출력:** `README.md` 생성 또는 업데이트

### CHANGELOG 생성/업데이트
```bash
/docs --type changelog
```

**출력:** `CHANGELOG.md` 생성 또는 업데이트

### 모든 문서 생성
```bash
/docs --all
```

**출력:** API, README, CHANGELOG 모두 생성/업데이트

### 기존 문서 업데이트만
```bash
/docs --update
```

**출력:** 기존 문서 보존하면서 변경 사항만 추가

## 📖 사용 예시

### 예시 1: API 명세 생성

**입력:**
```
/docs --type api
```

**출력:**

```markdown
## 📋 생성된 API 명세

파일: `docs/API.md`

### 감지된 엔드포인트 (12개)

**Users**
- GET /api/users - 사용자 목록 조회
- POST /api/users - 사용자 생성
- GET /api/users/:id - 사용자 상세 조회
- PATCH /api/users/:id - 사용자 수정
- DELETE /api/users/:id - 사용자 삭제

**Posts**
- GET /api/posts - 게시물 목록 조회
- POST /api/posts - 게시물 작성
...
```

생성된 `docs/API.md`:

```markdown
# API Documentation

## Base URL

\`\`\`
http://localhost:3000/api
\`\`\`

## Endpoints

### Users

#### GET /api/users

사용자 목록을 조회합니다.

**Response**

\`\`\`json
{
  "users": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
\`\`\`

#### POST /api/users

새로운 사용자를 생성합니다.

**Request Body**

\`\`\`json
{
  "name": "Jane Smith",
  "email": "jane@example.com"
}
\`\`\`

**Response**

\`\`\`json
{
  "id": "2",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "createdAt": "2024-01-15T00:00:00Z"
}
\`\`\`
```

### 예시 2: README 작성

**입력:**
```
/docs --type readme
```

**출력:**

```markdown
## ✅ README.md 생성 완료

### 프로젝트 분석 결과
- **프레임워크**: Next.js 14.0.4
- **언어**: TypeScript
- **주요 라이브러리**: React, Tailwind CSS, Prisma
- **스크립트**: dev, build, start, test

### 생성된 섹션
- 🚀 주요 기능
- 🛠️ 기술 스택
- 📋 요구사항
- 🔧 설치 방법
- 📖 사용 방법
- 📂 프로젝트 구조
- 🔑 환경 변수
- 📚 API 문서
- 🧪 테스트
- 🚀 배포
- 🤝 기여하기
- 📄 라이선스
```

### 예시 3: CHANGELOG 생성

**입력:**
```
/docs --type changelog
```

**출력:**

```markdown
## 📝 CHANGELOG.md 생성 완료

### 분석 결과
- 총 커밋: 156개
- 최신 태그: v1.4.0
- Unreleased 커밋: 23개

### 변경 사항 요약

**v1.4.0 (2024-01-15)**
- Added: 새로운 인증 시스템 (8건)
- Fixed: 로그인 버그 수정 (5건)
- Changed: API 응답 형식 개선 (3건)
- Security: 의존성 보안 업데이트 (2건)

**Unreleased**
- Added: 다크 모드 지원 (3건)
- Fixed: 메모리 누수 수정 (2건)
```

생성된 `CHANGELOG.md`:

```markdown
# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Dark mode support for all pages
- User preference persistence
- Theme toggle component

### Fixed
- Memory leak in data fetching hook
- Incorrect date formatting in posts

## [1.4.0] - 2024-01-15

### Added
- Complete authentication system
- Password reset functionality
- Email verification
- Social login (Google, GitHub)
- Two-factor authentication
- Session management
- Role-based access control
- JWT token refresh

### Changed
- Improved API response format
- Updated error handling
- Enhanced logging system

### Fixed
- Login redirect issue
- Token expiration bug
- CORS configuration
- Database connection timeout
- Memory leak in WebSocket

### Security
- Updated Next.js to 14.0.4
- Fixed XSS vulnerability in comments
```

## 🎯 지원하는 프레임워크

### Next.js
- App Router (Next.js 13+)
- Pages Router (Next.js 12 이하)
- API Routes 자동 감지

### Express.js
- Router 파일 스캔
- Middleware 문서화
- REST API 엔드포인트 추출

### FastAPI
- Decorator 기반 라우트 감지
- Pydantic 모델 스키마 변환
- 자동 OpenAPI 지원

## 📊 Conventional Commits 지원

다음 커밋 타입을 자동으로 분류합니다:

| 커밋 타입 | CHANGELOG 섹션 |
|----------|---------------|
| `feat:` | Added |
| `fix:` | Fixed |
| `docs:` | Documentation |
| `style:` | Changed |
| `refactor:` | Changed |
| `perf:` | Changed |
| `test:` | Testing |
| `chore:` | Maintenance |
| `security:` | Security |

## 🔒 기존 문서 보존

### 자동 수정하지 않는 섹션
- 프로젝트 배경/동기
- 상세한 사용 예제
- 트러블슈팅 가이드
- FAQ
- 기여자 목록 (수동 작성 시)

### 병합 전략
```markdown
<!-- AUTO-GENERATED: DO NOT EDIT -->
[자동 생성 내용]
<!-- END AUTO-GENERATED -->

[사용자 작성 내용은 그대로 유지]
```

## ✅ 문서 검증 체크리스트

생성된 문서는 자동으로 다음 항목을 검증합니다:

### API 명세
- [ ] 모든 엔드포인트 포함
- [ ] 요청/응답 스키마 정의
- [ ] 에러 응답 문서화
- [ ] 인증/권한 명시
- [ ] 예제 요청/응답 포함

### README
- [ ] 프로젝트 설명
- [ ] 설치 방법
- [ ] 사용 방법
- [ ] 프로젝트 구조
- [ ] 환경 변수
- [ ] 라이선스 정보

### CHANGELOG
- [ ] 시맨틱 버저닝 준수
- [ ] 변경 사항 분류
- [ ] 날짜 포함
- [ ] Breaking Changes 명시

## 💡 Best Practices

### ✅ 해야 할 것
- 정기적으로 문서 업데이트 (`/docs --update`)
- Conventional Commits 규칙 준수
- 중요 변경 사항은 CHANGELOG에 수동 추가
- README에 프로젝트 배경 수동 작성
- API 엔드포인트에 주석 추가

### ❌ 하지 말아야 할 것
- AUTO-GENERATED 섹션 수동 수정
- 커밋 메시지에 불명확한 내용 작성
- 버전 태그 없이 배포
- 문서 업데이트 없이 코드 변경

## 🔧 요구사항

- Git 저장소
- Node.js 프로젝트 (package.json)
- 선택사항: Git 태그 (버전 관리)

## 📚 추가 자료

- [OpenAPI Specification](https://swagger.io/specification/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

## 🤝 기여

버그 리포트나 기능 제안은 [GitHub Issues](https://github.com/devlikebear/ai-agent-extensions/issues)에 등록해주세요.

## 📄 라이선스

MIT License

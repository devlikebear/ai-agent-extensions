# `quality-guardian` - 코드 품질 및 보안 종합 검사 Sub-agent

코드 품질, 보안, 테스트를 종합적으로 검사하는 전문 Sub-agent입니다.

## 📋 주요 기능

### 1. 코드 리뷰 및 품질 분석
- **Cyclomatic Complexity**: 순환 복잡도 측정
- **Code Readability**: 변수명, 함수명, 주석 품질
- **Maintainability**: SOLID 원칙, DRY, KISS 준수 여부
- **Best Practices**: 프레임워크별 권장사항

### 2. 보안 취약점 스캔 (OWASP Top 10)
- **SQL Injection**: SQL 쿼리 보안 검증
- **XSS (Cross-Site Scripting)**: 입력/출력 검증
- **CSRF (Cross-Site Request Forgery)**: CSRF 토큰 검증
- **Authentication Issues**: 인증 로직 검증
- **Authorization Issues**: 권한 검증 로직
- **Sensitive Data Exposure**: 민감 정보 노출 검사
- **Security Misconfiguration**: 보안 설정 오류
- **Insecure Dependencies**: 취약한 의존성 검사
- **Insufficient Logging**: 로깅 누락 검사
- **API Security**: API 엔드포인트 보안

### 3. GitLeaks 검사
- **API Keys**: AWS, Google Cloud, Azure 등
- **Passwords**: 하드코딩된 비밀번호
- **Tokens**: OAuth, JWT, Personal Access Token
- **Private Keys**: SSH, PGP, SSL 인증서
- **Database Credentials**: DB 접속 정보

### 4. 단위 테스트 자동 생성
- **Untested Functions**: 테스트되지 않은 함수 탐지
- **Test Generation**: Jest, Vitest, Playwright 테스트 생성
- **Edge Cases**: 경계값, 예외 상황 테스트
- **Mocking Strategy**: 외부 의존성 모킹

### 5. 테스트 품질 검사
- **Assertion Quality**: 의미 있는 검증 여부
- **Test Coverage**: 주요 시나리오 포함 여부
- **Mock Validation**: 적절한 모킹 사용
- **Test Structure**: AAA 패턴 준수 (Arrange-Act-Assert)

### 6. 테스트 커버리지 분석
- **Line Coverage**: 라인 커버리지 (목표: ≥80%)
- **Branch Coverage**: 분기 커버리지 (목표: ≥70%)
- **Function Coverage**: 함수 커버리지 (목표: ≥90%)
- **Uncovered Code**: 미커버된 코드 분석

## 🚀 사용 방법

### 코드 리뷰

```
"Use the quality-guardian agent to review src/api/auth.ts"
```

**출력 예시:**
```markdown
## 📊 코드 품질 분석: src/api/auth.ts

### 복잡도
- Cyclomatic Complexity: 12 (경고: >10)
- 함수 `validateUser`: 복잡도 8

### 가독성
✅ 변수명 명확함
⚠️ 주석 부족 (3개 함수 중 1개만 주석)

### 유지보수성
⚠️ DRY 위반: 중복 로직 3곳 발견
✅ SOLID 원칙 준수
```

### 보안 취약점 스캔

```
"Use the quality-guardian agent to check security vulnerabilities in src/api/"
```

**출력 예시:**
```markdown
## 🛡️ 보안 취약점 분석

### 🚨 Critical (즉시 수정 필요)
- **SQL Injection** (src/api/user.ts:45)
  - 쿼리: `SELECT * FROM users WHERE id = ${req.params.id}`
  - 권장사항: Parameterized Query 사용

### ⚠️ High (24시간 내 수정)
- **XSS** (src/components/UserProfile.tsx:23)
  - 코드: `dangerouslySetInnerHTML={{ __html: userBio }}`
  - 권장사항: DOMPurify 라이브러리 사용
```

### GitLeaks 검사

```
"Use the quality-guardian agent to scan for leaked secrets"
```

**출력 예시:**
```markdown
## 🔐 GitLeaks 검사 결과

### 🚨 발견된 비밀 정보
- **AWS Access Key** (config/aws.ts:12)
  - `AKIAIOSFODNN7EXAMPLE`
  - 권장사항: 환경 변수로 이동, .gitignore 추가

- **JWT Secret** (src/auth/jwt.ts:5)
  - `const SECRET = "my-super-secret-key"`
  - 권장사항: process.env.JWT_SECRET 사용
```

### 단위 테스트 생성

```
"Use the quality-guardian agent to generate tests for src/utils/validation.ts"
```

**출력 예시:**
```markdown
## ✅ 테스트 생성: src/utils/validation.ts

### 테스트되지 않은 함수
- `validateEmail(email: string): boolean`
- `validatePhoneNumber(phone: string): boolean`

### 생성된 테스트
```javascript
// src/utils/validation.test.ts
describe('validateEmail', () => {
  it('should validate correct email format', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  it('should reject invalid email format', () => {
    expect(validateEmail('invalid-email')).toBe(false);
  });

  it('should handle edge cases', () => {
    expect(validateEmail('')).toBe(false);
    expect(validateEmail('a@b.c')).toBe(true);
  });
});
```
\`\`\`
```

### 테스트 커버리지 분석

```
"Use the quality-guardian agent to analyze test coverage"
```

**출력 예시:**
```markdown
## 📊 테스트 커버리지 분석

### 전체 커버리지
- Line Coverage: 72% (목표: ≥80%) ⚠️
- Branch Coverage: 65% (목표: ≥70%) ⚠️
- Function Coverage: 88% (목표: ≥90%) ⚠️

### 미커버된 코드
- `src/api/payment.ts`: 45% (critical)
- `src/utils/crypto.ts`: 60% (high priority)

### 권장사항
1. `src/api/payment.ts`에 대한 테스트 추가 (우선순위: 높음)
2. Edge case 테스트 보강
```

### 종합 검사

```
"Use the quality-guardian agent to perform comprehensive quality check on src/"
```

**출력 예시:**
```markdown
## 🎯 종합 품질 검사 보고서

### 1. 코드 품질
- 평균 복잡도: 7.2 (양호)
- 가독성: 82/100 (양호)
- 유지보수성: 75/100 (보통)

### 2. 보안
- Critical: 2건 (즉시 수정)
- High: 5건 (24시간 내)
- Medium: 8건 (7일 내)

### 3. 비밀 정보 노출
- API Keys: 1건
- Passwords: 0건
- Tokens: 2건

### 4. 테스트
- 테스트되지 않은 함수: 12개
- 테스트 품질: 85/100 (양호)
- 커버리지: 72% (목표 미달)

### 우선순위 작업
1. 🚨 SQL Injection 수정 (src/api/user.ts:45)
2. 🔐 AWS Key 환경변수 이동 (config/aws.ts:12)
3. ✅ payment.ts 테스트 추가
```

## 📖 검사 영역 상세

### OWASP Top 10 커버리지

| 취약점 | 검사 내용 | 심각도 |
|--------|----------|--------|
| SQL Injection | 파라미터화되지 않은 쿼리 | Critical |
| XSS | 입력 검증, 출력 이스케이프 | High |
| CSRF | CSRF 토큰 검증 | High |
| Broken Authentication | 인증 로직, 세션 관리 | Critical |
| Sensitive Data Exposure | 암호화, HTTPS | High |
| Security Misconfiguration | CORS, Headers | Medium |
| XSS | DOM 기반 XSS | High |
| Insecure Deserialization | 안전하지 않은 역직렬화 | Critical |
| Known Vulnerabilities | 취약한 의존성 | High |
| Insufficient Logging | 로깅 누락 | Medium |

### GitLeaks 탐지 패턴

- **AWS**: Access Key, Secret Key, Session Token
- **Google Cloud**: API Key, Service Account
- **Azure**: Subscription Key, Storage Account Key
- **GitHub**: Personal Access Token, OAuth Token
- **Database**: MySQL, PostgreSQL, MongoDB 접속 정보
- **API Keys**: Stripe, SendGrid, Twilio
- **Certificates**: Private Keys, SSL Certificates

## ⚙️ 요구사항

### 필수 도구
- **Node.js**: v16+ (테스트 실행)
- **npm/yarn**: 패키지 관리
- **Git**: GitLeaks 검사

### 테스트 프레임워크 지원
- **Jest**: React, Node.js
- **Vitest**: Vite 프로젝트
- **Playwright**: E2E 테스트

### 보안 도구 (선택)
- **gitleaks**: 비밀 정보 스캔 (`brew install gitleaks`)
- **npm audit**: 의존성 취약점 검사
- **eslint-plugin-security**: 정적 분석

## 💡 Best Practices

### ✅ 해야 할 것
- 정기적인 보안 스캔 (주 1회)
- 테스트 커버리지 목표 준수 (≥80%)
- Critical 취약점 즉시 수정
- 비밀 정보 환경 변수 관리
- 의존성 정기 업데이트

### ❌ 하지 말아야 할 것
- 비밀 정보 하드코딩
- 테스트 없는 배포
- 취약점 방치
- 의존성 업데이트 지연
- 보안 경고 무시

## 🔧 설정 예시

### .gitignore
```
# 민감 정보
.env
.env.local
*.key
*.pem
config/secrets.json
```

### package.json
```json
{
  "scripts": {
    "test": "jest --coverage",
    "security": "npm audit && gitleaks detect",
    "quality": "eslint . && npm run test"
  }
}
```

## 📚 추가 자료

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitLeaks Documentation](https://github.com/gitleaks/gitleaks)
- [Jest Testing Best Practices](https://jestjs.io/docs/getting-started)
- [Next.js Security](https://nextjs.org/docs/security)

## 🤝 기여

버그 리포트나 기능 제안은 [GitHub Issues](https://github.com/devlikebear/ai-agent-extensions/issues)에 등록해주세요.

## 📄 라이선스

MIT License

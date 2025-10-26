# Manual Generator Plugin

웹서비스를 자동으로 탐색하고 사용자 가이드(매뉴얼) 문서를 마크다운 형식으로 생성하는 Claude Code 플러그인입니다.

## 개요

Manual Generator는 Playwright MCP와 Sequential Thinking MCP를 활용하여 웹사이트를 지능적으로 분석하고, 사용자가 읽기 쉬운 매뉴얼을 자동으로 생성합니다.

### 주요 기능

- ✨ **자동 웹사이트 탐색**: Playwright MCP를 사용하여 웹사이트 자동 탐색
- 🧠 **지능적 페이지 분석**: Sequential Thinking MCP로 페이지 기능 이해
- 📸 **스크린샷 자동 생성**: 각 페이지의 스크린샷을 자동으로 캡처하고 삽입
- 📝 **마크다운 문서 생성**: 구조화되고 읽기 쉬운 사용자 가이드 생성
- 🔄 **선택적 업데이트**: 기존 매뉴얼의 특정 페이지만 갱신 가능
- 🎯 **탐색 깊이 조절**: 메인 페이지만, 2단계 깊이, 전체 사이트 등 선택 가능

## 설치

이 플러그인은 [Claude Code Marketplace](https://github.com/devlikebear/claude-code-marketplace)의 일부입니다.

### 요구사항

- Claude Code
- Playwright MCP 서버 활성화
- Sequential Thinking MCP 서버 활성화

## 사용 방법

### 기본 사용법

```bash
/manual --url https://example.com
```

위 명령어로 전체 사이트 매뉴얼을 생성합니다.

### 주요 옵션

#### 전체 사이트 매뉴얼 생성

```bash
/manual --url https://example.com --depth 2 --max-pages 20 --output user-guide.md
```

**옵션 설명:**
- `--url`: 탐색할 웹사이트 URL (필수)
- `--depth`: 링크 탐색 깊이 (기본값: 2)
- `--max-pages`: 최대 페이지 수 (기본값: 20)
- `--output`: 출력 파일 경로 (기본값: user-manual.md)

#### 특정 페이지만 업데이트

```bash
/manual --url https://example.com/dashboard --update existing-manual.md
```

기존 매뉴얼 파일에서 해당 페이지 섹션만 업데이트합니다.

#### 깊이 제한 탐색

```bash
/manual --url https://example.com --depth 1 --max-pages 10
```

메인 페이지에서 직접 링크된 페이지만 탐색합니다.

#### 특정 경로 포함/제외

```bash
/manual --url https://example.com \
  --include-pattern "/docs/*,/help/*" \
  --exclude-pattern "/admin/*,/api/*"
```

## 출력 예시

### 생성된 매뉴얼 구조

```markdown
# Example Site 사용자 가이드

> 이 문서는 Example Site의 사용 방법을 안내합니다.

## 목차

- [소개](#소개)
- [메인 페이지](#메인-페이지)
- [대시보드](#대시보드)
- [설정](#설정)

---

## 메인 페이지

### 개요
메인 페이지는 사이트의 주요 기능에 접근할 수 있는 시작 지점입니다.

### 주요 기능
- **빠른 시작**: 새로운 프로젝트 생성
- **최근 활동**: 최근 작업 내역 확인
- **알림**: 중요한 업데이트 확인

### 사용 방법

#### 1. 새 프로젝트 생성
1. "새 프로젝트" 버튼 클릭
2. 프로젝트 이름 입력
3. "만들기" 버튼 클릭

![메인 페이지](screenshots/page-0-main-full.png)

💡 **팁**: 프로젝트 이름은 나중에 변경할 수 있습니다.

---
```

### 실행 결과 메시지

```
✅ 매뉴얼 생성 완료

📄 출력 파일: user-guide.md
📸 스크린샷: 15개 (screenshots/ 디렉토리)
📊 분석된 페이지: 15개
⏱️ 소요 시간: 3분 42초

생성된 섹션:
1. 메인 페이지
2. 로그인
3. 대시보드
4. 사용자 프로필
5. 설정
...
```

## 주요 옵션 상세

### 필수 옵션

| 옵션 | 설명 | 예시 |
|------|------|------|
| `--url` | 탐색할 웹사이트 URL | `--url https://example.com` |

### 선택 옵션

| 옵션 | 기본값 | 설명 | 예시 |
|------|--------|------|------|
| `--depth` | 2 | 링크 탐색 깊이 | `--depth 3` |
| `--max-pages` | 20 | 최대 페이지 수 | `--max-pages 50` |
| `--output` | user-manual.md | 출력 파일 경로 | `--output docs/guide.md` |
| `--update` | - | 기존 매뉴얼 업데이트 | `--update manual.md` |
| `--include-pattern` | - | 포함할 URL 패턴 | `--include-pattern "/docs/*"` |
| `--exclude-pattern` | - | 제외할 URL 패턴 | `--exclude-pattern "/admin/*"` |
| `--screenshot-dir` | screenshots/ | 스크린샷 저장 디렉토리 | `--screenshot-dir images/` |
| `--viewport` | 1920x1080 | 브라우저 뷰포트 크기 | `--viewport 1280x720` |
| `--timeout` | 30 | 페이지 로드 타임아웃(초) | `--timeout 60` |
| `--headless` | true | 헤드리스 모드 실행 | `--headless false` |

## 작동 방식

### 1. 웹사이트 탐색

Playwright MCP를 사용하여 웹사이트를 자동으로 탐색합니다:

1. 메인 페이지 로드
2. 페이지 내 모든 링크 수집
3. 지정된 깊이까지 재귀적 탐색
4. 외부 링크 및 중복 제거

### 2. 페이지 분석

Sequential Thinking MCP를 활용하여 각 페이지를 지능적으로 분석합니다:

1. 페이지 목적 파악
2. 주요 UI 요소 식별
3. 사용자 워크플로우 도출
4. 단계별 가이드 생성
5. 주의사항 및 팁 추가

### 3. 스크린샷 생성

각 페이지의 스크린샷을 자동으로 캡처합니다:

- 전체 페이지 스크린샷
- 주요 섹션별 스크린샷 (필요시)
- 상호작용 결과 캡처

### 4. 마크다운 문서 조합

분석된 정보와 스크린샷을 조합하여 구조화된 마크다운 문서를 생성합니다:

- 목차 자동 생성
- 페이지별 섹션 구성
- 스크린샷 자동 삽입
- 일관된 형식 유지

## 사용 예시

### 예시 1: 기본 매뉴얼 생성

```bash
/manual --url https://docs.example.com
```

**결과:**
- `user-manual.md` 파일 생성
- `screenshots/` 디렉토리에 이미지 저장
- 최대 깊이 2, 최대 20페이지 탐색

### 예시 2: 상세 매뉴얼 생성

```bash
/manual --url https://app.example.com \
  --depth 3 \
  --max-pages 50 \
  --output manuals/complete-guide.md \
  --viewport 1280x720
```

**결과:**
- 더 깊이 탐색 (3단계)
- 더 많은 페이지 (50개)
- 사용자 지정 출력 경로
- 모바일 뷰포트 크기

### 예시 3: 특정 섹션만 업데이트

```bash
/manual --url https://app.example.com/settings --update user-manual.md
```

**결과:**
- 기존 매뉴얼의 "설정" 섹션만 업데이트
- 다른 섹션은 보존
- 변경 사항 자동 반영

### 예시 4: 문서 섹션만 매뉴얼 생성

```bash
/manual --url https://example.com \
  --include-pattern "/docs/*,/help/*,/guide/*" \
  --output docs-manual.md
```

**결과:**
- `/docs/`, `/help/`, `/guide/` 경로만 포함
- 관리자 페이지, API 등은 제외
- 문서 전용 매뉴얼 생성

## 제한사항

### 기술적 제한

- **JavaScript 렌더링**: SPA(Single Page Application)는 완전한 로드 후 분석
- **인증 필요 페이지**: 로그인이 필요한 페이지는 사전 인증 필요
- **동적 콘텐츠**: 사용자 입력에 따라 변하는 콘텐츠는 기본 상태만 캡처
- **외부 리소스**: 외부 도메인은 탐색하지 않음

### 권장 사항

- **페이지 수**: 50개 이하 권장 (성능 고려)
- **탐색 깊이**: 3 이하 권장
- **타임아웃**: 느린 사이트는 타임아웃 증가 필요
- **스크린샷**: 필요한 경우만 fullPage 사용

## 문제 해결

### 페이지 로드 실패

```
❌ 페이지 로드 실패: https://example.com/page

해결 방법:
1. 타임아웃 증가: --timeout 60
2. 네트워크 연결 확인
3. URL 유효성 확인
```

### 스크린샷 캡처 실패

```
⚠️ 스크린샷 캡처 실패: page-5-settings.png

해결 방법:
1. screenshots/ 디렉토리 권한 확인
2. 디스크 공간 확인
3. 계속 진행 (플레이스홀더 이미지 삽입됨)
```

### 링크 수집 실패

```
⚠️ 링크를 찾을 수 없습니다

해결 방법:
1. 메인 페이지만 문서화
2. 수동으로 URL 목록 제공
3. include-pattern 사용
```

## 기여

버그 리포트, 기능 제안, Pull Request를 환영합니다!

- 이슈: https://github.com/devlikebear/claude-code-marketplace/issues
- PR: https://github.com/devlikebear/claude-code-marketplace/pulls

## 라이선스

이 플러그인은 [Claude Code Marketplace](https://github.com/devlikebear/claude-code-marketplace)의 일부이며, 동일한 라이선스를 따릅니다.

## 변경 이력

### v1.0.0 (2024-10-19)
- 최초 릴리즈
- 전체 사이트 탐색 및 매뉴얼 생성
- 특정 페이지 업데이트 기능
- 탐색 깊이 및 페이지 수 제한
- 스크린샷 자동 생성
- Sequential Thinking MCP 통합

## 관련 플러그인

- **[Docs Plugin](../docs-plugin/)**: API 명세, README, CHANGELOG 자동 생성
- **[TDD Workflow Plugin](../tdd-workflow-plugin/)**: TDD 기반 개발 워크플로우
- **[GitHub Flow Plugin](../github-flow-plugin/)**: GitHub Flow 워크플로우 자동화

---

📝 이 플러그인은 Playwright MCP와 Sequential Thinking MCP를 활용하여 지능적인 웹서비스 문서화를 제공합니다.

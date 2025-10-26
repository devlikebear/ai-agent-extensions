# 작업 계획: Add web service manual generator plugin (#1)

## 요구사항 요약
웹서비스를 자동으로 탐색하고 분석하여 사용자 가이드(매뉴얼) 문서를 마크다운 형식으로 생성하는 Claude Code 플러그인 개발

## 버전 정보
- **현재 버전**: 1.2.1
- **타겟 버전**: 1.3.0 (Feature - 마이너 버전 업데이트)

## 영향 범위 분석

### 생성할 파일
- `plugins/manual-generator-plugin/` - 새 플러그인 디렉토리
- `plugins/manual-generator-plugin/README.md` - 플러그인 설명 문서
- `plugins/manual-generator-plugin/commands/manual.md` - 매뉴얼 생성 커맨드
- `plugins/manual-generator-plugin/.claude-plugin` - 플러그인 메타데이터 (선택사항)

### 수정할 파일
- `.claude-plugin/plugin.json` - 버전 업데이트 (1.2.1 → 1.3.0)
- `.claude-plugin/marketplace.json` - 마켓플레이스 정보 업데이트
- `README.md` - 새 플러그인 추가
- `CHANGELOG.md` - v1.3.0 항목 추가

### 영향받는 영역
- 플러그인 카탈로그
- 마켓플레이스 문서
- 전체 프로젝트 버전

## 기술 스택 및 의존성

### MCP 서버 활용
1. **Playwright MCP** (`mcp__playwright__*`)
   - 브라우저 자동화 및 제어
   - 페이지 네비게이션
   - 스크린샷 캡처
   - 페이지 스냅샷 생성
   - DOM 요소 분석

2. **Sequential Thinking MCP** (`mcp__sequential-thinking__*`)
   - 페이지 기능 분석
   - 사용자 친화적 설명 생성
   - 단계별 가이드 구성
   - 논리적 흐름 설계

### 핵심 기능 설계

#### 1. 전체 사이트 탐색 및 매뉴얼 생성
```bash
/manual --url https://example.com --depth 2 --output user-guide.md
```

**프로세스:**
1. URL 입력 받기
2. Playwright로 브라우저 실행
3. 메인 페이지 분석
4. 링크 수집 (depth 제한)
5. 각 페이지별로:
   - Sequential Thinking으로 기능 분석
   - 스크린샷 캡처
   - 설명 생성
6. 마크다운 문서 조합
7. 파일 저장

#### 2. 특정 페이지 업데이트
```bash
/manual --url https://example.com/dashboard --update existing-manual.md
```

**프로세스:**
1. 기존 매뉴얼 파일 읽기
2. 해당 페이지 섹션 찾기
3. 페이지 분석 및 새 내용 생성
4. 변경 사항 비교
5. 업데이트된 내용으로 교체
6. 파일 저장

#### 3. 탐색 깊이 조절
```bash
/manual --url https://example.com --depth 3 --max-pages 50
```

**옵션:**
- `--depth`: 링크 탐색 깊이 (기본값: 2)
- `--max-pages`: 최대 페이지 수 (기본값: 20)
- `--include-pattern`: 포함할 URL 패턴
- `--exclude-pattern`: 제외할 URL 패턴

## 작업 체크리스트

### 1. 준비 작업
- [x] Issue #1 확인
- [x] 기존 플러그인 구조 분석
- [x] 작업 계획 수립
- [ ] Feature 브랜치 생성

### 2. 플러그인 구조 설계
- [ ] 디렉토리 생성: `plugins/manual-generator-plugin/`
- [ ] 하위 디렉토리 생성: `commands/`
- [ ] 플러그인 메타데이터 파일 (선택사항)

### 3. 커맨드 파일 작성
- [ ] `commands/manual.md` 작성
  - [ ] YAML frontmatter (name, description)
  - [ ] 플러그인 목적 및 개요
  - [ ] MCP 서버 사용 가이드
  - [ ] 전체 사이트 탐색 로직
  - [ ] 페이지 분석 및 설명 생성 방법
  - [ ] 스크린샷 캡처 전략
  - [ ] 마크다운 문서 조합 구조
  - [ ] 업데이트 기능 구현
  - [ ] 사용 예시 및 플래그 설명

### 4. README 작성
- [ ] `plugins/manual-generator-plugin/README.md` 작성
  - [ ] 플러그인 소개
  - [ ] 주요 기능
  - [ ] 사용 방법
  - [ ] 옵션 및 플래그
  - [ ] 예시
  - [ ] 제한사항

### 5. 마켓플레이스 문서 갱신
- [ ] `.claude-plugin/plugin.json` 버전 업데이트
  - [ ] `"version": "1.3.0"` 설정
  - [ ] `description` 업데이트 (플러그인 수 7개로 변경)
- [ ] `.claude-plugin/marketplace.json` 업데이트
  - [ ] `manual-generator` 항목 추가
- [ ] `README.md` 업데이트
  - [ ] 플러그인 목록에 추가
  - [ ] 총 플러그인 수 업데이트
- [ ] `CHANGELOG.md` 업데이트
  - [ ] v1.3.0 항목 추가

### 6. 테스트 및 검증
- [ ] 커맨드 구문 검증
- [ ] YAML frontmatter 유효성 확인
- [ ] 마크다운 포맷 확인
- [ ] 예시 실행 가능성 검토

### 7. PR 생성 전 문서 갱신
- [ ] `/docs --update` 실행 (또는 수동 갱신)
- [ ] 문서 변경 커밋
- [ ] 브랜치에 푸시

### 8. PR 생성 및 병합
- [ ] PR 생성
- [ ] 리뷰 요청
- [ ] 피드백 반영
- [ ] main 브랜치 병합
- [ ] 릴리즈 태그 생성 (v1.3.0)
- [ ] 브랜치 정리

## 플러그인 설계 상세

### 커맨드 구조
```markdown
---
name: manual
description: 웹서비스를 탐색하여 사용자 가이드(매뉴얼) 문서를 마크다운으로 자동 생성합니다. Playwright와 Sequential Thinking MCP를 활용합니다.
---

# Manual Generator - 웹서비스 사용자 가이드 자동 생성

당신은 웹서비스 문서화 전문가입니다. ...
```

### 주요 워크플로우

**1. 사이트 탐색 워크플로우**
```
URL 입력
  ↓
Playwright 브라우저 실행
  ↓
메인 페이지 로드
  ↓
페이지 스냅샷 + 스크린샷
  ↓
Sequential Thinking으로 분석
  ↓
링크 수집 (depth 고려)
  ↓
각 링크 반복 처리
  ↓
마크다운 문서 조합
  ↓
파일 저장
```

**2. 페이지 분석 워크플로우**
```
페이지 로드
  ↓
DOM 구조 분석 (Playwright snapshot)
  ↓
주요 요소 식별:
  - 네비게이션
  - 폼
  - 버튼
  - 입력 필드
  - 테이블
  - 리스트
  ↓
Sequential Thinking:
  - 페이지 목적 파악
  - 사용자 액션 시퀀스 도출
  - 단계별 설명 생성
  ↓
스크린샷 캡처
  ↓
마크다운 섹션 생성
```

**3. 마크다운 생성 구조**
```markdown
# [사이트명] 사용자 가이드

## 목차
- [페이지1](#페이지1)
- [페이지2](#페이지2)
...

## 페이지1: [페이지 제목]

### 개요
[페이지 설명]

### 주요 기능
- 기능 1
- 기능 2

### 사용 방법

#### 1. [작업명]
[단계별 설명]

![스크린샷](screenshots/page1-step1.png)

#### 2. [작업명]
...

---

## 페이지2: ...
```

## 예상 소요 시간
- 플러그인 구조 설계: 30분
- 커맨드 파일 작성: 2시간
- README 작성: 1시간
- 마켓플레이스 문서 갱신: 30분
- 테스트 및 검증: 30분
- PR 생성 및 병합: 30분
- **총 예상: 5시간**

## 주의사항
- MCP 서버 사용법을 정확하게 문서화
- Playwright 브라우저 설정 및 정리 명시
- 스크린샷 저장 경로 관리
- 기존 매뉴얼 업데이트 시 충돌 처리 방법
- 너무 많은 페이지 탐색 방지 (max-pages 제한)
- 외부 링크 필터링 (도메인 체크)

## 성공 기준
- [ ] 웹서비스 URL 입력 시 완전한 매뉴얼 생성
- [ ] 스크린샷이 적절한 위치에 삽입
- [ ] 각 페이지에 대한 명확하고 친절한 설명
- [ ] 기존 매뉴얼 업데이트 기능 정상 동작
- [ ] 탐색 깊이 및 페이지 수 제한 동작
- [ ] 생성된 마크다운 파일이 올바른 형식
- [ ] 마켓플레이스 문서 일관성 유지

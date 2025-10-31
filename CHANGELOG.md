# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2024-10-26

### Added

#### plugin-generator Plugin (v1.0.0) ⭐ NEW

**Claude Code 플러그인 자동 생성 도구**

Claude Code 플러그인을 자동으로 생성하는 전문 플러그인입니다. Command, Sub-agent, Skill, Hook 설정, Plugin manifest 등을 템플릿 기반으로 생성합니다.

**주요 기능:**
- ✨ **Command 자동 생성**: Frontmatter와 템플릿 자동 생성
- 🤖 **Sub-agent 자동 생성**: name, description, tools, model 설정 포함
- 🎯 **Skill 자동 생성**: SKILL.md 및 지원 파일 구조 생성
- 🪝 **Hook 설정 생성**: hooks.json 자동 생성 및 업데이트
- 📦 **Plugin manifest 생성**: plugin.json 자동 생성
- 🏪 **Marketplace manifest 생성**: marketplace.json 자동 생성
- 📁 **전체 플러그인 프로젝트**: 완전한 디렉토리 구조 자동 생성
- ✅ **유효성 검증**: 생성된 파일의 형식 및 구조 자동 검증

**생성 가능한 타입:**
1. **Command**: commands/ 디렉토리에 .md 파일 생성 (kebab-case)
2. **Sub-agent**: agents/ 디렉토리에 .md 파일 생성 (name, description, tools, model)
3. **Skill**: skills/{skill-name}/ 디렉토리에 SKILL.md 생성 (lowercase, max 64자)
4. **Hook**: hooks/hooks.json 생성 및 업데이트 (9개 이벤트 타입)
5. **Plugin Manifest**: .claude-plugin/plugin.json 생성 (semantic versioning)
6. **Marketplace Manifest**: .claude-plugin/marketplace.json 생성
7. **전체 플러그인 프로젝트**: 완전한 디렉토리 구조 생성

**사용 예시:**
```bash
# 대화형 모드
/plugin-generator

# 타입 지정 모드
/plugin-generator --type command
/plugin-generator --type agent
/plugin-generator --type skill
/plugin-generator --type hook
/plugin-generator --type manifest
/plugin-generator --type marketplace
/plugin-generator --type plugin

# 빠른 생성 (옵션 지정)
/plugin-generator --type command --name deploy-app --description "Deploy application to production"
/plugin-generator --type agent --name code-reviewer --tools "Read,Grep,Edit" --model sonnet
/plugin-generator --type skill --name pdf-extractor --description "Extract PDF text. Use for PDF processing."
```

**유효성 검증:**
- **이름 규칙**: kebab-case (Command, Agent), lowercase (Skill, max 64자)
- **버전 형식**: Semantic versioning (MAJOR.MINOR.PATCH)
- **Frontmatter 필드**: 필수 필드 검증 (name, description)
- **디렉토리 구조**: 표준 레이아웃 검증 (commands/, agents/, skills/)

**템플릿 구조:**
- Command Template: Frontmatter + 시스템 프롬프트
- Sub-agent Template: Frontmatter (tools, model 포함) + 시스템 프롬프트
- Skill Template: Frontmatter (allowed-tools) + instructions
- Hook Template: 9개 이벤트 타입 구조
- Plugin Manifest Template: 메타데이터 및 설정
- Marketplace Manifest Template: 플러그인 목록 및 카테고리

**문서:**
- 플러그인 README: [plugins/plugin-generator-plugin/README.md](plugins/plugin-generator-plugin/README.md)
- 커맨드 가이드: [plugins/plugin-generator-plugin/commands/plugin-generator.md](plugins/plugin-generator-plugin/commands/plugin-generator.md)

### Changed

- 마켓플레이스 버전: 1.3.0 → 1.4.0
- 플러그인 총 개수: 7개 → 8개
- plugin.json, marketplace.json 업데이트
- README.md 플러그인 목록 및 사용 예시 추가
- 키워드 추가: plugin-generation, automation

---

## [1.3.0] - 2024-10-26

### Added

#### manual-generator Plugin (v1.0.0) ⭐ NEW

**웹서비스 사용자 매뉴얼 자동 생성 플러그인**

웹서비스를 자동으로 탐색하고 분석하여 사용자 가이드(매뉴얼) 문서를 마크다운 형식으로 생성하는 새로운 플러그인입니다.

**주요 기능:**
- ✨ **Playwright MCP 통합**: 웹사이트 자동 탐색 및 브라우저 제어
- 🧠 **Sequential Thinking MCP 활용**: 페이지 기능 지능적 분석
- 📸 **스크린샷 자동 생성**: 각 페이지의 스크린샷 캡처 및 삽입
- 📝 **마크다운 문서 생성**: 구조화되고 읽기 쉬운 사용자 가이드 생성
- 🔄 **선택적 업데이트**: 기존 매뉴얼의 특정 페이지만 갱신 가능
- 🎯 **탐색 깊이 조절**: 메인 페이지만, 2단계 깊이, 전체 사이트 등 선택 가능

**사용 예시:**
```bash
# 전체 사이트 매뉴얼 생성
/manual --url https://example.com --depth 2 --max-pages 20 --output user-guide.md

# 특정 페이지만 업데이트
/manual --url https://example.com/dashboard --update existing-manual.md

# 특정 경로만 포함
/manual --url https://example.com --include-pattern "/docs/*,/help/*"
```

**주요 워크플로우:**
1. URL 입력 및 브라우저 실행
2. 메인 페이지 분석 (Sequential Thinking)
3. 링크 수집 및 필터링 (depth, max-pages)
4. 각 페이지 처리:
   - 페이지 로드 및 스냅샷
   - Sequential Thinking으로 기능 분석
   - 스크린샷 캡처
   - 설명 생성
5. 마크다운 문서 조합 및 저장

**지원 기능:**
- 외부 링크 필터링
- 중복 페이지 제거
- 에러 처리 및 복구
- 페이지 로드 타임아웃 설정
- 뷰포트 크기 조절
- 헤드리스/헤드풀 모드 선택

**문서:**
- 플러그인 README: [plugins/manual-generator-plugin/README.md](plugins/manual-generator-plugin/README.md)
- 커맨드 가이드: [plugins/manual-generator-plugin/commands/manual.md](plugins/manual-generator-plugin/commands/manual.md)

### Changed

- 마켓플레이스 버전: 1.2.1 → 1.3.0
- 플러그인 총 개수: 6개 → 7개
- plugin.json, marketplace.json 업데이트
- README.md 플러그인 목록 및 사용 예시 추가
- 키워드 추가: manual-generation, user-guide, web-scraping

---

## [1.2.1] - 2024-10-19

### Added

#### github-flow Plugin 기능 강화 (v1.0.0 → v1.1.0)

**자동 버전 관리 시스템**
- Feature 이슈: 마이너 버전 자동 업데이트 (1.0.0 → 1.1.0)
- Bug 이슈: 패치 버전 자동 업데이트 (1.0.0 → 1.0.1)
- 확장된 버전 감지 지원:
  - package.json (Node.js)
  - pyproject.toml (Python)
  - Cargo.toml (Rust)
  - build.gradle (Java/Kotlin)
  - ✨ NEW: .claude-plugin/plugin.json (Claude Code Plugin)
  - ✨ NEW: .claude-plugin/marketplace.json (Claude Code Plugin)

**수동 릴리즈 관리**
- `--release` 명령어 추가
- 현재 버전 또는 특정 버전으로 릴리즈 태그 생성
- 커스텀 릴리즈 메시지 지원

**PR 생성 전 자동 문서 갱신**
- `/docs --update` 명령어 통합
- README.md 자동 갱신 (버전, 기능 정보)
- CHANGELOG.md 자동 항목 추가
- API 문서 (docs/API.md) 자동 업데이트
- 수동 갱신 가이드 포함
- 갱신된 문서 자동 커밋 및 푸시

**자동 릴리즈 프로세스**
- PR 병합 시 버전 태그 자동 생성
- 릴리즈 노트 자동 생성
- GitHub Release에 자동 업로드

**문서 개선**
- 4.5단계 "PR 생성 전 문서 갱신" 추가
- 자동/수동 문서 갱신 워크플로우 상세 설명
- 문서 갱신 체크리스트 제공
- 예시 1, 2에 문서 갱신 단계 추가

### Changed

- github-flow 플러그인 버전: 1.0.0 → 1.1.0
- 마켓플레이스 설명: 자동 버전 관리, 문서 갱신 기능 추가 반영
- README.md 플러그인 설명 업데이트

## [1.2.0] - 2024-10-18

### Changed

#### 마켓플레이스 구조 개선 - 플러그인별 독립 디렉토리

**기존 구조:**

```text
plugins/
├── commands/      # 공유 commands 디렉토리
│   ├── tdd-workflow/
│   ├── docs/
│   └── github-flow/
└── agents/        # 공유 agents 디렉토리
    └── quality-guardian/
```

**새 구조:**

```text
plugins/
├── tdd-workflow-plugin/        # 완전 독립
│   ├── .claude-plugin/
│   ├── commands/
│   └── README.md
├── docs-plugin/
├── github-flow-plugin/
├── quality-guardian-plugin/
└── novel-writer-plugin/
```

**주요 변경사항:**

- 모든 플러그인이 완전히 독립된 디렉토리 구조로 변경
- 각 플러그인이 자체 commands/, agents/, skills/, mcp/ 디렉토리 보유
- Skills 및 MCP 서버 확장이 용이한 구조로 개선
- ARCHITECTURE.md 문서 추가 (확장 가능한 플러그인 구조 가이드)

**플러그인별 변경:**

- `tdd-workflow`: `./plugins/commands/tdd-workflow` → `./plugins/tdd-workflow-plugin`
- `docs`: `./plugins/commands/docs` → `./plugins/docs-plugin`
- `github-flow`: `./plugins/commands/github-flow` → `./plugins/github-flow-plugin`
- `quality-guardian`: `./plugins/agents/quality-guardian` → `./plugins/quality-guardian-plugin`
- `novel-writer`: `./plugins/novel-writer-plugin` (이미 올바른 구조)

#### Novel Writer Plugin 업데이트 (v1.0.0 → v1.2.0)

- 13개 명령어 (기존 9개 + 4개 추가: help, start, continue, context)
- 6개 장르 Skills 추가 (Fantasy, Romance, Thriller, SciFi, Horror, Mystery)
- 테스트 344개 (기존 213개 + 131개)
- 완전한 통합 워크플로우 제공

#### Skill Generator Plugin 추가 (v1.0.0)

- 코드베이스 분석 기반 Claude Skills 자동 생성
- 프로젝트 구조 학습 및 분석
- 재사용 가능한 Skills 생성
- 1개 Skill 제공

#### 마켓플레이스 메타데이터 개선

- marketplace.json 버전: 1.1.0 → 1.2.0
- plugin.json 버전: 1.1.0 → 1.2.0 (6개 플러그인 명시)
- 모든 플러그인에 description, category, tags 추가
- categories 필드 추가: creative-writing, development, documentation, workflow, quality, skills

## [1.1.0] - 2024-10-18

### Added

#### Novel Writer Plugin (v1.0.0) ⭐ Featured

장르 소설 작성 전문 플러그인 - TDD 방식으로 개발

**9개 전문 명령어:**

- `/plot-outline`: 3막 구조 기반 플롯 개요 생성 (16 tests)
- `/character-profile`: 입체적 캐릭터 프로필 작성 (25 tests)
- `/scene-write`: Show, Don't Tell 장면 작성 (20 tests)
- `/dialogue-enhance`: 자연스러운 대화 개선 (16 tests)
- `/consistency-check`: 일관성 검증 (13 tests)
- `/worldbuilding`: 세계관 구축 (19 tests)
- `/timeline`: 타임라인 추적 (19 tests)
- `/name-generator`: 이름 생성 (21 tests)
- `/word-count`: 진행 상황 관리 (24 tests)

**4개 전문 에이전트:**

- `genre-specialist`: 장르 전문가 (판타지, 로맨스, 스릴러, SF, 호러)
- `character-developer`: 캐릭터 개발자 (Want vs Need, 관계 역학)
- `plot-architect`: 플롯 설계자 (Save the Cat, Hero's Journey)
- `editor`: 전문 편집자 (Macro-Meso-Micro 편집)

**품질 지표:**

- 총 213개 테스트 (100% 통과)
- TDD 방식 개발 (Red-Green-Refactor)
- 완전한 문서화 (README, CONTRIBUTING, CHANGELOG)
- 한국어 완전 지원

**개발 단계:**

- Phase 1: 프로젝트 인프라
- Phase 2: 기본 명령어 5개 (90 tests)
- Phase 3: 전문 에이전트 4개 (40 tests)
- Phase 4: 고급 기능 4개 (83 tests)
- Phase 5: 테스팅 & 문서화

### Changed

- 마켓플레이스 버전: 1.0.0 → 1.1.0
- README.md 대폭 업데이트
  - novel-writer 플러그인 소개 추가
  - 5개 플러그인 전체 리스트 정리
  - 사용 예시 확장
  - 배지 추가 (버전, 플러그인 수, 라이선스)
- marketplace.json 업데이트
  - 모든 플러그인에 버전 정보 추가
  - novel-writer 플러그인 등록
  - 카테고리 및 태그 추가
- plugin.json 업데이트
  - 키워드 확장 (novel-writing, creative-writing, fiction)
  - 설명 업데이트 (5개 플러그인 명시)

## [1.0.0] - 2024-10-16

### Added

- 4개의 Claude Code 플러그인 마켓플레이스 초기 릴리즈
  - `/tdd-workflow` (v1.0.0): Kent Beck의 TDD 원칙을 따라 Next.js 개발하는 워크플로우 플러그인
  - `/docs` (v1.0.0): API 명세, README, CHANGELOG 자동화 플러그인
  - `/github-flow` (v1.0.0): GitHub Flow 워크플로우 전체 프로세스 자동화 플러그인
  - `quality-guardian` (v1.0.0): 코드 품질 및 보안 종합 검사 Sub-agent
- CI/CD 워크플로우 구성
  - 플러그인 검증 자동화
  - 마켓플레이스 스키마 검증
- GitHub 템플릿 추가
  - Issue 템플릿 (Bug Report, Feature Request)
  - Pull Request 템플릿
- 개발자 문서
  - `docs/DEVELOPMENT_GUIDE.md`: 플러그인 개발 가이드
  - `docs/CONTRIBUTING.md`: 플러그인 제출 가이드
  - `plan.md`: 프로젝트 개발 계획

### Changed

- 프로젝트 구조를 Claude Code 마켓플레이스 표준에 맞게 재구성
- README.md에 마켓플레이스 설치 및 사용 가이드 추가

## [0.1.0] - 2024-10-16

### Added (Initial Setup)

- 프로젝트 초기 설정
- 기본 디렉토리 구조 생성
- MIT 라이선스 적용

---

## 향후 계획

### [1.2.0] (Planned)

- 추가 플러그인 개발
- 마켓플레이스 UI 개선
- 플러그인 검색 기능

### [2.0.0] (Future)

- 커뮤니티 기여 시스템
- 플러그인 리뷰 시스템
- 다국어 지원 확대

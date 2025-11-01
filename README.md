# Claude Code Marketplace

커뮤니티 기반 Claude Code 플러그인 마켓플레이스 - **9개 플러그인 제공**

[![Version](https://img.shields.io/badge/version-1.5.0-blue)](https://github.com/devlikebear/claude-code-marketplace)
[![Plugins](https://img.shields.io/badge/plugins-9-brightgreen)](https://github.com/devlikebear/claude-code-marketplace)
[![License](https://img.shields.io/badge/license-MIT-orange)](LICENSE)

## 📦 포함된 플러그인

### 1. `/tdd-workflow` - AI를 위한 TDD 워크플로우
Kent Beck의 TDD 원칙을 따라 Next.js 웹 서비스를 체계적으로 개발하는 워크플로우를 제공합니다.

**버전**: 1.0.0
**타입**: Command
**주요 기능:**
- Red-Green-Refactor 사이클 자동화
- Next.js 특화 테스트 전략
- 단계별 체크리스트 생성

### 2. `/docs` - 문서 자동화
API 명세, README, CHANGELOG를 자동으로 생성하거나 최신 상태로 유지합니다.

**버전**: 1.0.0
**타입**: Command
**주요 기능:**
- OpenAPI/Swagger 스펙 생성
- README.md 작성/갱신
- CHANGELOG.md 자동 생성

### 3. `/github-flow` - GitHub Flow 워크플로우 자동화
GitHub Flow 전체 프로세스를 체크리스트 중심으로 자동화하며, 자동 버전 관리와 문서 갱신 기능을 제공합니다.

**버전**: 1.1.0 ✨ (NEW)
**타입**: Command
**주요 기능:**
- 이슈 생성 및 작업 계획 수립
- **자동 버전 관리** (Feature: 마이너, Bug: 패치)
- **Claude Code Plugin 버전 감지** (.claude-plugin/plugin.json, marketplace.json)
- 브랜치 전략 자동화
- PR 생성, 리뷰, 병합 자동화
- **PR 생성 전 자동 문서 갱신** (`/docs --update` 지원)
- **자동 릴리즈 태그 생성** (PR 병합 시)

### 4. `quality-guardian` - 코드 품질 및 보안 종합 검사
코드 품질, 보안, 테스트를 종합적으로 검사하는 전문 Sub-agent입니다.

**버전**: 1.0.0
**타입**: Agent
**주요 기능:**
- 코드 리뷰 및 품질 분석
- 보안 취약점 스캔
- GitLeaks 검사
- 단위 테스트 작성 및 커버리지 분석

### 5. `novel-writer` - 장르 소설 작성 전문 플러그인 ⭐ NEW

장르 소설 작성을 위한 완전한 통합 워크플로우입니다. TDD 방식으로 개발되어 높은 품질을 보장합니다.

**버전**: 1.2.0
**타입**: Full Plugin (13 Commands + 4 Agents + 6 Skills)
**테스트**: 344개 (100% 통과)
**Featured**: ⭐

**13개 전문 명령어:**

- `/plot-outline`: 3막 구조 플롯 생성
- `/character-profile`: 입체적 캐릭터 프로필
- `/scene-write`: Show, Don't Tell 장면 작성
- `/dialogue-enhance`: 자연스러운 대화 개선
- `/consistency-check`: 일관성 검증
- `/worldbuilding`: 세계관 구축
- `/timeline`: 타임라인 추적
- `/name-generator`: 의미있는 이름 생성
- `/word-count`: 진행 상황 추적
- `/help`: 종합 도움말
- `/start`: 통합 워크플로우 시작
- `/continue`: 프로젝트 재개
- `/context`: 콘텐츠 검색 및 참조

**4개 전문 에이전트:**

- `genre-specialist`: 장르 전문가
- `character-developer`: 캐릭터 개발자
- `plot-architect`: 플롯 설계자
- `editor`: 전문 편집자

**6개 장르 Skills:**

- Fantasy Worldbuilding: 판타지 세계관 구축
- Romance Tropes: 로맨스 트로프 및 관계 역학
- Thriller Pacing: 스릴러 페이싱 및 긴장감
- SciFi Technology: SF 과학기술 설정
- Horror Atmosphere: 공포 분위기 조성
- Mystery Plotting: 미스터리 플롯 구성

**상세 문서**: [plugins/novel-writer-plugin/README.md](plugins/novel-writer-plugin/README.md)

### 6. `skill-generator` - Claude Skills 자동 생성 플러그인

코드베이스 분석 기반으로 Claude Skills를 자동으로 생성하는 전문 플러그인입니다.

**버전**: 1.0.0
**타입**: Skill Generator
**주요 기능:**
- 코드 분석 기반 Skills 자동 생성
- 프로젝트 구조 학습
- 재사용 가능한 Skills 생성

### 7. `/manual` - 웹서비스 사용자 매뉴얼 자동 생성 ⭐ NEW

웹서비스를 자동으로 탐색하여 사용자 가이드(매뉴얼) 문서를 마크다운으로 생성하는 플러그인입니다.

**버전**: 1.0.0
**타입**: Command
**주요 기능:**
- **Playwright MCP**: 웹사이트 자동 탐색 및 스크린샷 캡처
- **Sequential Thinking MCP**: 페이지 기능 지능적 분석
- 마크다운 형식의 사용자 가이드 생성
- 기존 매뉴얼 선택적 업데이트
- 탐색 깊이 및 페이지 수 제한

**상세 문서**: [plugins/manual-generator-plugin/README.md](plugins/manual-generator-plugin/README.md)

## 🚀 설치 방법

### 마켓플레이스 추가
```bash
/plugin marketplace add devlikebear/claude-code-marketplace
```

### 플러그인 설치

```bash
# 인터랙티브 방식으로 플러그인 선택
/plugin

# 특정 플러그인 설치
/plugin install tdd-workflow@claude-code-marketplace
/plugin install docs@claude-code-marketplace
/plugin install github-flow@claude-code-marketplace
/plugin install quality-guardian@claude-code-marketplace
/plugin install novel-writer@claude-code-marketplace
/plugin install skill-generator@claude-code-marketplace
/plugin install manual-generator@claude-code-marketplace
/plugin install plugin-generator@claude-code-marketplace
/plugin install claude-agent-app-builder@claude-code-marketplace
```

## 📖 사용 방법

### `/tdd-workflow` 사용 예시

```bash
/tdd-workflow "Add user authentication feature"
/tdd-workflow --feature "Shopping cart" --type component
```

### `/docs` 사용 예시

```bash
/docs --type api
/docs --type readme
/docs --all
```

### `/github-flow` 사용 예시

```bash
/github-flow --issue-create --type feature --title "Add user profile page"
/github-flow --plan --issue 123
/github-flow --branch --issue 123
/github-flow --pr-create --issue 123
```

### `quality-guardian` 사용 예시

```
"Use the quality-guardian agent to review src/api/auth.ts"
"Use the quality-guardian agent to check security vulnerabilities"
"Use the quality-guardian agent to analyze test coverage"
```

### `novel-writer` 사용 예시

**명령어 사용:**

```bash
# 플롯 구조 설계
/plot-outline 판타지 소설, 주인공은 마법을 잃은 마법사

# 캐릭터 개발
/character-profile 여성 주인공, 30대 형사, 정의감 강함

# 세계관 구축
/worldbuilding 판타지 세계, 마법 시스템 기반

# 타임라인 관리
/timeline 7일간의 스릴러 플롯

# 이름 생성
/name-generator 판타지 엘프 궁수 여성

# 진행 상황 추적
/word-count 목표: 100,000 단어, 현재: 45,000 단어
```

**에이전트 사용:**

```
"Use genre-specialist to help design a dark fantasy world"
"Ask character-developer to deepen my protagonist's motivation"
"Have plot-architect structure my novel using Save the Cat"
"Ask editor to review my chapter for grammar and flow"
```

**상세 사용법**: [plugins/novel-writer-plugin/README.md](plugins/novel-writer-plugin/README.md)

### `/manual` 사용 예시

```bash
# 전체 사이트 매뉴얼 생성
/manual --url https://example.com --depth 2 --max-pages 20 --output user-guide.md

# 특정 페이지만 업데이트
/manual --url https://example.com/dashboard --update existing-manual.md

# 빠른 가이드 생성 (depth 1, 최대 10페이지)
/manual --url https://example.com --depth 1 --max-pages 10 --output quick-guide.md

# 특정 경로만 포함
/manual --url https://example.com --include-pattern "/docs/*,/help/*" --output docs-guide.md
```

**상세 사용법**: [plugins/manual-generator-plugin/README.md](plugins/manual-generator-plugin/README.md)

### 8. `/plugin-generator` - Claude Code 플러그인 자동 생성

Claude Code 플러그인을 자동으로 생성하는 도구입니다. Command, Sub-agent, Skill, Hook 설정, Plugin manifest 등을 템플릿 기반으로 생성합니다.

**버전**: 1.0.0
**타입**: Command
**주요 기능:**
- ✨ **Command 자동 생성**: Frontmatter와 템플릿 자동 생성
- 🤖 **Sub-agent 자동 생성**: name, description, tools, model 설정 포함
- 🎯 **Skill 자동 생성**: SKILL.md 및 지원 파일 구조 생성
- 🪝 **Hook 설정 생성**: hooks.json 자동 생성 및 업데이트
- 📦 **Plugin manifest 생성**: plugin.json 자동 생성
- 🏪 **Marketplace manifest 생성**: marketplace.json 자동 생성
- 📁 **전체 플러그인 프로젝트**: 완전한 디렉토리 구조 자동 생성
- ✅ **유효성 검증**: 생성된 파일의 형식 및 구조 자동 검증

**상세 문서**: [plugins/plugin-generator-plugin/README.md](plugins/plugin-generator-plugin/README.md)

### 9. `claude-agent-app-builder` - Claude Agent SDK 개발 도우미 ⭐ NEW

Claude Agent SDK를 사용하여 Python과 TypeScript 기반 Agent 애플리케이션을 빠르고 안전하게 구축하는 전문가 스킬입니다.

**버전**: 1.0.0
**타입**: Skill
**주요 기능:**
- 📚 **SDK 패턴 라이브러리**: TypeScript 및 Python 검증된 패턴 제공
- 🎯 **프로젝트 템플릿**: 즉시 사용 가능한 프로젝트 구조
- 🔧 **커스텀 Tool 생성**: MCP Tool 개발 가이드 및 예시
- 🛡️ **권한 관리**: Permission Modes 및 보안 설정
- 🚀 **프로덕션 배포**: 실전 배포 및 최적화 가이드
- 📖 **마이그레이션 지원**: Claude Code SDK → Claude Agent SDK

**포함 패턴:**
- TypeScript: `query()`, `ClaudeSDKClient`, `tool()`, `createSdkMcpServer()`
- Python: `query()`, `ClaudeSDKClient`, `@tool`, `create_sdk_mcp_server()`
- Permission Modes: default, acceptEdits, plan, bypassPermissions
- MCP 서버 통합 및 Hook 관리

**프로젝트 템플릿:**
- Python: pyproject.toml, agent.py, custom_tool.py
- TypeScript: package.json, tsconfig.json, agent.ts, custom-tool.ts

**상세 문서**: [plugins/claude-agent-app-builder/README.md](plugins/claude-agent-app-builder/README.md)

### `/plugin-generator` 사용 예시

```bash
# 대화형 모드 (권장)
/plugin-generator

# Command 생성
/plugin-generator --type command

# Sub-agent 생성
/plugin-generator --type agent

# Skill 생성
/plugin-generator --type skill

# Hook 설정 생성
/plugin-generator --type hook

# Plugin manifest 생성
/plugin-generator --type manifest

# Marketplace manifest 생성
/plugin-generator --type marketplace

# 전체 플러그인 프로젝트 생성
/plugin-generator --type plugin

# 빠른 생성 (옵션 지정)
/plugin-generator --type command --name deploy-app --description "Deploy application to production"
/plugin-generator --type agent --name code-reviewer --tools "Read,Grep,Edit" --model sonnet
/plugin-generator --type skill --name pdf-extractor --description "Extract PDF text. Use for PDF processing."
```

**상세 사용법**: [plugins/plugin-generator-plugin/README.md](plugins/plugin-generator-plugin/README.md)

### `claude-agent-app-builder` 사용 예시

**Python Agent 프로젝트 생성:**
```
프롬프트: "Claude Agent SDK를 사용하여 Python Agent 프로젝트를 생성해줘"

자동 생성:
- pyproject.toml 설정
- agent.py (기본 구현)
- custom_tool.py (Tool 예시)
```

**TypeScript Agent 프로젝트 생성:**
```
프롬프트: "Claude Agent SDK로 TypeScript Agent를 만들어줘"

자동 생성:
- package.json, tsconfig.json
- agent.ts (기본 구현)
- custom-tool.ts (Zod Tool 예시)
```

**커스텀 Tool 생성:**
```
프롬프트: "날씨 정보를 가져오는 MCP Tool을 만들어줘"

제공 내용:
- Tool 스키마 정의
- Tool 구현 코드
- MCP 서버 설정
- Agent 통합 코드
```

**베스트 프랙티스 조회:**
```
프롬프트: "Claude Agent SDK의 권한 관리 패턴을 알려줘"

제공 내용:
- Permission Mode 설명
- 각 모드의 사용 사례
- 보안 가이드라인
- 커스텀 권한 콜백 예시
```

**상세 사용법**: [plugins/claude-agent-app-builder/README.md](plugins/claude-agent-app-builder/README.md)

## 🛠️ 개발 가이드

플러그인 개발 방법은 [docs/DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md)를 참조하세요.

## 🤝 기여하기

플러그인 제출 방법은 [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)를 참조하세요.

## 📄 라이선스

MIT License

## 📞 문의 및 지원

- GitHub Issues: https://github.com/devlikebear/claude-code-marketplace/issues
- GitHub Discussions: https://github.com/devlikebear/claude-code-marketplace/discussions

# Claude Code Plugins 마켓플레이스 설계 계획

## 1. 프로젝트 개요

### 목적

Claude Code의 확장 기능(Commands, Sub-agents, Hooks, MCP Servers)을 커뮤니티 중심으로 공유하고 설치할 수 있는 마켓플레이스 구축

### 참고 문서

- [Claude Code Plugins](https://docs.claude.com/en/docs/claude-code/plugins)
- [Plugins Reference](https://docs.claude.com/en/docs/claude-code/plugins-reference)
- [Plugin Marketplaces](https://docs.claude.com/en/docs/claude-code/plugin-marketplaces)
- [Settings - Plugin Configuration](https://docs.claude.com/en/docs/claude-code/settings#plugin-configuration)
- [기존 마켓플레이스 예제](https://github.com/ananddtyagi/claude-code-marketplace)

---

## 2. 플러그인 디렉토리 구조

### 개별 플러그인 구조

```shell
my-plugin/
├── .claude-plugin/
│   └── plugin.json          # 필수: 플러그인 매니페스트
├── commands/                # 기본 명령어 위치
├── agents/                  # 기본 에이전트 위치
├── hooks/                   # Hook 설정
├── .mcp.json               # MCP 서버 정의
├── scripts/                # 유틸리티 스크립트
├── LICENSE
└── README.md
```

### 마켓플레이스 구조

```shell
ai-agent-extensions/
├── .claude-plugin/
│   ├── plugin.json          # 확장 기능 메타데이터
│   └── marketplace.json     # 확장 기능 정의
├── plugins/
│   ├── my-command/
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   └── commands/
│   │       └── command.md
│   └── my-agent/
│       ├── .claude-plugin/
│       │   └── plugin.json
│       └── agents/
│           └── agent.md
├── docs/
│   ├── CONTRIBUTING.md
│   └── PLUGIN_DEVELOPMENT.md
└── README.md
```

---

## 3. Plugin Manifest (plugin.json)

### 필수 필드

```json
{
  "name": "plugin-name",
  "version": "1.0.0",
  "description": "플러그인 설명"
}
```

### 전체 스키마

```json
{
  "name": "plugin-name",
  "version": "1.2.0",
  "description": "플러그인 설명",
  "author": {
    "name": "작성자 이름",
    "email": "email@example.com",
    "url": "https://github.com/author"
  },
  "homepage": "https://docs.example.com/plugin",
  "repository": "https://github.com/author/plugin",
  "license": "MIT",
  "keywords": ["keyword1", "keyword2"],
  "commands": ["./custom/commands/special.md"],
  "agents": "./custom/agents/",
  "hooks": "./config/hooks.json",
  "mcpServers": "./mcp-config.json"
}
```

### 필드 설명

**필수:**

- `name`: 플러그인 고유 식별자 (kebab-case)
- `version`: 시맨틱 버전 (예: 1.0.0)
- `description`: 플러그인 목적 설명

**선택:**

- `author`: 작성자 정보 (name, email, url)
- `homepage`: 플러그인 문서 URL
- `repository`: 저장소 URL
- `license`: 라이선스 (예: MIT)
- `keywords`: 검색용 키워드 배열
- `commands`: 커스텀 명령어 경로 (배열 또는 문자열)
- `agents`: 커스텀 에이전트 경로 (디렉토리)
- `hooks`: Hook 설정 파일 경로
- `mcpServers`: MCP 서버 설정 파일 경로

### 환경 변수

- `${CLAUDE_PLUGIN_ROOT}`: 플러그인 디렉토리의 절대 경로

---

## 4. Marketplace 정의 (marketplace.json)

### 기본 구조

```json
{
  "name": "my-marketplace",
  "owner": {
    "name": "Marketplace Owner",
    "url": "https://github.com/owner"
  },
  "plugins": [
    {
      "name": "my-plugin",
      "source": "./plugins/my-plugin"
    }
  ]
}
```

### Plugin Sources

#### 1. 상대 경로

```json
{
  "name": "my-plugin",
  "source": "./plugins/my-plugin"
}
```

#### 2. GitHub 저장소

```json
{
  "name": "github-plugin",
  "source": {
    "source": "github",
    "repo": "owner/plugin-repo"
  }
}
```

#### 3. Git 저장소

```json
{
  "name": "git-plugin",
  "source": {
    "source": "url",
    "url": "https://gitlab.com/team/plugin.git"
  }
}
```

---

## 5. Command 정의 (command.md)

### 기본 구조

```markdown
---
name: example-command
description: 명령어가 언제 실행되어야 하는지 설명
---

# Command System Prompt

명령어의 역할과 동작 방식을 정의하는 시스템 프롬프트
```

### Frontmatter 필드

**필수:**

- `name`: 명령어 이름
- `description`: 명령어 설명

---

## 6. Sub-agent 정의 (agent.md)

### 기본 구조

```markdown
---
name: example-agent
description: Sub-agent가 언제 호출되어야 하는지 설명
tools: Read, Write, Grep
model: sonnet
---

# Agent System Prompt

Sub-agent의 전문 분야와 작업 방식을 정의하는 시스템 프롬프트
```

### Frontmatter 필드

**필수:**

- `name`: Sub-agent 이름
- `description`: Sub-agent 설명

**선택:**

- `tools`: 사용 가능한 도구 (예: Read, Write, Edit)
- `model`: AI 모델 (예: sonnet)

---

## 7. 마켓플레이스 설치 및 관리

### 마켓플레이스 추가

```bash
# GitHub 저장소
/plugin marketplace add owner/repo

# Git 저장소
/plugin marketplace add https://gitlab.com/company/plugins.git

# 로컬 경로 (개발용)
/plugin marketplace add ./my-marketplace
```

### 마켓플레이스 관리

```bash
# 마켓플레이스 목록
/plugin marketplace list

# 마켓플레이스 메타데이터 업데이트
/plugin marketplace update marketplace-name

# 마켓플레이스 제거
/plugin marketplace remove marketplace-name
```

---

## 8. 플러그인 설치 및 관리

### 플러그인 설치

```bash
# 인터랙티브 방식
/plugin

# 특정 플러그인 설치
/plugin install plugin-name@marketplace-name
```

---

## 9. Settings 설정 (.claude/settings.json)

### enabledPlugins

```json
{
  "enabledPlugins": {
    "formatter@company-tools": true,
    "deployer@company-tools": true,
    "analyzer@security-plugins": false
  }
}
```

- 형식: `"plugin-name@marketplace-name": true/false`
- 범위: User settings, Project settings, Local settings

### extraKnownMarketplaces

```json
{
  "extraKnownMarketplaces": {
    "company-tools": {
      "source": "github",
      "repo": "company/claude-plugins"
    }
  }
}
```

**지원하는 소스 타입:**

- `github`: GitHub 저장소
- `git`: Git URL
- `directory`: 로컬 파일시스템 경로 (개발용)

**팀 설정:**

- 팀원에게 마켓플레이스 및 플러그인 설치 프롬프트
- 사용자 명시적 동의 필요

---

## 10. 플러그인 개발 워크플로우

### 1. 로컬 개발 환경 설정

```bash
mkdir my-plugin
cd my-plugin
```

### 2. 플러그인 구조 생성

```bash
mkdir -p .claude-plugin
mkdir -p commands
mkdir -p agents
```

### 3. plugin.json 작성

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "플러그인 설명"
}
```

### 4. Command 또는 Agent 작성

- `commands/my-command.md` 작성
- 또는 `agents/my-agent.md` 작성

### 5. 로컬 테스트

```bash
# 개발 중인 마켓플레이스를 로컬 경로로 추가
/plugin marketplace add file:///path/to/development-marketplace

# 플러그인 설치 및 테스트
/plugin install my-plugin@development-marketplace
```

### 6. 검증

```bash
claude plugin validate path/to/my-plugin
```

### 7. 제출

- Pull Request로 마켓플레이스 저장소에 제출

---

## 11. 구현 단계

### Phase 1: 기본 인프라

- [ ] 디렉토리 구조 생성
- [ ] `.claude-plugin/plugin.json` 작성 (마켓플레이스 메타데이터)
- [ ] `.claude-plugin/marketplace.json` 작성
- [ ] README.md 작성

### Phase 2: 문서 작성

- [ ] CONTRIBUTING.md (제출 가이드)
- [ ] PLUGIN_DEVELOPMENT.md (개발 가이드)

### Phase 3: 예제 플러그인

- [ ] Command 예제 2-3개
- [ ] Sub-agent 예제 2-3개

### Phase 4: CI/CD

- [ ] GitHub Actions 워크플로우 (claude plugin validate)
- [ ] PR 템플릿
- [ ] 이슈 템플릿

---

## 12. 참고 자료

### 공식 문서

- [Claude Code Plugins](https://docs.claude.com/en/docs/claude-code/plugins)
- [Plugins Reference](https://docs.claude.com/en/docs/claude-code/plugins-reference)
- [Plugin Marketplaces](https://docs.claude.com/en/docs/claude-code/plugin-marketplaces)
- [Settings - Plugin Configuration](https://docs.claude.com/en/docs/claude-code/settings#plugin-configuration)

### 기존 마켓플레이스

- [ananddtyagi/claude-code-marketplace](https://github.com/ananddtyagi/claude-code-marketplace)

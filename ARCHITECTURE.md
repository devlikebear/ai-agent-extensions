# AI Agent Extensions Architecture

확장 가능하고 모듈화된 AI Agent 확장 기능 구조

## 설계 원칙

1. **플러그인 독립성**: 각 플러그인은 완전히 독립된 디렉토리 구조
2. **확장 가능성**: Skills, MCP 서버 등 새 기능 추가 용이
3. **일관성**: 모든 플러그인이 동일한 구조 패턴 따름
4. **테스트 가능성**: 플러그인별 독립적 테스트
5. **문서화**: 각 플러그인 자체 문서 보유

## 디렉토리 구조

### 마켓플레이스 루트

```
ai-agent-extensions/
├── .claude-plugin/
│   ├── marketplace.json      # 확장 기능 메타데이터
│   └── plugin.json           # 확장 기능 자체 설정
│
├── plugins/                  # 모든 플러그인 저장소
│   ├── novel-writer/
│   ├── tdd-workflow/
│   ├── docs-automation/
│   └── github-flow/
│
├── shared/                   # 공유 유틸리티 (선택)
│   ├── templates/
│   └── utils/
│
├── docs/                     # 마켓플레이스 문서
│   ├── DEVELOPMENT_GUIDE.md
│   ├── CONTRIBUTING.md
│   └── PLUGIN_TEMPLATE.md
│
├── scripts/                  # 빌드/검증 스크립트
│   ├── validate-plugins.js
│   ├── build-marketplace.js
│   └── test-all.js
│
├── ARCHITECTURE.md          # 이 파일
├── README.md                # 마켓플레이스 소개
└── package.json             # 루트 package.json
```

### 플러그인 구조 (표준)

```
plugins/[plugin-name]/
├── .claude-plugin/
│   └── plugin.json          # 플러그인 메타데이터 (필수)
│
├── commands/                # 슬래시 명령어 (선택)
│   ├── command1.md
│   └── command2.md
│
├── agents/                  # 에이전트 (선택)
│   ├── agent1.md
│   └── agent2.md
│
├── skills/                  # Claude Skills (선택)
│   ├── skill1/
│   │   └── SKILL.md
│   └── skill2/
│       └── SKILL.md
│
├── mcp/                     # MCP 서버 설정 (선택)
│   ├── server1/
│   │   ├── config.json
│   │   └── README.md
│   └── server2/
│
├── __tests__/               # 테스트 (권장)
│   ├── commands/
│   ├── agents/
│   └── integration/
│
├── docs/                    # 플러그인 문서 (권장)
│   ├── USAGE.md
│   └── API.md
│
├── package.json             # npm 패키지 (선택)
├── README.md                # 플러그인 설명 (필수)
├── CHANGELOG.md             # 변경 이력 (권장)
└── LICENSE                  # 라이선스 (권장)
```

## plugin.json 스키마

### 필수 필드

```json
{
  "name": "plugin-name",
  "version": "1.0.0",
  "description": "플러그인 설명",
  "author": {
    "name": "작성자명",
    "email": "email@example.com"
  },
  "license": "MIT"
}
```

### 선택 필드

```json
{
  "homepage": "https://github.com/...",
  "repository": "https://github.com/...",
  "keywords": ["keyword1", "keyword2"],

  "commands": [
    "./commands/command1.md",
    "./commands/command2.md"
  ],

  "agents": [
    "./agents/agent1.md"
  ],

  "skills": [
    "./skills/skill1/SKILL.md"
  ],

  "mcp": {
    "servers": [
      "./mcp/server1/config.json"
    ]
  },

  "dependencies": {
    "claudeCodeVersion": "^1.0.0"
  },

  "configuration": {
    "settings": []
  }
}
```

## marketplace.json 스키마

```json
{
  "name": "ai-agent-extensions",
  "version": "1.2.0",
  "description": "AI Agent Extensions for Claude Code",

  "plugins": [
    {
      "name": "novel-writer",
      "source": "./plugins/novel-writer",
      "version": "1.2.0",
      "description": "장르 소설 작성 전문 플러그인",
      "category": "creative-writing",
      "tags": ["novel", "writing", "fiction"]
    },
    {
      "name": "tdd-workflow",
      "source": "./plugins/tdd-workflow",
      "version": "1.0.0",
      "description": "TDD 워크플로우 자동화",
      "category": "development",
      "tags": ["tdd", "testing", "nextjs"]
    }
  ],

  "categories": [
    "creative-writing",
    "development",
    "documentation",
    "workflow",
    "productivity"
  ]
}
```

## 확장 포인트

### 1. Commands (슬래시 명령어)

**위치**: `commands/[name].md`

**형식**:
```markdown
---
name: command-name
description: 명령어 설명
category: category-name
---

# Command Content
```

### 2. Agents (에이전트)

**위치**: `agents/[name].md`

**형식**:
```markdown
---
name: agent-name
description: 에이전트 설명
specialization: domain
---

# Agent Prompt
```

### 3. Skills (Claude Skills)

**위치**: `skills/[skill-name]/SKILL.md`

**형식**:
```markdown
---
name: Skill Name
description: Skill description
allowed-tools: Read, Write, Edit
---

# Skill Content
```

### 4. MCP Servers (확장)

**위치**: `mcp/[server-name]/config.json`

**형식**:
```json
{
  "name": "server-name",
  "command": "node",
  "args": ["./server.js"],
  "env": {},
  "description": "MCP 서버 설명"
}
```

## 플러그인 개발 워크플로우

### 1. 새 플러그인 생성

```bash
# 템플릿에서 생성
npm run create-plugin [plugin-name]

# 또는 수동 생성
mkdir -p plugins/[plugin-name]/.claude-plugin
cp templates/plugin.json plugins/[plugin-name]/.claude-plugin/
```

### 2. 기능 추가

```bash
# Commands
mkdir -p plugins/[plugin-name]/commands
touch plugins/[plugin-name]/commands/my-command.md

# Agents
mkdir -p plugins/[plugin-name]/agents
touch plugins/[plugin-name]/agents/my-agent.md

# Skills
mkdir -p plugins/[plugin-name]/skills/my-skill
touch plugins/[plugin-name]/skills/my-skill/SKILL.md
```

### 3. 테스트 작성

```bash
mkdir -p plugins/[plugin-name]/__tests__/commands
touch plugins/[plugin-name]/__tests__/commands/my-command.test.js
```

### 4. 마켓플레이스 등록

`marketplace.json`에 플러그인 추가:
```json
{
  "plugins": [
    {
      "name": "my-plugin",
      "source": "./plugins/my-plugin",
      "version": "1.0.0",
      "description": "...",
      "category": "...",
      "tags": []
    }
  ]
}
```

### 5. 검증 및 테스트

```bash
# 플러그인 검증
npm run validate-plugin [plugin-name]

# 전체 마켓플레이스 검증
npm run validate-marketplace

# 테스트
cd plugins/[plugin-name]
npm test
```

## 마이그레이션 가이드

### 기존 구조 → 새 구조

**Before:**
```
plugins/
├── commands/
│   ├── tdd-workflow.md
│   └── docs.md
└── agents/
    └── quality-guardian.md
```

**After:**
```
plugins/
├── tdd-workflow/
│   ├── .claude-plugin/plugin.json
│   ├── commands/tdd-workflow.md
│   └── README.md
└── docs-automation/
    ├── .claude-plugin/plugin.json
    ├── commands/docs.md
    └── README.md
```

## 스크립트

### validate-plugins.js

플러그인 구조 및 메타데이터 검증

### build-marketplace.js

마켓플레이스 빌드 및 배포 준비

### test-all.js

모든 플러그인 테스트 실행

## 베스트 프랙티스

1. **버저닝**: Semantic Versioning 사용
2. **문서화**: README, CHANGELOG 필수
3. **테스트**: 모든 명령어/에이전트 테스트 작성
4. **일관성**: 명명 규칙 준수
5. **모듈화**: 플러그인 간 의존성 최소화
6. **확장성**: 새 기능 추가 시 기존 구조 유지

## 예시: novel-writer 플러그인

```
plugins/novel-writer/
├── .claude-plugin/
│   └── plugin.json (13 commands, 4 agents, 6 skills)
├── commands/ (13 files)
├── agents/ (4 files)
├── skills/ (6 directories)
├── __tests__/ (17 test files, 344 tests)
├── README.md
├── CHANGELOG.md
└── package.json
```

## 향후 확장

1. **MCP Integration**: MCP 서버 자동 설정
2. **Plugin Registry**: npm과 같은 레지스트리
3. **Version Management**: 플러그인 버전 관리
4. **Dependency Resolution**: 플러그인 간 의존성
5. **Hot Reload**: 개발 시 자동 리로드
6. **Plugin Marketplace UI**: 웹 기반 마켓플레이스

---

**Version**: 1.0.0
**Last Updated**: 2024-10-18

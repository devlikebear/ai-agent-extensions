# Plugin Generator Plugin

Claude Code 플러그인을 자동으로 생성하는 도구입니다. Command, Sub-agent, Skill, Hook 설정, Plugin manifest 등을 템플릿 기반으로 생성합니다.

## 개요

Plugin Generator는 Claude Code 공식 가이드라인에 맞는 플러그인 구조와 템플릿을 자동으로 생성합니다. 대화형 인터페이스를 통해 필요한 정보를 입력받고, 유효성 검증을 거쳐 올바른 형식의 파일을 생성합니다.

### 주요 기능

- ✨ **Command 자동 생성**: Frontmatter와 템플릿 자동 생성
- 🤖 **Sub-agent 자동 생성**: name, description, tools, model 설정 포함
- 🎯 **Skill 자동 생성**: SKILL.md 및 지원 파일 구조 생성
- 🪝 **Hook 설정 생성**: hooks.json 자동 생성 및 업데이트
- 📦 **Plugin manifest 생성**: plugin.json 자동 생성
- 🏪 **Marketplace manifest 생성**: marketplace.json 자동 생성
- 📁 **전체 플러그인 프로젝트**: 완전한 디렉토리 구조 자동 생성
- ✅ **유효성 검증**: 생성된 파일의 형식 및 구조 자동 검증

## 설치

이 플러그인은 [Claude Code Marketplace](https://github.com/devlikebear/ai-agent-extensions)의 일부입니다.

### 마켓플레이스 추가 및 설치

```bash
# 마켓플레이스 추가
/plugin marketplace add devlikebear/ai-agent-extensions

# 플러그인 설치
/plugin install plugin-generator@ai-agent-extensions
```

## 사용 방법

### 대화형 모드 (권장)

```bash
/plugin-generator
```

대화형으로 플러그인 타입을 선택하고, 단계별로 필요한 정보를 입력합니다.

### 타입 지정 모드

```bash
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
```

## 사용 예시

### 예시 1: Command 생성

```bash
/plugin-generator --type command

# 대화형 질문에 답변:
# Q: Command 이름 (kebab-case):
# A: deploy-app

# Q: Command 설명:
# A: 애플리케이션을 프로덕션 환경에 배포합니다

# 생성:
# commands/deploy-app.md
```

### 예시 2: Sub-agent 생성

```bash
/plugin-generator --type agent

# 대화형 질문에 답변:
# Q: Agent 이름:
# A: code-reviewer

# Q: Agent 설명:
# A: 코드 품질을 검토하고 개선 사항을 제안합니다

# Q: 사용 가능한 도구 (쉼표로 구분):
# A: Read, Grep, Edit

# Q: 모델 선택 (sonnet/opus/haiku/inherit):
# A: sonnet

# 생성:
# agents/code-reviewer.md
```

### 예시 3: Skill 생성

```bash
/plugin-generator --type skill

# 대화형 질문에 답변:
# Q: Skill 이름 (lowercase, max 64):
# A: pdf-extractor

# Q: Skill 설명 (무엇을 + 언제):
# A: Extract text and tables from PDF files. Use when user needs to process PDF documents.

# Q: 허용된 도구 (선택사항):
# A: Bash, Read, Write

# 생성:
# skills/pdf-extractor/SKILL.md
```

### 예시 4: 전체 플러그인 프로젝트 생성

```bash
/plugin-generator --type plugin

# 대화형 질문에 답변:
# Q: 프로젝트 디렉토리:
# A: ./my-awesome-plugin

# Q: 플러그인 이름:
# A: awesome-plugin

# Q: 플러그인 타입:
# A: Mixed (Command + Agent)

# 생성:
# ./my-awesome-plugin/
#   ├── .claude-plugin/plugin.json
#   ├── commands/example-command.md
#   ├── agents/example-agent.md
#   └── README.md
```

### 예시 5: 빠른 생성 (옵션 지정)

```bash
# Command 빠른 생성
/plugin-generator --type command --name deploy-app --description "Deploy application to production"

# Sub-agent 빠른 생성
/plugin-generator --type agent --name code-reviewer --tools "Read,Grep,Edit" --model sonnet

# Skill 빠른 생성
/plugin-generator --type skill --name pdf-extractor --description "Extract PDF text. Use for PDF processing."
```

## 생성 가능한 타입

### 1. Command
- **위치**: `commands/` 디렉토리
- **파일**: `{command-name}.md`
- **Frontmatter**: name, description
- **용도**: 슬래시 명령어 (/command) 생성

### 2. Sub-agent
- **위치**: `agents/` 디렉토리
- **파일**: `{agent-name}.md`
- **Frontmatter**: name, description, tools, model
- **용도**: 특정 작업에 특화된 에이전트 생성

### 3. Skill
- **위치**: `skills/{skill-name}/` 디렉토리
- **파일**: `SKILL.md`
- **Frontmatter**: name, description, allowed-tools
- **용도**: Claude가 자율적으로 호출하는 기능 생성

### 4. Hook
- **위치**: `hooks/` 디렉토리
- **파일**: `hooks.json`
- **내용**: 이벤트 핸들러 설정
- **용도**: 특정 이벤트에 Shell 명령어 실행

### 5. Plugin Manifest
- **위치**: `.claude-plugin/` 디렉토리
- **파일**: `plugin.json`
- **내용**: 플러그인 메타데이터
- **용도**: 플러그인 식별 및 설정

### 6. Marketplace Manifest
- **위치**: `.claude-plugin/` 디렉토리
- **파일**: `marketplace.json`
- **내용**: 마켓플레이스 및 플러그인 목록
- **용도**: 마켓플레이스 정의

### 7. 전체 플러그인 프로젝트
- **위치**: 사용자 지정
- **구조**: 완전한 플러그인 디렉토리
- **용도**: 새 플러그인 프로젝트 시작

## 주요 옵션

### 공통 옵션

| 옵션 | 설명 | 예시 |
|------|------|------|
| `--type` | 생성할 타입 | `--type command` |
| `--name` | 이름 | `--name my-command` |
| `--description` | 설명 | `--description "Command description"` |
| `--path` | 생성 경로 | `--path ./my-plugin` |

### Command 옵션

| 옵션 | 설명 |
|------|------|
| `--name` | Command 이름 (kebab-case) |
| `--description` | Command 설명 |

### Sub-agent 옵션

| 옵션 | 설명 |
|------|------|
| `--name` | Agent 이름 (kebab-case) |
| `--description` | Agent 설명 |
| `--tools` | 사용 가능한 도구 (쉼표로 구분) |
| `--model` | AI 모델 (sonnet/opus/haiku/inherit) |

### Skill 옵션

| 옵션 | 설명 |
|------|------|
| `--name` | Skill 이름 (lowercase, max 64) |
| `--description` | Skill 설명 (max 1024) |
| `--allowed-tools` | 허용된 도구 |

### Plugin 옵션

| 옵션 | 설명 |
|------|------|
| `--name` | 플러그인 이름 |
| `--version` | 버전 (예: 1.0.0) |
| `--author` | Author 이름 |
| `--license` | License (예: MIT) |

## 생성 후 작업

### 1. 생성된 파일 확인

```bash
# 생성된 파일 목록
ls -la commands/
ls -la agents/
ls -la skills/
```

### 2. 템플릿 수정

생성된 파일을 열어서 내용을 채웁니다:
- 시스템 프롬프트 작성
- Instructions 상세화
- 예시 추가

### 3. 로컬 테스트

```bash
# 로컬 마켓플레이스 추가
/plugin marketplace add file:///path/to/your/plugin

# 플러그인 설치
/plugin install your-plugin@your-marketplace

# 테스트
/your-command              # Command
"Use the your-agent agent" # Sub-agent
# Skill은 자동으로 사용 가능
```

### 4. 검증

```bash
# Claude CLI로 검증
claude plugin validate path/to/your/plugin
```

## 유효성 검증

Plugin Generator는 다음 항목을 자동으로 검증합니다:

### 이름 규칙
- **kebab-case**: Command, Sub-agent (예: `my-command`)
- **lowercase**: Skill (예: `pdf-extractor`)
- **길이 제한**: Skill 이름 최대 64자
- **특수문자**: 소문자, 숫자, 하이픈만 허용

### 버전 형식
- **Semantic versioning**: `MAJOR.MINOR.PATCH`
- 예: `1.0.0`, `2.3.1`

### Frontmatter 필드
- **필수 필드**: name, description
- **선택 필드**: tools, model, allowed-tools
- **YAML 구문 검증**

### 디렉토리 구조
- **표준 레이아웃**: commands/, agents/, skills/
- **.claude-plugin/ 위치**: 플러그인 루트
- **파일 이름**: kebab-case.md

## 템플릿 구조

### Command Template
```markdown
---
name: {{COMMAND_NAME}}
description: {{COMMAND_DESCRIPTION}}
---

# {{COMMAND_TITLE}}

명령어의 시스템 프롬프트
```

### Sub-agent Template
```markdown
---
name: {{AGENT_NAME}}
description: {{AGENT_DESCRIPTION}}
tools: {{AGENT_TOOLS}}
model: {{AGENT_MODEL}}
---

# {{AGENT_TITLE}}

에이전트의 시스템 프롬프트
```

### Skill Template
```markdown
---
name: {{SKILL_NAME}}
description: {{SKILL_DESCRIPTION}}
allowed-tools: {{SKILL_TOOLS}}
---

# {{SKILL_TITLE}}

스킬 instructions
```

### Plugin Manifest Template
```json
{
  "name": "{{PLUGIN_NAME}}",
  "version": "{{PLUGIN_VERSION}}",
  "description": "{{PLUGIN_DESCRIPTION}}",
  "author": {
    "name": "{{AUTHOR_NAME}}"
  }
}
```

## 문제 해결

### 일반적인 오류

**이름 형식 오류**
```
❌ Command 이름은 kebab-case여야 합니다.
✅ 올바른 형식: my-command
```

**버전 형식 오류**
```
❌ 버전은 semantic versioning을 따라야 합니다.
✅ 올바른 형식: 1.0.0
```

**필수 필드 누락**
```
❌ 필수 필드 'description'이 누락되었습니다.
✅ description 필드 추가
```

### 복구 방법

**생성 실패 시:**
1. 오류 메시지 확인
2. 입력 값 수정
3. 재시도

**부분 생성 시:**
1. 생성된 파일 확인
2. 누락된 파일만 다시 생성
3. 또는 전체 삭제 후 재생성

## Best Practices

### Command 작성
- 명확한 단일 기능
- 상세한 시스템 프롬프트
- 사용 예시 포함

### Sub-agent 작성
- 전문화된 단일 책임
- 필요한 도구만 제한
- 명확한 호출 조건

### Skill 작성
- 구체적인 사용 시기 명시
- 자율 호출 가능하도록 설계
- 모듈화된 지원 파일

### Hook 작성
- 가벼운 Shell 명령어
- 빠른 실행 시간
- 멱등성 보장

## 제한사항

- **Output Styles**: deprecated되어 생성 지원하지 않음
- **MCP 서버**: 별도 설정 필요 (`.mcp.json`)
- **복잡한 Hook**: 간단한 Shell 명령어만 권장

## 기여

버그 리포트, 기능 제안, Pull Request를 환영합니다!

- 이슈: https://github.com/devlikebear/ai-agent-extensions/issues
- PR: https://github.com/devlikebear/ai-agent-extensions/pulls

## 라이선스

이 플러그인은 [Claude Code Marketplace](https://github.com/devlikebear/ai-agent-extensions)의 일부이며, 동일한 라이선스를 따릅니다.

## 변경 이력

### v1.0.0 (2024-10-26)
- 최초 릴리즈
- Command, Sub-agent, Skill 생성 기능
- Hook 설정 생성
- Plugin manifest 생성
- Marketplace manifest 생성
- 전체 플러그인 프로젝트 생성
- 유효성 검증 기능

## 관련 플러그인

- **[Manual Generator](../manual-generator-plugin/)**: 웹서비스 사용자 매뉴얼 자동 생성
- **[Skill Generator](../skill-generator-plugin/)**: 코드베이스 분석 기반 Skills 생성
- **[Docs Plugin](../docs-plugin/)**: API 명세, README, CHANGELOG 자동 생성
- **[GitHub Flow Plugin](../github-flow-plugin/)**: GitHub Flow 워크플로우 자동화

---

📝 이 플러그인은 Claude Code 공식 가이드라인을 기반으로 플러그인 생성을 자동화합니다.

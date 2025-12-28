# Claude Agent App Builder

Claude Agent SDK를 사용하여 Python과 TypeScript 기반 Agent 애플리케이션을 빠르고 안전하게 구축하는 전문가 스킬입니다.

## 개요

이 플러그인은 Claude Agent SDK를 활용한 Agent 개발을 지원합니다:

- **프로젝트 템플릿**: Python과 TypeScript 프로젝트 구조 제공
- **SDK 패턴**: 검증된 베스트 프랙티스 및 코드 예시
- **Tool 생성**: 커스텀 MCP Tool 개발 가이드
- **프로덕션 배포**: 실전 배포 및 보안 설정

## 주요 기능

### 1. Skill: agent-sdk-patterns

Claude Agent SDK의 핵심 패턴과 베스트 프랙티스를 제공합니다.

**포함 내용:**
- TypeScript SDK 패턴 (query, ClaudeSDKClient, tools)
- Python SDK 패턴 (query, ClaudeSDKClient, @tool decorator)
- MCP 서버 통합 패턴
- 권한 관리 및 보안 설정
- 컨텍스트 압축 최적화
- 에러 처리 및 복구 전략

### 2. Command: /claude-agent

Agent 애플리케이션 개발 워크플로우를 제공하는 Command입니다.

**사용 가능한 작업:**
- `init` - 프로젝트 초기화 (TypeScript/Python)
- `tool` - 커스텀 Tool 생성
- `agent` - Agent 구현 및 설정
- `mcp` - MCP Server 통합
- `permission` - Permission 모드 구성
- `deploy` - 빌드 및 배포

**예시:**
```bash
/claude-agent init --lang typescript --name weather-agent
/claude-agent tool --name weather --description "Get weather info"
/claude-agent deploy --mode production
```

### 3. Sub-agent: agent-developer

Claude Agent SDK를 사용하여 실제 코드를 생성하고 구현하는 전문가 Sub-agent입니다.

**전문 분야:**
- TypeScript/Python Agent 구현
- Custom Tool 설계 및 개발
- MCP Server 통합
- Permission 모드 구성
- Error handling 및 복원력
- 프로덕션 배포 최적화

**자동 활성화:**
`/claude-agent` Command 실행 시 자동으로 활성화되어 SDK 베스트 프랙티스를 적용합니다.

### 4. 프로젝트 템플릿

즉시 사용 가능한 프로젝트 템플릿을 제공합니다.

**TypeScript 템플릿:**
- `package.json` - 의존성 및 스크립트
- `tsconfig.json` - TypeScript 설정
- `agent.ts` - 기본 Agent 구현
- `custom-tool.ts` - 커스텀 Tool 예시

**Python 템플릿:**
- `pyproject.toml` - 프로젝트 설정
- `agent.py` - 기본 Agent 구현
- `custom_tool.py` - 커스텀 Tool 예시

## 설치

### Claude Code Marketplace에서 설치

```bash
# Marketplace 추가 (한 번만)
/plugin marketplace add https://github.com/devlikebear/ai-agent-extensions

# 플러그인 설치
/plugin install claude-agent-app-builder
```

### 로컬에서 설치

```bash
# 플러그인 디렉토리로 이동
cd /path/to/ai-agent-extensions/plugins/claude-agent-app-builder

# Claude Code에 추가
/plugin marketplace add file:///path/to/ai-agent-extensions
/plugin install claude-agent-app-builder
```

## 사용 방법

### 1. Command를 사용한 프로젝트 생성

#### TypeScript 프로젝트
```bash
# 프로젝트 초기화
/claude-agent init --lang typescript --name my-weather-agent

# Weather Tool 생성
/claude-agent tool --name weather --description "Get weather information"

# Agent 구현
/claude-agent agent --system-prompt "You are a weather assistant" --tools weather

# 개발 모드 실행
/claude-agent deploy --mode dev
```

#### Python 프로젝트
```bash
# 프로젝트 초기화
/claude-agent init --lang python --name data-agent --template mcp-server

# Multiple Tools 생성
/claude-agent tool --name fetch-data --description "Fetch data from API"
/claude-agent tool --name analyze-data --description "Analyze data"

# MCP Server 설정
/claude-agent mcp --server data-tools --tools fetch-data,analyze-data

# Permission 설정
/claude-agent permission --mode acceptEdits

# 프로덕션 배포
/claude-agent deploy --mode production
```

### 2. 자연어 프롬프트 사용

#### Python Agent 프로젝트 생성
```
프롬프트: "Claude Agent SDK를 사용하여 Python Agent 프로젝트를 생성해줘"

Claude Code가 자동으로:
1. 프로젝트 디렉토리 구조 생성
2. pyproject.toml 설정
3. 기본 Agent 코드 생성
4. 커스텀 Tool 예시 추가
```

#### TypeScript Agent 프로젝트 생성
```
프롬프트: "Claude Agent SDK로 TypeScript Agent를 만들어줘"

Claude Code가 자동으로:
1. 프로젝트 디렉토리 구조 생성
2. package.json, tsconfig.json 설정
3. 기본 Agent 코드 생성
4. Zod를 사용한 Tool 예시 추가
```

### 3. 커스텀 Tool 개발

#### Command 사용
```bash
# TypeScript Tool with Zod
/claude-agent tool --name weather --description "Get weather for a city"

# Python Tool with JSON schema
/claude-agent tool --name database --description "Query database" --schema schema.json
```

#### 자연어 프롬프트
```
프롬프트: "날씨 정보를 가져오는 MCP Tool을 만들어줘"

agent-developer Sub-agent가 자동으로:
1. Tool 스키마 정의 (Zod 또는 JSON schema)
2. Tool 구현 코드 생성
3. Error handling 추가
4. MCP 서버 설정
5. Agent 통합 코드 제공
```

### 4. 베스트 프랙티스 조회

```
프롬프트: "Claude Agent SDK의 권한 관리 패턴을 알려줘"

agent-sdk-patterns Skill이 제공:
- Permission Mode 설명 (default, acceptEdits, plan, bypassPermissions)
- 각 모드의 사용 사례
- 보안 가이드라인
- 프로덕션 배포 체크리스트
```

## SDK 패턴 예시

### TypeScript: 간단한 Agent

```typescript
import { query } from '@anthropic-ai/claude-agent-sdk';

async function simpleTask() {
  const messages = query('Analyze this codebase', {
    model: 'claude-sonnet-4-20250514',
    allowedTools: ['Read', 'Grep'],
  });

  for await (const message of messages) {
    if (message.type === 'assistant') {
      console.log(message.content);
    }
  }
}
```

### Python: 대화형 Agent

```python
from claude_agent_sdk import ClaudeSDKClient, ClaudeAgentOptions

async def conversational_agent():
    options = ClaudeAgentOptions(
        model="claude-sonnet-4-20250514",
        permission_mode="default"
    )

    async with ClaudeSDKClient(options=options) as client:
        await client.query("Analyze the main.py file")

        async for message in client.receive_response():
            if message.type == "assistant":
                print(message.content)
```

### 커스텀 Tool (TypeScript)

```typescript
import { tool, createSdkMcpServer } from '@anthropic-ai/claude-agent-sdk';
import { z } from 'zod';

const weatherTool = tool(
  'get-weather',
  'Get current weather',
  z.object({
    location: z.string(),
  }),
  async (args) => {
    const weather = await fetchWeather(args.location);
    return { content: [{ type: 'text', text: JSON.stringify(weather) }] };
  }
);

const server = createSdkMcpServer({
  name: 'weather-server',
  tools: [weatherTool],
});
```

## 프로젝트 구조

```
claude-agent-app-builder/
├── .claude-plugin/
│   └── plugin.json              # 플러그인 메타데이터
├── commands/
│   └── claude-agent.md          # Agent 개발 워크플로우 Command
├── agents/
│   └── agent-developer.md       # SDK 전문가 Sub-agent
├── skills/
│   └── agent-sdk-patterns/
│       └── SKILL.md             # SDK 패턴 및 베스트 프랙티스 (4,200+ 라인)
├── templates/
│   ├── python/
│   │   ├── pyproject.toml       # Python 프로젝트 설정
│   │   ├── agent.py             # 기본 Agent 구현
│   │   └── custom_tool.py       # 커스텀 Tool 예시
│   └── typescript/
│       ├── package.json         # TypeScript 프로젝트 설정
│       ├── tsconfig.json        # TypeScript 설정
│       ├── agent.ts             # 기본 Agent 구현
│       └── custom-tool.ts       # 커스텀 Tool 예시
└── README.md                     # 이 파일
```

## 핵심 개념

### 1. query() vs ClaudeSDKClient

**query()**: 일회성 작업에 적합
- 간단한 코드 분석
- 단발성 작업
- 상태 유지 불필요

**ClaudeSDKClient**: 대화형 작업에 적합
- 멀티턴 대화
- 컨텍스트 유지 필요
- 복잡한 워크플로우

### 2. Permission Modes

| Mode | 설명 | 사용 사례 |
|------|------|-----------|
| `default` | 모든 도구 사용 시 확인 필요 | 개발 환경, 안전한 실행 |
| `acceptEdits` | 파일 수정 자동 승인 | 자동화 워크플로우 |
| `plan` | 계획만 수립, 실행 안 함 | 미리보기, 검토 |
| `bypassPermissions` | 모든 권한 자동 승인 | 테스트 전용 (위험) |

### 3. MCP Tool 생성

**TypeScript**:
```typescript
import { tool } from '@anthropic-ai/claude-agent-sdk';
import { z } from 'zod';

const myTool = tool(
  'tool-name',
  'Description',
  z.object({ param: z.string() }),
  async (args) => ({ content: [...] })
);
```

**Python**:
```python
from claude_agent_sdk import tool

@tool(
    name="tool-name",
    description="Description",
    input_schema={...}
)
async def my_tool(args):
    return {"content": [...]}
```

## 마이그레이션 가이드

### Claude Code SDK → Claude Agent SDK

**TypeScript**:
```bash
npm uninstall @anthropic-ai/claude-code
npm install @anthropic-ai/claude-agent-sdk
```

**Python**:
```bash
pip uninstall claude-code-sdk
pip install claude-agent-sdk
```

**코드 변경**:
- Import 경로 업데이트
- `ClaudeCodeOptions` → `ClaudeAgentOptions` (Python)
- 시스템 프롬프트 명시적 지정 필요
- 설정 소스 명시적 지정 필요 (production)

## 베스트 프랙티스

### 1. 에러 처리

```typescript
try {
  const messages = query('Task');
  for await (const msg of messages) {
    // Handle messages
  }
} catch (error) {
  if (error instanceof CLINotFoundError) {
    console.error('Claude CLI not installed');
  }
}
```

### 2. 리소스 정리

```python
async with ClaudeSDKClient(options=options) as client:
    # 작업 수행
    pass  # 자동으로 close됨
```

### 3. 보안 설정

```typescript
const client = new ClaudeSDKClient({
  permissionMode: 'acceptEdits',
  allowedTools: ['Read', 'Grep', 'Edit'],
  disallowedTools: ['Bash'],  // 위험한 도구 차단
});
```

### 4. 프로덕션 배포

```typescript
const client = new ClaudeSDKClient({
  settingSources: [],  // 설정 파일 격리
  permissionMode: 'acceptEdits',
  systemPrompt: 'Explicit instructions',
});
```

## 트러블슈팅

### CLI Not Found Error

```bash
# Claude CLI 설치 확인
claude --version

# 설치가 필요한 경우
# https://docs.claude.com/ko/docs/claude-code/installation
```

### Permission Denied

```typescript
// 권한 모드 확인
const client = new ClaudeSDKClient({
  permissionMode: 'acceptEdits',  // 또는 적절한 모드
});
```

### Import Error (Python)

```bash
# 가상 환경 활성화 확인
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 또는
venv\Scripts\activate  # Windows

# 패키지 재설치
pip install claude-agent-sdk
```

## 참고 자료

### 공식 문서
- [Claude Agent SDK 개요](https://docs.claude.com/ko/api/agent-sdk/overview)
- [TypeScript SDK 레퍼런스](https://docs.claude.com/ko/api/agent-sdk/typescript)
- [Python SDK 레퍼런스](https://docs.claude.com/ko/api/agent-sdk/python)
- [마이그레이션 가이드](https://docs.claude.com/ko/docs/claude-code/sdk/migration-guide)

### 관련 리소스
- [MCP (Model Context Protocol)](https://docs.anthropic.com/mcp)
- [Zod 스키마 검증](https://zod.dev/)
- [TypeScript 문서](https://www.typescriptlang.org/)
- [Python asyncio](https://docs.python.org/3/library/asyncio.html)

## 라이선스

MIT License

## 기여

버그 리포트나 기능 제안은 [GitHub Issues](https://github.com/devlikebear/ai-agent-extensions/issues)에 등록해주세요.

## 변경 로그

### v1.0.0 (2025-01-01)
- 초기 릴리스
- **Command**: `/claude-agent` - Agent 개발 워크플로우 (init, tool, agent, mcp, deploy)
- **Sub-agent**: `agent-developer` - SDK 전문가 자동 활성화
- **Skill**: `agent-sdk-patterns` - SDK 패턴 및 베스트 프랙티스 (4,200+ 라인)
- TypeScript 및 Python 프로젝트 템플릿
- 커스텀 Tool 생성 가이드
- MCP Server 통합 패턴
- Permission 모드 구성
- 프로덕션 배포 가이드

---

**Claude Agent App Builder**로 프로덕션 준비가 완료된 AI Agent를 빠르게 구축하세요! 🚀

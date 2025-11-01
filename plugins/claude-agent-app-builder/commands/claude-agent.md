# Claude Agent - Agent Application Builder

Claude Agent SDK를 사용하여 Python 또는 TypeScript Agent 애플리케이션을 빌드합니다.

## Command 개요

이 Command는 Claude Agent SDK를 활용한 Agent 애플리케이션 개발 워크플로우를 제공합니다:

1. **프로젝트 초기화**: Python 또는 TypeScript 프로젝트 스캐폴딩
2. **Custom Tool 생성**: Zod 스키마 또는 JSON 스키마 기반 Tool 정의
3. **MCP Server 통합**: Model Context Protocol 서버 설정 및 연동
4. **Agent 구현**: ClaudeSDKClient 기반 Agent 로직 구현
5. **Permission 설정**: 보안 및 권한 모드 구성
6. **테스트 및 실행**: Agent 애플리케이션 검증

## Usage

```bash
/claude-agent [init|tool|agent|mcp|deploy] [options]
```

## Workflow

### 1. 프로젝트 초기화

**TypeScript 프로젝트**:
```bash
/claude-agent init --lang typescript --name my-agent-app
```

**Python 프로젝트**:
```bash
/claude-agent init --lang python --name my-agent-app
```

이 단계에서 `agent-developer` Sub-agent가 자동으로 활성화되어:
- 프로젝트 디렉토리 구조 생성
- package.json/pyproject.toml 설정
- 기본 Agent 템플릿 생성
- TypeScript: tsconfig.json, src/index.ts
- Python: src/main.py, requirements.txt

### 2. Custom Tool 개발

**Tool 정의 요청**:
```bash
/claude-agent tool --name weather --description "Get weather information"
```

`agent-developer`가 다음을 수행합니다:

**TypeScript 예제**:
```typescript
import { tool } from '@anthropic-ai/claude-agent-sdk';
import { z } from 'zod';

const weatherTool = tool(
  'get-weather',
  'Get current weather information for a specific location',
  z.object({
    location: z.string().describe('City name or ZIP code'),
    units: z.enum(['celsius', 'fahrenheit']).optional(),
  }),
  async (args) => {
    // Tool implementation
    return {
      content: [{ type: 'text' as const, text: 'Weather data' }],
    };
  }
);
```

**Python 예제**:
```python
from claude_agent_sdk import tool

@tool(
    name="get-weather",
    description="Get current weather information",
    input_schema={
        "type": "object",
        "properties": {
            "location": {"type": "string"},
            "units": {"type": "string", "enum": ["celsius", "fahrenheit"]}
        }
    }
)
async def get_weather(args: dict) -> dict:
    # Tool implementation
    return {
        "content": [{"type": "text", "text": "Weather data"}]
    }
```

### 3. Agent 구현

**Agent 로직 개발**:
```bash
/claude-agent agent --system-prompt "You are a helpful assistant" --tools weather,calculator
```

`agent-developer`가 ClaudeSDKClient 기반 Agent를 구현합니다:

**TypeScript**:
```typescript
import { ClaudeSDKClient } from '@anthropic-ai/claude-agent-sdk';
import { weatherTool, calculatorTool } from './tools';

const client = new ClaudeSDKClient({
  model: 'claude-sonnet-4-20250514',
  systemPrompt: 'You are a helpful assistant',
  permissionMode: 'default',
  allowedTools: ['Read', 'Grep', 'Edit', 'Bash'],
});

await client.query('What is the weather in Tokyo?');

for await (const message of client.receiveResponse()) {
  if (message.type === 'assistant') {
    // Handle assistant response
  }
}
```

**Python**:
```python
from claude_agent_sdk import ClaudeSDKClient, ClaudeAgentOptions

options = ClaudeAgentOptions(
    model="claude-sonnet-4-20250514",
    system_prompt="You are a helpful assistant",
    permission_mode="default",
    allowed_tools=["Read", "Grep", "Edit", "Bash"],
)

async with ClaudeSDKClient(options=options) as client:
    await client.query("What is the weather in Tokyo?")

    async for message in client.receive_response():
        if message.type == "assistant":
            # Handle assistant response
```

### 4. MCP Server 통합

**MCP Server 설정**:
```bash
/claude-agent mcp --server custom-tools --tools weather,calculator
```

`agent-developer`가 MCP Server를 생성하고 Agent에 통합합니다:

**TypeScript**:
```typescript
import { createSdkMcpServer } from '@anthropic-ai/claude-agent-sdk';

const toolsServer = createSdkMcpServer({
  name: 'custom-tools',
  version: '1.0.0',
  tools: [weatherTool, calculatorTool],
});

const client = new ClaudeSDKClient({
  model: 'claude-sonnet-4-20250514',
  mcpServers: {
    'custom-tools': {
      server: toolsServer,
    },
  },
});
```

**Python**:
```python
from claude_agent_sdk import create_sdk_mcp_server

tools_server = create_sdk_mcp_server(
    name="custom-tools",
    tools=[get_weather, calculate]
)

options = ClaudeAgentOptions(
    model="claude-sonnet-4-20250514",
    mcp_servers={
        "custom-tools": {
            "server": tools_server
        }
    }
)
```

### 5. Permission 설정

**Permission Mode 구성**:
```bash
/claude-agent permission --mode acceptEdits
```

사용 가능한 Permission Modes:
- `default`: 모든 tool 사용에 사용자 확인 필요
- `acceptEdits`: Edit/Write/Delete 자동 승인, 위험한 작업만 확인
- `plan`: 실행 계획만 표시, 자동 실행 안 함
- `bypassPermissions`: 모든 작업 자동 승인 (테스트 전용)

### 6. 배포 및 실행

**개발 모드 실행**:
```bash
/claude-agent deploy --mode dev
```

**프로덕션 빌드**:
```bash
/claude-agent deploy --mode production
```

`agent-developer`가 다음을 수행합니다:
- TypeScript: `npm run build` → `npm start`
- Python: `pip install -e .` → `python -m src.main`
- 환경 변수 검증 (ANTHROPIC_API_KEY)
- 테스트 실행 및 검증

## Options

### Global Options
- `--lang <typescript|python>`: 프로그래밍 언어 선택 (기본값: TypeScript)
- `--output <path>`: 출력 디렉토리 (기본값: 현재 디렉토리)
- `--verbose`: 상세 로그 출력

### Init Options
- `--name <string>`: 프로젝트 이름
- `--template <basic|custom-tools|mcp-server>`: 템플릿 선택

### Tool Options
- `--name <string>`: Tool 이름
- `--description <string>`: Tool 설명
- `--schema <path>`: JSON 스키마 파일 경로 (Python)

### Agent Options
- `--system-prompt <string>`: 시스템 프롬프트
- `--tools <list>`: 사용할 Tools (쉼표로 구분)
- `--model <string>`: Claude 모델 (기본값: claude-sonnet-4-20250514)

### MCP Options
- `--server <name>`: MCP Server 이름
- `--tools <list>`: 포함할 Tools

### Permission Options
- `--mode <default|acceptEdits|plan|bypassPermissions>`: Permission 모드

### Deploy Options
- `--mode <dev|production>`: 배포 모드

## Examples

### 1. 기본 Weather Agent 생성

```bash
# 프로젝트 초기화
/claude-agent init --lang typescript --name weather-agent

# Weather Tool 생성
/claude-agent tool --name weather --description "Get weather for a city"

# Agent 구현
/claude-agent agent --system-prompt "You are a weather assistant" --tools weather

# 개발 모드 실행
/claude-agent deploy --mode dev
```

### 2. Python MCP Server Agent

```bash
# Python 프로젝트 초기화
/claude-agent init --lang python --name data-agent --template mcp-server

# Multiple Tools 생성
/claude-agent tool --name fetch-data --description "Fetch data from API"
/claude-agent tool --name analyze-data --description "Analyze data"

# MCP Server 설정
/claude-agent mcp --server data-tools --tools fetch-data,analyze-data

# Agent 구현
/claude-agent agent --system-prompt "You are a data analyst" --tools fetch-data,analyze-data

# Permission 설정
/claude-agent permission --mode acceptEdits

# 프로덕션 빌드
/claude-agent deploy --mode production
```

### 3. Interactive Agent with Plan Mode

```bash
# 프로젝트 초기화
/claude-agent init --lang typescript --name interactive-agent

# Custom Tools
/claude-agent tool --name search --description "Search the web"
/claude-agent tool --name summarize --description "Summarize content"

# Agent with plan mode
/claude-agent agent \
  --system-prompt "You are a research assistant" \
  --tools search,summarize

/claude-agent permission --mode plan

# 실행
/claude-agent deploy --mode dev
```

## Best Practices

### 1. Tool Design
- Tool 이름은 명확하고 설명적으로 작성
- Input schema는 validation을 포함하여 정의
- Error handling을 구현하여 robust한 Tool 작성

### 2. Permission Configuration
- 개발: `plan` 모드로 시작하여 workflow 검증
- 테스트: `acceptEdits` 모드로 자동화 테스트
- 프로덕션: `default` 모드로 보안 강화

### 3. MCP Server 관리
- 관련된 Tools를 하나의 MCP Server로 그룹화
- Server 이름은 기능을 반영하도록 작성
- Version 관리를 통해 호환성 유지

### 4. Error Handling
- 모든 Tool에 try-catch 구현
- Error 메시지는 명확하고 actionable하게 작성
- `isError: true` 플래그로 에러 표시

### 5. Testing
- Unit test로 Tool 로직 검증
- Integration test로 Agent workflow 검증
- E2E test로 전체 시스템 검증

## Sub-Agent Integration

이 Command는 `agent-developer` Sub-agent를 자동으로 활성화하여:
- SDK 패턴 및 베스트 프랙티스 적용
- 타입 안전성 보장 (TypeScript)
- 비동기 처리 최적화
- Error handling 구현
- 프로덕션 ready 코드 생성

## Related Resources

- **Skill**: `@skills/agent-sdk-patterns/SKILL.md` - Claude Agent SDK 패턴 및 가이드
- **Templates**:
  - TypeScript: `templates/typescript/`
  - Python: `templates/python/`
- **Official Docs**: https://docs.anthropic.com/en/docs/agents/claude-code-sdk

## Troubleshooting

### API Key 오류
```bash
Error: ANTHROPIC_API_KEY environment variable not set
```

**해결책**: 환경 변수 설정
```bash
export ANTHROPIC_API_KEY="your-api-key"
```

### Permission 거부
```bash
Error: Permission denied for tool execution
```

**해결책**: Permission mode 변경
```bash
/claude-agent permission --mode acceptEdits
```

### MCP Server 연결 실패
```bash
Error: Failed to connect to MCP server
```

**해결책**: Server 생성 및 등록 확인
```bash
/claude-agent mcp --server custom-tools --tools your-tools
```

## Notes

- ANTHROPIC_API_KEY 환경 변수 필수
- Node.js ≥18 (TypeScript) 또는 Python ≥3.10 필요
- TypeScript는 `@anthropic-ai/claude-agent-sdk` 패키지 사용
- Python은 `claude-agent-sdk` 패키지 사용

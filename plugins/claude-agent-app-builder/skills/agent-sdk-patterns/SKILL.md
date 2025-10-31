---
name: claude-agent-app-builder
description: Claude Agent SDK를 사용해 Python과 TypeScript Agent 애플리케이션을 구축하는 전문가 스킬. 프로젝트 초기화, MCP 통합, Tool 생성, 베스트 프랙티스를 제공합니다.
---

# Claude Agent App Builder

당신은 Claude Agent SDK 전문가입니다. Python과 TypeScript를 사용하여 프로덕션 준비가 완료된 AI 에이전트를 구축하는 것을 돕습니다.

## 핵심 역량

### 1. 프로젝트 구조화
- **TypeScript**: Node.js 및 웹 애플리케이션용 Agent 프로젝트
- **Python**: Python 애플리케이션 및 데이터 과학용 Agent 프로젝트
- 표준 디렉토리 구조 및 설정 파일 생성
- 의존성 관리 및 버전 호환성 검증

### 2. SDK 패턴 및 API
- `query()`: 간단한 일회성 작업
- `ClaudeSDKClient`: 대화형 멀티턴 세션
- Tool 생성 및 MCP 서버 통합
- 권한 관리 및 보안 설정

### 3. 베스트 프랙티스
- 자동 컨텍스트 압축 및 관리
- 프롬프트 캐싱 최적화
- 에러 처리 및 복구 전략
- 프로덕션 배포 가이드

## TypeScript Agent SDK 패턴

### 설치 및 설정

```bash
npm install @anthropic-ai/claude-agent-sdk
```

### 패턴 1: query() - 일회성 작업

간단한 작업이나 상태 유지가 필요 없는 경우 사용합니다.

```typescript
import { query } from '@anthropic-ai/claude-agent-sdk';

async function simpleTask() {
  const messages = query('Analyze this codebase and find potential bugs', {
    model: 'claude-sonnet-4-20250514',
    cwd: '/path/to/project',
    allowedTools: ['Read', 'Grep', 'Bash'],
    permissionMode: 'default' // User confirmation required
  });

  for await (const message of messages) {
    if (message.type === 'assistant') {
      console.log(message.content);
    }
    if (message.type === 'result') {
      console.log('Task completed!');
      console.log('Usage:', message.usage);
    }
  }
}
```

### 패턴 2: ClaudeSDKClient - 대화형 세션

복잡한 멀티턴 대화나 상태 유지가 필요한 경우 사용합니다.

```typescript
import { ClaudeSDKClient } from '@anthropic-ai/claude-agent-sdk';

async function conversationalAgent() {
  const client = new ClaudeSDKClient({
    model: 'claude-sonnet-4-20250514',
    cwd: process.cwd(),
    systemPrompt: 'You are a helpful coding assistant.',
    permissionMode: 'acceptEdits', // Auto-accept file edits
    mcpServers: {
      'custom-tools': {
        command: 'node',
        args: ['./mcp-server.js']
      }
    }
  });

  try {
    // First query
    await client.query('Read the main.ts file');

    for await (const message of client.receiveResponse()) {
      if (message.type === 'assistant') {
        console.log('Assistant:', message.content);
      }
    }

    // Follow-up query (context preserved)
    await client.query('Now refactor the main function');

    for await (const message of client.receiveResponse()) {
      if (message.type === 'assistant') {
        console.log('Assistant:', message.content);
      }
    }
  } finally {
    await client.close();
  }
}
```

### 패턴 3: Custom Tools with Zod

타입 안전한 커스텀 도구를 생성합니다.

```typescript
import { tool, createSdkMcpServer } from '@anthropic-ai/claude-agent-sdk';
import { z } from 'zod';

// Tool 정의
const weatherTool = tool(
  'get-weather',
  'Get current weather for a location',
  z.object({
    location: z.string().describe('City name or ZIP code'),
    units: z.enum(['celsius', 'fahrenheit']).optional()
  }),
  async (args) => {
    // 실제 API 호출 로직
    const weather = await fetchWeather(args.location, args.units);

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(weather, null, 2)
      }]
    };
  }
);

// MCP 서버 생성
const mcpServer = createSdkMcpServer({
  name: 'weather-server',
  version: '1.0.0',
  tools: [weatherTool]
});

// Agent에서 사용
const client = new ClaudeSDKClient({
  mcpServers: {
    'weather': {
      server: mcpServer
    }
  }
});
```

### 패턴 4: Permission Mode 관리

```typescript
// 1. default: 모든 도구 사용 시 사용자 승인 필요 (가장 안전)
const client1 = new ClaudeSDKClient({
  permissionMode: 'default'
});

// 2. acceptEdits: 파일 수정 자동 승인 (자동화 워크플로우)
const client2 = new ClaudeSDKClient({
  permissionMode: 'acceptEdits'
});

// 3. plan: 계획만 수립, 실행 안 함 (미리보기)
const client3 = new ClaudeSDKClient({
  permissionMode: 'plan'
});

// 4. bypassPermissions: 모든 권한 자동 승인 (위험, 테스트 전용)
const client4 = new ClaudeSDKClient({
  permissionMode: 'bypassPermissions' // Use with caution!
});

// 5. Custom permission callback
const client5 = new ClaudeSDKClient({
  canUseTool: async (toolName, toolInput) => {
    // 커스텀 로직
    if (toolName === 'Bash' && toolInput.command.includes('rm -rf')) {
      return false; // 위험한 명령 차단
    }
    return true;
  }
});
```

### 패턴 5: Settings Sources 제어

```typescript
// 프로덕션: 설정 파일 로드 안 함 (격리)
const prodClient = new ClaudeSDKClient({
  settingSources: [] // No CLAUDE.md, settings.json
});

// 개발: 사용자 및 프로젝트 설정 로드
const devClient = new ClaudeSDKClient({
  settingSources: ['user', 'project', 'local']
});

// 선택적: 프로젝트 설정만 로드
const projectClient = new ClaudeSDKClient({
  settingSources: ['project']
});
```

## Python Agent SDK 패턴

### 설치 및 설정

```bash
pip install claude-agent-sdk
```

### 패턴 1: query() - 일회성 작업

```python
from claude_agent_sdk import query, ClaudeAgentOptions

async def simple_task():
    options = ClaudeAgentOptions(
        model="claude-sonnet-4-20250514",
        cwd="/path/to/project",
        allowed_tools=["Read", "Grep", "Bash"],
        permission_mode="default"
    )

    async for message in query("Analyze this codebase", options):
        if message.type == "assistant":
            print(message.content)
        elif message.type == "result":
            print(f"Completed! Usage: {message.usage}")
```

### 패턴 2: ClaudeSDKClient - 대화형 세션

```python
from claude_agent_sdk import ClaudeSDKClient, ClaudeAgentOptions

async def conversational_agent():
    options = ClaudeAgentOptions(
        model="claude-sonnet-4-20250514",
        system_prompt="You are a helpful coding assistant.",
        permission_mode="acceptEdits",
        mcp_servers={
            "custom-tools": {
                "command": "python",
                "args": ["mcp_server.py"]
            }
        }
    )

    async with ClaudeSDKClient(options=options) as client:
        # 첫 번째 쿼리
        await client.query("Read the main.py file")

        async for message in client.receive_response():
            if message.type == "assistant":
                print(f"Assistant: {message.content}")

        # 후속 쿼리 (컨텍스트 유지)
        await client.query("Now refactor the main function")

        async for message in client.receive_response():
            if message.type == "assistant":
                print(f"Assistant: {message.content}")
```

### 패턴 3: Custom Tools with @tool Decorator

```python
from claude_agent_sdk import tool, create_sdk_mcp_server
from typing import Any

@tool(
    name="get-weather",
    description="Get current weather for a location",
    input_schema={
        "type": "object",
        "properties": {
            "location": {
                "type": "string",
                "description": "City name or ZIP code"
            },
            "units": {
                "type": "string",
                "enum": ["celsius", "fahrenheit"]
            }
        },
        "required": ["location"]
    }
)
async def get_weather(args: dict[str, Any]) -> dict[str, Any]:
    # 실제 API 호출 로직
    weather = await fetch_weather(args["location"], args.get("units"))

    return {
        "content": [{
            "type": "text",
            "text": json.dumps(weather, indent=2)
        }]
    }

# MCP 서버 생성
mcp_server = create_sdk_mcp_server(
    name="weather-server",
    tools=[get_weather]
)

# Agent에서 사용
client = ClaudeSDKClient(
    options=ClaudeAgentOptions(
        mcp_servers={
            "weather": {"server": mcp_server}
        }
    )
)
```

### 패턴 4: Permission Mode 관리

```python
from claude_agent_sdk import ClaudeAgentOptions

# 1. default: 모든 도구 사용 시 사용자 승인 필요
options1 = ClaudeAgentOptions(permission_mode="default")

# 2. acceptEdits: 파일 수정 자동 승인
options2 = ClaudeAgentOptions(permission_mode="acceptEdits")

# 3. plan: 계획만 수립, 실행 안 함
options3 = ClaudeAgentOptions(permission_mode="plan")

# 4. bypassPermissions: 모든 권한 자동 승인 (위험)
options4 = ClaudeAgentOptions(permission_mode="bypassPermissions")

# 5. Custom permission callback
async def custom_permission(tool_name: str, tool_input: dict) -> bool:
    if tool_name == "Bash" and "rm -rf" in tool_input.get("command", ""):
        return False  # 위험한 명령 차단
    return True

options5 = ClaudeAgentOptions(can_use_tool=custom_permission)
```

### 패턴 5: Hooks - Pre/Post Tool Use

```python
from claude_agent_sdk import ClaudeSDKClient, ClaudeAgentOptions

async def pre_tool_hook(tool_name: str, tool_input: dict) -> None:
    print(f"About to use {tool_name} with {tool_input}")
    # 로깅, 검증 등

async def post_tool_hook(tool_name: str, tool_output: dict) -> None:
    print(f"Tool {tool_name} returned: {tool_output}")
    # 결과 처리, 모니터링 등

options = ClaudeAgentOptions(
    hooks={
        "PreToolUse": {"*": [pre_tool_hook]},
        "PostToolUse": {"*": [post_tool_hook]}
    }
)

client = ClaudeSDKClient(options=options)
```

## 프로젝트 템플릿

### TypeScript 프로젝트 구조

```
my-agent-app/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts          # 메인 엔트리포인트
│   ├── agent.ts          # Agent 로직
│   ├── tools/            # Custom tools
│   │   ├── weather.ts
│   │   └── database.ts
│   └── mcp/              # MCP 서버
│       └── server.ts
├── tests/
│   └── agent.test.ts
└── .env                  # ANTHROPIC_API_KEY
```

**package.json**:
```json
{
  "name": "my-agent-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@anthropic-ai/claude-agent-sdk": "^0.1.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.3.0"
  }
}
```

**tsconfig.json**:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Python 프로젝트 구조

```
my-agent-app/
├── pyproject.toml
├── README.md
├── src/
│   └── my_agent/
│       ├── __init__.py
│       ├── agent.py       # Agent 로직
│       ├── tools/         # Custom tools
│       │   ├── __init__.py
│       │   ├── weather.py
│       │   └── database.py
│       └── mcp/           # MCP 서버
│           └── server.py
├── tests/
│   └── test_agent.py
└── .env                   # ANTHROPIC_API_KEY
```

**pyproject.toml**:
```toml
[project]
name = "my-agent-app"
version = "1.0.0"
description = "Claude Agent SDK application"
requires-python = ">=3.10"
dependencies = [
    "claude-agent-sdk>=0.1.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.0.0",
    "pytest-asyncio>=0.21.0",
    "black>=23.0.0",
    "ruff>=0.1.0",
]

[build-system]
requires = ["setuptools>=68.0.0", "wheel"]
build-backend = "setuptools.build_meta"

[tool.black]
line-length = 88
target-version = ['py310']

[tool.ruff]
line-length = 88
select = ["E", "F", "I"]
```

## 베스트 프랙티스

### 1. 에러 처리

**TypeScript**:
```typescript
import { CLINotFoundError, ProcessError } from '@anthropic-ai/claude-agent-sdk';

try {
  const messages = query('Do something');
  for await (const msg of messages) {
    // Process messages
  }
} catch (error) {
  if (error instanceof CLINotFoundError) {
    console.error('Claude CLI not installed!');
  } else if (error instanceof ProcessError) {
    console.error('Process failed:', error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

**Python**:
```python
from claude_agent_sdk import CLINotFoundError, ProcessError

try:
    async for message in query("Do something"):
        # Process messages
        pass
except CLINotFoundError:
    print("Claude CLI not installed!")
except ProcessError as e:
    print(f"Process failed: {e}")
except Exception as e:
    print(f"Unexpected error: {e}")
```

### 2. 컨텍스트 압축 활용

SDK는 자동으로 컨텍스트를 압축하지만, 명시적으로 관리할 수도 있습니다:

```typescript
const client = new ClaudeSDKClient({
  systemPrompt: {
    preset: 'claude-code-default', // 미리 정의된 프롬프트 사용
    override: 'Additional instructions...' // 추가 지시사항
  }
});
```

### 3. 프롬프트 캐싱 최적화

반복적인 시스템 프롬프트나 컨텍스트는 자동으로 캐시됩니다:

```python
# 시스템 프롬프트는 캐시됨
options = ClaudeAgentOptions(
    system_prompt="Long, detailed system instructions..."  # 캐시됨
)

# 여러 쿼리에서 재사용
async with ClaudeSDKClient(options=options) as client:
    await client.query("First task")  # 프롬프트 캐시 생성
    # ... process ...

    await client.query("Second task")  # 캐시된 프롬프트 사용
```

### 4. Tool 권한 관리

```typescript
// 위험한 도구는 명시적으로 제외
const client = new ClaudeSDKClient({
  disallowedTools: ['Bash', 'Write'],  // 실행 방지
  allowedTools: ['Read', 'Grep']       // 읽기 전용
});
```

### 5. 프로덕션 배포

**환경 변수 관리**:
```bash
# .env
ANTHROPIC_API_KEY=sk-ant-...
CLAUDE_MODEL=claude-sonnet-4-20250514
CLAUDE_PERMISSION_MODE=acceptEdits
```

**Docker 배포**:
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .
RUN npm run build

ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
```

## 마이그레이션 가이드

### Claude Code SDK → Claude Agent SDK

**TypeScript**:
```bash
npm uninstall @anthropic-ai/claude-code
npm install @anthropic-ai/claude-agent-sdk
```

**코드 변경**:
```typescript
// Before
import { query } from '@anthropic-ai/claude-code';

// After
import { query } from '@anthropic-ai/claude-agent-sdk';
```

**Python**:
```bash
pip uninstall claude-code-sdk
pip install claude-agent-sdk
```

**코드 변경**:
```python
# Before
from claude_code_sdk import query, ClaudeCodeOptions

# After
from claude_agent_sdk import query, ClaudeAgentOptions
```

### Breaking Changes 주의사항

1. **시스템 프롬프트**: 기본값이 자동 상속되지 않음 → 명시적 지정 필요
2. **설정 소스**: 파일시스템 설정이 기본으로 로드되지 않음
3. **타입명 변경**: `ClaudeCodeOptions` → `ClaudeAgentOptions` (Python)

## Common Pitfalls (일반적인 실수)

### 1. Permission Mode 혼동

❌ **잘못된 예**:
```typescript
// 프로덕션에서 bypassPermissions 사용 (위험!)
const client = new ClaudeSDKClient({
  permissionMode: 'bypassPermissions'
});
```

✅ **올바른 예**:
```typescript
// 프로덕션에서는 명시적 권한 관리
const client = new ClaudeSDKClient({
  permissionMode: 'acceptEdits',
  allowedTools: ['Read', 'Grep', 'Edit'],
  disallowedTools: ['Bash']
});
```

### 2. 세션 종료 누락

❌ **잘못된 예**:
```python
client = ClaudeSDKClient(options=options)
await client.query("Do something")
# close() 호출 안 함!
```

✅ **올바른 예**:
```python
async with ClaudeSDKClient(options=options) as client:
    await client.query("Do something")
    # 자동으로 close됨
```

### 3. 에러 처리 누락

❌ **잘못된 예**:
```typescript
const messages = query('Task');
for await (const msg of messages) {
  console.log(msg);
}
```

✅ **올바른 예**:
```typescript
try {
  const messages = query('Task');
  for await (const msg of messages) {
    if (msg.type === 'result' && msg.error) {
      console.error('Task failed:', msg.error);
    }
  }
} catch (error) {
  console.error('Fatal error:', error);
}
```

## 지원 및 참고 자료

- **공식 문서**: https://docs.claude.com/ko/api/agent-sdk/overview
- **TypeScript SDK**: https://docs.claude.com/ko/api/agent-sdk/typescript
- **Python SDK**: https://docs.claude.com/ko/api/agent-sdk/python
- **마이그레이션 가이드**: https://docs.claude.com/ko/docs/claude-code/sdk/migration-guide

---

이 스킬을 사용하여 프로덕션 준비가 완료된 Claude Agent를 빠르고 안전하게 구축하세요!

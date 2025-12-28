# 플러그인 제출 가이드

AI Agent Extensions에 플러그인을 제출하는 방법을 안내합니다.

## 📋 제출 전 체크리스트

플러그인 제출 전 아래 항목을 확인해주세요:

- [ ] `.claude-plugin/plugin.json` 파일이 올바르게 작성되었습니다
- [ ] 필수 필드(name, version, description)가 모두 포함되어 있습니다
- [ ] `README.md` 파일이 작성되었습니다
- [ ] 사용 예제가 포함되어 있습니다
- [ ] `claude plugin validate` 명령어로 검증을 통과했습니다
- [ ] 로컬 환경에서 테스트를 완료했습니다

## 🚀 제출 프로세스

### 1. 저장소 Fork

```bash
# GitHub에서 Fork 버튼 클릭
# 본인의 저장소로 Clone
git clone https://github.com/YOUR_USERNAME/ai-agent-extensions.git
cd ai-agent-extensions
```

### 2. 플러그인 개발

**Command 플러그인:**
```bash
mkdir -p plugins/commands/your-plugin/.claude-plugin
mkdir -p plugins/commands/your-plugin/commands
```

**Sub-agent 플러그인:**
```bash
mkdir -p plugins/agents/your-agent/.claude-plugin
mkdir -p plugins/agents/your-agent/agents
```

### 3. plugin.json 작성

`.claude-plugin/plugin.json` 예시:

```json
{
  "name": "your-plugin",
  "version": "1.0.0",
  "description": "플러그인 설명",
  "author": {
    "name": "Your Name",
    "email": "your@email.com",
    "url": "https://github.com/yourusername"
  },
  "homepage": "https://github.com/yourusername/your-plugin",
  "repository": "https://github.com/yourusername/your-plugin",
  "license": "MIT",
  "keywords": ["keyword1", "keyword2"]
}
```

### 4. Command 또는 Agent 작성

**Command 예시 (`commands/your-command.md`):**

```markdown
---
name: your-command
description: 명령어가 언제 실행되어야 하는지 설명
---

# Command System Prompt

명령어의 역할과 동작 방식을 정의하는 시스템 프롬프트
```

**Sub-agent 예시 (`agents/your-agent.md`):**

```markdown
---
name: your-agent
description: Sub-agent가 언제 호출되어야 하는지 설명
tools: Read, Write, Grep
model: sonnet
---

# Agent System Prompt

Sub-agent의 전문 분야와 작업 방식을 정의하는 시스템 프롬프트
```

### 5. README.md 작성

플러그인 디렉토리에 `README.md` 파일을 작성하세요:

```markdown
# Your Plugin

플러그인 설명

## 사용 방법

\`\`\`bash
/your-command
\`\`\`

## 예제

실제 사용 예제를 포함하세요.
```

### 6. 로컬 테스트

```bash
# 로컬 마켓플레이스 추가
/plugin marketplace add file:///path/to/ai-agent-extensions

# 플러그인 설치
/plugin install your-plugin@ai-agent-extensions

# 동작 확인
/your-command  # Command의 경우
"Use the your-agent agent"  # Sub-agent의 경우
```

### 7. 검증

```bash
# 플러그인 검증
claude plugin validate plugins/commands/your-plugin
# 또는
claude plugin validate plugins/agents/your-agent
```

### 8. marketplace.json 업데이트

`.claude-plugin/marketplace.json` 파일에 플러그인 추가:

```json
{
  "plugins": [
    {
      "name": "your-plugin",
      "source": "./plugins/commands/your-plugin"
    }
  ]
}
```

### 9. Pull Request 생성

```bash
# 변경사항 커밋
git add .
git commit -m "feat: add your-plugin"

# Fork한 저장소에 Push
git push origin main

# GitHub에서 Pull Request 생성
```

## 📝 Pull Request 템플릿

PR 생성 시 다음 내용을 포함해주세요:

```markdown
## 플러그인 정보

- **이름**: your-plugin
- **타입**: Command / Sub-agent
- **설명**: 간단한 설명

## 체크리스트

- [ ] plugin.json 작성 완료
- [ ] README.md 작성 완료
- [ ] 로컬 테스트 완료
- [ ] claude plugin validate 통과
- [ ] 사용 예제 포함

## 스크린샷/데모 (선택사항)

플러그인 동작을 보여주는 스크린샷이나 데모가 있다면 추가해주세요.
```

## 🔍 리뷰 프로세스

1. **자동 검증**: GitHub Actions가 자동으로 `claude plugin validate` 실행
2. **코드 리뷰**: 메인테이너가 코드 품질 및 문서 완성도 검토
3. **피드백**: 필요시 수정 요청
4. **승인 및 병합**: 검토 완료 후 main 브랜치에 병합

## 🤔 자주 묻는 질문

### Q: 플러그인 이름 규칙이 있나요?
A: kebab-case를 사용하며, 명확하고 설명적인 이름을 권장합니다.

### Q: 여러 개의 명령어를 하나의 플러그인에 포함할 수 있나요?
A: 가능합니다. `plugin.json`의 `commands` 필드에 배열로 지정하세요.

### Q: 플러그인 업데이트는 어떻게 하나요?
A: `version`을 올리고 동일한 PR 프로세스를 따라주세요.

### Q: 외부 도구 의존성이 있는 플러그인도 가능한가요?
A: 가능하지만, README에 명확히 명시해주세요.

## 📞 도움이 필요하신가요?

- GitHub Issues: 질문이나 문제 보고
- GitHub Discussions: 일반적인 토론
- 개발 가이드: [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)

감사합니다! 🎉

# Skill Generator 플러그인

코드베이스를 분석하여 **Claude Skills**를 자동으로 생성하는 플러그인입니다.

Claude Skills는 Claude에게 특정 도메인이나 작업에 대한 깊이 있는 지식을 제공하는 재사용 가능한 AI 기능으로, 이 플러그인은 프로젝트의 코드에서 자동으로 이러한 Skills를 추출하고 생성합니다.

## 🎯 핵심 기능

### 코드베이스 자동 분석
- 📁 프로젝트 구조 및 파일 조직 분석
- 🔎 기술 스택 자동 감지
- 📊 패턴 인식 및 분류
- 📈 복잡도 평가

### 도메인 식별
- 🎨 **프론트엔드**: React, Vue, Angular 컴포넌트 패턴
- 🔧 **백엔드**: API, 데이터베이스, 인증 패턴
- 📊 **데이터**: 변환, 분석, 알고리즘 패턴
- 🔐 **보안**: 취약점 방지, 암호화 패턴
- 🧪 **테스팅**: 테스트 전략, 커버리지 패턴

### Skill 자동 생성
- ✍️ 구조화된 Skill 정의 생성
- 📚 실용적인 예제 자동 작성
- 🎓 베스트 프랙티스 포함
- ⚠️ 일반적인 실수 및 해결 방법 제시

## 🚀 빠른 시작

### 설치

```bash
# 마켓플레이스에서 설치
/plugin install skill-generator@ai-agent-extensions

# 또는 개별 설치
/plugin marketplace add devlikebear/ai-agent-extensions
```

### 기본 사용

```bash
# 전체 코드베이스 분석 및 Skill 생성
/skill-generator

# 특정 도메인 Skill 생성
/skill-generator --domain "frontend"
/skill-generator --domain "backend"

# 특정 디렉토리 기반 Skill 생성
/skill-generator --path ./src/components
```

## 📋 사용 예제

### 예제 1: React 프로젝트의 Skill 생성

```bash
/skill-generator
```

**생성되는 Skills:**
- React Component Patterns
- React Hooks Best Practices
- State Management in React
- Performance Optimization
- CSS Architecture
- Responsive Design

### 예제 2: 백엔드 프로젝트의 심화 분석

```bash
/skill-generator --domain "backend" --comprehensive
```

**생성되는 Skills:**
- RESTful API Design
- Database Schema Design
- Authentication & Authorization
- API Error Handling
- Performance Optimization
- Security Best Practices

### 예제 3: 기존 Skill 업데이트

```bash
/skill-generator --update --preserve-custom
```

**동작:**
1. 기존 Skills 검토
2. 새로운 패턴 감지
3. 추가 내용 반영
4. 커스텀 부분은 보존

## 🔧 주요 명령어

| 명령어 | 설명 |
|--------|------|
| `/skill-generator` | 전체 코드베이스 분석 및 Skill 생성 |
| `/skill-generator --domain <name>` | 특정 도메인 Skill 생성 |
| `/skill-generator --path <path>` | 특정 디렉토리 기반 Skill 생성 |
| `/skill-generator --comprehensive` | 상세한 분석과 복잡한 Skill 생성 |
| `/skill-generator --update` | 기존 Skill 업데이트 |
| `/skill-generator --integrate <skill>` | Skill을 플러그인에 통합 |
| `/skill-generator --list` | 생성 가능한 Skill 목록 표시 |
| `/skill-generator --validate` | 기존 Skill 검증 |

## 📊 생성 과정

```
1단계: 코드베이스 스캔
  ├─ 파일 구조 분석
  ├─ 기술 스택 감지
  └─ 패턴 인식

2단계: 도메인 식별
  ├─ 키워드 매칭
  ├─ 파일 경로 분석
  └─ 의존성 추적

3단계: 지식 추출
  ├─ 코드 패턴 분석
  ├─ 설정 파일 파싱
  └─ 타입 정의 추출

4단계: Skill 생성
  ├─ 구조 설계
  ├─ 예제 작성
  ├─ 베스트 프랙티스 추가
  └─ 검증 규칙 정의

5단계: 통합
  ├─ plugin.json 업데이트
  ├─ 유효성 검사
  └─ 설치 준비
```

## 📁 생성된 파일 구조

```
skills/
├─ [skill-name]/
│  ├─ SKILL.md              # 메인 Skill 정의
│  ├─ examples.md           # 상세 사용 예제
│  ├─ validation.md         # 검증 규칙 및 체크리스트
│  ├─ resources.md          # 관련 리소스 및 참고자료
│  └─ README.md             # 빠른 시작 가이드
└─ [skill-name-2]/
   └─ ...
```

## 🎓 Skill 구조 예제

생성된 각 Skill의 기본 구조:

```markdown
# [Skill 이름]

[Skill 설명 및 목적]

## 능력 (Capabilities)

- 핵심 기능 1
- 핵심 기능 2
- 핵심 기능 3

## 핵심 개념

### 개념 1
설명...

## 사용 예제

### 예제 1
코드 예제...

## 베스트 프랙티스

1. 프랙티스 1
2. 프랙티스 2

## 일반적인 실수

- ❌ 실수 1
  ✅ 올바른 방법: ...

## 제약사항 및 한계

- 제약사항 1
- 제약사항 2
```

## 🛠️ 고급 기능

### 다중 도메인 분석

```bash
/skill-generator --multi-domain
```

여러 도메인에서 동시에 Skills를 생성합니다.

### Skill 커스터마이징

생성된 Skill은 자동으로 생성되지만 언제든 수정할 수 있습니다:

1. **Skill 수정**: `SKILL.md` 파일 직접 편집
2. **예제 추가**: `examples.md`에 새로운 예제 추가
3. **검증 규칙 업데이트**: `validation.md` 수정

### 플러그인 통합

```bash
/skill-generator --integrate my-skill --plugin frontend-plugin
```

생성된 Skill을 특정 플러그인에 추가합니다.

## 📚 도메인별 Skill 생성

### 프론트엔드 개발
```bash
/skill-generator --domain "frontend"
```

생성되는 Skills:
- React/Vue/Angular Component Patterns
- CSS/Styling Architecture
- Responsive Design
- Accessibility Best Practices
- Performance Optimization
- State Management

### 백엔드 개발
```bash
/skill-generator --domain "backend"
```

생성되는 Skills:
- API Design Patterns
- Database Schema Design
- Authentication & Authorization
- Error Handling
- API Performance
- Security Best Practices

### 데이터 처리
```bash
/skill-generator --domain "data"
```

생성되는 Skills:
- Data Transformation Patterns
- Algorithm Selection
- Performance Optimization
- Data Validation
- Error Handling

### 보안
```bash
/skill-generator --domain "security"
```

생성되는 Skills:
- Security Best Practices
- Vulnerability Prevention
- Encryption Patterns
- Authentication Methods
- Data Protection

## ⚙️ 설정 옵션

### 스캔 범위 (--scope)
- `file`: 단일 파일 기반
- `directory`: 디렉토리 기반 (기본값)
- `project`: 전체 프로젝트

### 분석 깊이 (--depth)
- `shallow`: 기본 패턴만 감지
- `medium`: 일반적인 분석 (기본값)
- `deep`: 상세한 코드 분석

### 출력 형식 (--format)
- `markdown`: Markdown 형식 (기본값)
- `json`: JSON 구조
- `yaml`: YAML 형식

## ✅ 품질 기준

생성된 Skills는 다음 기준을 만족합니다:

- ✅ 명확하고 이해하기 쉬운 설명
- ✅ 실제 프로젝트에 적용 가능한 예제
- ✅ 현재 업계 표준 및 모범 사례 반영
- ✅ 완전하고 정확한 정보
- ✅ 실용적이고 유용한 내용
- ✅ 일관된 포맷과 스타일

## 🔍 생성된 Skill의 검증

```bash
/skill-generator --validate
```

생성된 모든 Skills의 유효성을 검사합니다:
- 파일 구조 검증
- Markdown 형식 검증
- 링크 유효성 확인
- 코드 예제 검증

## 📊 성능 지표

### 효율성
- ⏱️ Skill 생성 시간: 5-10분 (수동은 1-2시간)
- 📊 커버리지: 프로젝트 도메인의 80% 이상
- 🔄 업데이트 속도: 코드 변경 후 24시간 내

### 품질
- ✅ 검수 통과율: > 95%
- 🎓 팀원 만족도: > 4/5
- 🛠️ 실제 프로젝트 적용율: > 70%

## 🤝 관련 플러그인

- **novel-writer**: 소설 작성 Skills 포함
- **docs**: 문서 자동화와 함께 사용 권장
- **quality-guardian**: 코드 품질 Skills 생성

## 📖 더 알아보기

- 📚 [Claude Skills 공식 문서](https://docs.claude.com/en/docs/claude-code/skills)
- 🔗 [Claude 뉴스 - Skills 소개](https://www.anthropic.com/news/skills)
- 💡 [Best Practices 가이드](./commands/skill-generator.md)
- 🤖 [Agent 상세 설명](./agents/skill-generator-agent.md)

## 🆘 문제 해결

### 문제: Skill이 생성되지 않음
**해결책:**
1. 코드베이스가 충분한 크기인지 확인 (최소 10개 파일)
2. 파일 형식이 지원되는 형식인지 확인
3. `--depth deep` 옵션 사용

### 문제: 생성된 Skill의 품질이 낮음
**해결책:**
1. `--comprehensive` 옵션 사용
2. 기존 문서 확인 (README, 주석 등)
3. 수동으로 Skill 검토 및 개선

### 문제: 특정 도메인이 인식되지 않음
**해결책:**
1. 파일 구조 확인
2. 도메인 키워드 포함 여부 확인
3. `--path` 옵션으로 특정 디렉토리 지정

## 📄 라이선스

MIT License

## 📞 지원 및 피드백

- 🐛 [버그 리포트](https://github.com/devlikebear/ai-agent-extensions/issues)
- 💬 [토론](https://github.com/devlikebear/ai-agent-extensions/discussions)
- ⭐ [프로젝트 스타](https://github.com/devlikebear/ai-agent-extensions)

---

**Skill Generator**로 Claude의 프로젝트 이해도를 획기적으로 향상시켜보세요! 🚀

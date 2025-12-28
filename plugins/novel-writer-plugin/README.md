# Novel Writer Plugin for Claude Code

장르 소설 작성을 위한 전문 도구 모음 - Claude Code 플러그인

[![Tests](https://img.shields.io/badge/tests-344%20passing-brightgreen)](https://github.com/yourusername/novel-writer-plugin)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.2.0-orange)](package.json)

## 📖 소개

Novel Writer Plugin은 소설 작가들이 Claude Code를 사용하여 창작 활동을 할 수 있도록 돕는 전문 도구 모음입니다. TDD(Test-Driven Development) 방식으로 개발되어 높은 품질과 안정성을 보장합니다.

## ✨ 특징

### 13개의 전문 명령어

**통합 워크플로우 (Phase 6-8):**
- **`/help`**: 전체 플러그인 사용법 종합 안내 및 FAQ
- **`/start`**: 소설 시작부터 완성까지 통합 워크플로우 제공 ⭐
- **`/continue`**: 중단했던 프로젝트 재개 및 컨텍스트 복원 ⭐
- **`/context`**: 작성된 콘텐츠 검색 및 참조 관리 ⭐

**기본 명령어 (Phase 2):**
- **`/plot-outline`**: 3막 구조 기반의 체계적인 플롯 개요 생성
- **`/character-profile`**: 입체적인 캐릭터 프로필 작성 (Want vs Need, Fatal Flaw)
- **`/scene-write`**: Show, Don't Tell 원칙에 따른 몰입감 있는 장면 작성
- **`/dialogue-enhance`**: 자연스럽고 캐릭터 특성이 드러나는 대화 개선
- **`/consistency-check`**: 캐릭터, 플롯, 설정의 일관성 검증

**고급 기능 (Phase 4):**
- **`/worldbuilding`**: 체계적인 세계관 구축 (지리, 역사, 문화, 시스템)
- **`/timeline`**: 시간순 사건 추적 및 일관성 검증
- **`/name-generator`**: 의미있는 캐릭터/장소 이름 생성
- **`/word-count`**: 목표 설정 및 진행 상황 추적

### 4개의 전문 에이전트

- **`genre-specialist`**: 판타지, 로맨스, 스릴러 등 장르별 전문가
- **`character-developer`**: 캐릭터 심화 개발 및 관계 설정
- **`plot-architect`**: Save the Cat, Hero's Journey 등 구조적 플롯 분석
- **`editor`**: 문법, 흐름, 가독성 검토

### 6개의 장르별 Claude Skills (Phase 7-8) ⭐

- **`Fantasy Worldbuilding`**: 마법 시스템, 종족, 정치, 신화 설계
- **`Romance Tropes`**: 로맨스 트로프 마스터 (Enemies to Lovers, Fake Dating 등)
- **`Thriller Pacing`**: 긴장감, 서스펜스, 액션 시퀀스 최적화
- **`SciFi Technology`**: FTL, AI, 우주 서식지, 미래 기술 설계
- **`Horror Atmosphere`**: 공포 조성, 괴물 디자인, 심리적 공포 기법
- **`Mystery Plotting`**: Fair Play 미스터리, 단서 배치, 반전 설계

## 설치

### Claude Code에서 직접 설치

```bash
/plugin install novel-writer@ai-agent-extensions
```

### 로컬 개발용 설치

```bash
git clone https://github.com/yourusername/novel-writer-plugin.git
cd novel-writer-plugin
npm install
```

## 🚀 사용법

### 완전한 워크플로우 예시

```bash
# 1. 플롯 구조 설계
/plot-outline 판타지 소설, 주인공은 마법을 잃은 마법사

# 2. 주요 캐릭터 개발
/character-profile 남자 주인공, 30대, 전직 대마법사
/character-profile 여자 주인공, 20대, 신참 마법사

# 3. 세계관 구축
/worldbuilding 판타지 세계, 마법 시스템 기반

# 4. 캐릭터/장소 이름 생성
/name-generator 판타지 왕국 이름
/name-generator 주인공 이름, 고풍스러운 느낌

# 5. 타임라인 작성
/timeline 3년간의 주인공 여정

# 6. 첫 장면 작성
/scene-write 오프닝 장면, 주인공이 마법을 잃는 순간

# 7. 대화 개선
/dialogue-enhance [작성한 대화]

# 8. 일관성 검증
/consistency-check 챕터 1-5

# 9. 전문 편집
"Ask editor to review chapter 1"

# 10. 진행 상황 추적
/word-count 목표: 100,000 단어, 현재: 25,000 단어
```

### 명령어 상세 사용법

#### `/plot-outline` 사용 예시
```
/plot-outline 로맨스 소설, 재회 로맨스, 30대 직장인
```

#### `/worldbuilding` 사용 예시
```
/worldbuilding SF 세계, 근미래, AI 의식 획득
```

#### `/timeline` 사용 예시
```
/timeline 7일간의 스릴러 플롯
```

#### `/name-generator` 사용 예시
```
/name-generator 현대 한국 형사 이름
```

### 에이전트 사용법

에이전트는 대화형으로 작동하며, 특정 영역의 전문가 역할을 합니다.

```bash
# 장르 전문가 활용
"Use genre-specialist to help design a dark fantasy world"

# 캐릭터 개발자 활용
"Ask character-developer to deepen my protagonist's motivation"

# 플롯 설계자 활용
"Have plot-architect structure my novel using Save the Cat"

# 편집자 활용
"Ask editor to review my chapter for grammar and flow"
```

## 🧪 테스팅

프로젝트는 TDD 방식으로 개발되어 213개의 테스트가 모두 통과합니다.

```bash
# 모든 테스트 실행
npm test

# 커버리지 리포트
npm run test:coverage

# 특정 테스트만 실행
npm test -- plot-outline.test.js
```

### 테스트 통계

- **총 테스트**: 213개
- **통과율**: 100%
- **명령어 테스트**: 173개 (Phase 2: 90개, Phase 4: 83개)
- **에이전트 테스트**: 40개 (Phase 3)

## 🛠️ 개발

### 프로젝트 구조

```
novel-writer-plugin/
├── .claude-plugin/
│   └── plugin.json          # 플러그인 메타데이터
├── commands/                 # 9개 명령어
│   ├── plot-outline.md
│   ├── character-profile.md
│   ├── scene-write.md
│   ├── dialogue-enhance.md
│   ├── consistency-check.md
│   ├── worldbuilding.md
│   ├── timeline.md
│   ├── name-generator.md
│   └── word-count.md
├── agents/                   # 4개 에이전트
│   ├── genre-specialist.md
│   ├── character-developer.md
│   ├── plot-architect.md
│   └── editor.md
├── __tests__/               # 213 테스트
│   ├── commands/
│   └── agents/
├── package.json
├── jest.config.js
├── README.md
├── CONTRIBUTING.md
└── CHANGELOG.md
```

### 기여하기

기여는 언제나 환영합니다! [CONTRIBUTING.md](CONTRIBUTING.md)를 참조해주세요.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for your changes
4. Commit your changes (`git commit -m 'feat: add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📧 연락처

- **작성자**: devlikebear
- **Email**: your@email.com
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **이슈 리포트**: [GitHub Issues](https://github.com/yourusername/novel-writer-plugin/issues)

## 🗺️ 로드맵

### v1.0.0 (Current)
- ✅ 9개 전문 명령어
- ✅ 4개 전문 에이전트
- ✅ TDD 완료 (213 tests)
- ✅ 한국어 완전 지원

### v1.1.0 (Planned)
- [ ] 영어 지원
- [ ] 캐릭터 관계 시각화
- [ ] 플롯 구조 다이어그램
- [ ] 템플릿 라이브러리

### v2.0.0 (Future)
- [ ] AI 기반 스타일 분석
- [ ] 협업 작가 기능
- [ ] 출판 준비 도구

---

**Happy Writing! 📚✨**

> "The first draft is just you telling yourself the story." - Terry Pratchett

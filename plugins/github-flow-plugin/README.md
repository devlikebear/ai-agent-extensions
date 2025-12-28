# `/github-flow` - GitHub Flow 워크플로우 자동화

GitHub Flow 전체 프로세스를 체크리스트 중심으로 자동화하는 플러그인입니다.

## 📋 주요 기능

### 이슈 관리
- Feature Request / Bug Report 템플릿 제공
- 자동 라벨 지정
- 이슈 번호 자동 추적
- **[NEW] 자동 버전 관리**: 이슈 타입에 따라 마이너/패치 버전 자동 업데이트

### 버전 관리 (자동화)
- **Feature**: 마이너 버전 업데이트 (1.0.0 → 1.1.0)
- **Bug**: 패치 버전 업데이트 (1.0.0 → 1.0.1)
- 자동 버전 감지 (package.json, pyproject.toml, Cargo.toml, build.gradle, .claude-plugin/*)
- 이슈 및 브랜치 생성 시 버전 정보 포함
- PR 병합 시 자동 릴리즈 태그 생성
- **[NEW] --release 명령어**: 수동 릴리즈 생성

### 문서 관리 (자동화)
- **[NEW] PR 생성 전 자동 문서 갱신**: `/docs --update` 명령어 지원
- **README 자동 업데이트**: 버전 및 기능 정보 반영
- **CHANGELOG 자동 갱신**: 릴리즈 노트 자동 생성
- **API 문서 갱신**: API 엔드포인트 정보 자동 업데이트
- **수동 갱신 지원**: `/docs --update` 불가 시 수동 가이드 제공
- **문서 변경 커밋**: 갱신된 문서 자동 커밋 및 푸시

### 작업 계획 수립
- 이슈 및 코드베이스 분석
- 체크리스트 중심의 작업 계획 문서 생성
- 예상 소요 시간 및 영향 범위 분석

### 브랜치 전략
- `feature/#{issue-number}-{description}` 자동 생성 (버전 포함)
- `fix/#{issue-number}-{description}` 자동 생성 (버전 포함)
- main 브랜치 최신 상태 확인

### PR 관리
- PR 제목/본문 자동 생성 (이슈 연동)
- 변경 사항 요약
- 체크리스트 포함
- 코드 변경 사항 분석 및 리뷰 코멘트 제안

### 병합 후 정리
- main 브랜치로 복귀
- `git pull origin main` 실행
- 작업 브랜치 삭제
- 원격 브랜치 정리
- **[NEW] 자동 릴리즈 태그 생성**
- **[NEW] 릴리즈 노트 자동 생성**

## 🚀 사용 방법

### 이슈 생성 (자동 버전 관리)

```bash
# Feature 요청 (마이너 버전 업데이트: 1.0.0 → 1.1.0)
/github-flow --issue-create --type feature --title "Add user profile page"

# Bug 리포트 (패치 버전 업데이트: 1.0.0 → 1.0.1)
/github-flow --issue-create --type bug --title "Fix login redirect"
```

### 작업 계획 수립

```bash
/github-flow --plan --issue 123
```

### 브랜치 생성

```bash
/github-flow --branch --issue 123
```

### PR 생성 전 문서 갱신 (자동)

```bash
# 자동 문서 갱신 (권장)
/docs --update

# 또는 수동 갱신 후 커밋
git add README.md CHANGELOG.md
git commit -m "docs: update documentation for v1.1.0"
git push origin feature/123-xxx
```

### PR 생성

```bash
/github-flow --pr-create --issue 123
```

### PR 리뷰

```bash
/github-flow --pr-review 456
```

### 병합 및 정리 (자동 릴리즈)

```bash
# PR 병합 + 자동 릴리즈 태그 생성 + 정리
/github-flow --merge-cleanup
```

### 릴리즈 관리 (수동)

```bash
# 현재 버전으로 릴리즈
/github-flow --release

# 특정 버전으로 릴리즈
/github-flow --release --version 2.0.0

# 메시지와 함께 릴리즈
/github-flow --release --version 2.0.0 --message "Major version update"
```

### 전체 워크플로우

```bash
/github-flow --full-cycle --issue 123
```

## 📖 사용 예시

### 예시 1: Feature 개발 전체 사이클

**1. 이슈 생성 (자동 버전 업데이트)**
```
/github-flow --issue-create --type feature --title "Add user profile page"
```

**출력:**
```markdown
✅ 이슈 생성 완료: #123

Title: feat: Add user profile page
Version: 1.1.0 (자동 업데이트: 1.0.0 → 1.1.0)
URL: https://github.com/user/repo/issues/123
Branch: feature/123-add-user-profile-page
Labels: feature

🎯 버전 관리
- 현재 버전: 1.0.0
- 타입: Feature (마이너 버전 업데이트)
- 새 버전: 1.1.0
- PR 병합 시 v1.1.0 태그 자동 생성
```

**2. 작업 계획 수립**
```
/github-flow --plan --issue 123
```

**출력:**
```markdown
# 작업 계획: Add user profile page (#123)

## 요구사항 요약
사용자 프로필 페이지 추가

## 영향 범위 분석
- 생성: app/profile/page.tsx, components/ProfileCard.tsx
- 수정: app/api/user/route.ts, lib/types.ts

## 작업 체크리스트
### 1. 준비 작업
- [ ] Issue #123 확인
- [ ] 관련 코드 리뷰

### 2. 개발 작업
- [ ] 브랜치 생성
- [ ] API 엔드포인트 개발
- [ ] UI 컴포넌트 개발

### 3. 테스트
- [ ] 단위 테스트 작성
- [ ] E2E 테스트

### 4. PR 및 병합
- [ ] PR 생성
- [ ] 코드 리뷰
- [ ] 병합

## 예상 소요 시간: 8시간
```

**3. 브랜치 생성**
```
/github-flow --branch --issue 123
```

**출력:**
```bash
✅ 브랜치 생성 완료

명령어 실행:
git checkout main
git pull origin main
git checkout -b feature/123-user-profile-page
git push -u origin feature/123-user-profile-page

현재 브랜치: feature/123-user-profile-page
```

**4. 개발 작업 (사용자 수행)**

**4.5. 문서 갱신**
```bash
# 자동 문서 갱신
/docs --update

# 또는 수동 갱신
# - README.md 버전 정보 업데이트
# - CHANGELOG.md에 v1.1.0 항목 추가
# - API 문서 (docs/API.md) 업데이트

git add README.md CHANGELOG.md docs/API.md
git commit -m "docs: update documentation for v1.1.0

- Update README with new features
- Add v1.1.0 entry to CHANGELOG
- Update API documentation

Closes #123"
git push origin feature/123-user-profile-page
```

**5. PR 생성**
```
/github-flow --pr-create --issue 123
```

**출력:**
```markdown
✅ PR 생성 완료: #456

Title: feat: Add user profile page
URL: https://github.com/user/repo/pull/456

PR 내용:
- Closes #123
- 프로필 페이지 컴포넌트 추가
- API 엔드포인트 구현
- 테스트 추가

리뷰어: @teammate1, @teammate2
```

**6. PR 리뷰**
```
/github-flow --pr-review 456
```

**출력:**
```markdown
## PR 리뷰 분석: #456

### 변경 사항 요약
- 파일 수: 8개
- 추가: +523 lines
- 삭제: -12 lines

### 주요 변경 파일
- app/profile/page.tsx (새 파일)
- components/ProfileCard.tsx (새 파일)
- app/api/user/route.ts (수정)

### 리뷰 코멘트 제안

**코드 품질**
✅ 컴포넌트 구조가 명확함
✅ TypeScript 타입 정의 완료
⚠️ ProfileCard에 memo 적용 고려

**테스트**
✅ 단위 테스트 추가됨
⚠️ Edge case 테스트 추가 권장

**성능**
⚠️ 이미지 최적화 필요 (Next.js Image 컴포넌트 사용)

**보안**
✅ 입력 검증 완료
✅ 인증 확인 로직 있음
```

**7. 병합 및 정리 (자동 릴리즈)**
```
/github-flow --merge-cleanup
```

**출력:**
```bash
✅ PR 병합 완료

명령어 실행:
gh pr merge 456 --squash --delete-branch
git checkout main
git pull origin main

🎯 자동 릴리즈 생성
git tag -a v1.1.0 -m "Release v1.1.0

Changes:
- feat: Add user profile page (#123)

Generated with github-flow plugin"
git push origin v1.1.0

정리:
git branch -d feature/123-user-profile-page
git remote prune origin

✅ 완료 상태
- 현재 브랜치: main
- 이슈 #123 자동 close됨
- 릴리즈 태그: v1.1.0 생성
- 릴리즈 노트: GitHub Release에 자동 생성
```

### 예시 2: Bug Fix 워크플로우 (패치 버전 업데이트)

**1. 버그 이슈 생성 (패치 버전 업데이트)**
```
/github-flow --issue-create --type bug --title "Fix login redirect issue"
```

**출력:**
```markdown
✅ 이슈 생성 완료: #124

Title: fix: Fix login redirect issue
Version: 1.0.1 (자동 업데이트: 1.0.0 → 1.0.1)
URL: https://github.com/user/repo/issues/124
Branch: fix/124-fix-login-redirect-issue
Labels: bug

🎯 버전 관리
- 현재 버전: 1.0.0
- 타입: Bug Fix (패치 버전 업데이트)
- 새 버전: 1.0.1
- PR 병합 시 v1.0.1 태그 자동 생성
```

**2. 작업 계획**
```
/github-flow --plan --issue 124
```

**출력:**
```markdown
# 작업 계획: Fix login redirect issue (#124)

## 버그 분석
로그인 후 리다이렉트가 홈페이지로 가는 문제

## 원인 분석
- app/api/auth/[...nextauth]/route.ts의 callback 설정 확인 필요
- 리다이렉트 URL 로직 검토

## 작업 체크리스트
- [ ] 브랜치 생성: fix/124-login-redirect-issue
- [ ] 버그 재현
- [ ] 원인 파악
- [ ] 수정
- [ ] 테스트 추가
- [ ] PR 생성

## 예상 소요 시간: 2시간
```

**3. 브랜치 생성**
```bash
/github-flow --branch --issue 124
```

**4. 개발 작업 (버그 수정)**
```bash
# 버그 원인 파악 및 수정
# 테스트 추가
```

**4.5. 문서 갱신**
```bash
# 자동 문서 갱신
/docs --update

# 또는 수동 갱신
git add CHANGELOG.md
git commit -m "docs: update CHANGELOG for v1.0.1

- Fix login redirect issue (#124)

Closes #124"
git push origin fix/124-fix-login-redirect-issue
```

**5. PR 생성 및 병합**
```bash
/github-flow --pr-create --issue 124
# (리뷰 후)
/github-flow --merge-cleanup
```

**결과:**
```bash
✅ PR 병합 완료
✅ 릴리즈 태그 생성: v1.0.1
✅ 이슈 #124 자동 close
```

## 🎯 GitHub Flow 원칙

### 핵심 원칙
1. main 브랜치는 항상 배포 가능한 상태
2. 새로운 작업은 main에서 브랜치 생성
3. 작업 완료 후 Pull Request 생성
4. 코드 리뷰 후 main에 병합
5. 병합 즉시 배포

### 브랜치 네이밍 컨벤션 (자동 버전 관리)
- **Feature**: `feature/{issue-number}-{description}` (마이너 버전 +1)
  - 예: `feature/123-add-dark-mode` (v1.0.0 → v1.1.0)
- **Bug Fix**: `fix/{issue-number}-{description}` (패치 버전 +1)
  - 예: `fix/124-fix-redirect` (v1.0.0 → v1.0.1)
- **Hotfix**: `hotfix/{issue-number}-{description}` (패치 버전 +1)
  - 예: `hotfix/125-critical-bug` (v1.0.0 → v1.0.1)

> 💡 **버전 관리**: 브랜치 생성 시 자동으로 버전이 업데이트되고, PR 병합 시 릴리즈 태그가 생성됩니다.

## 🛠️ GitHub CLI 필요

이 플러그인은 GitHub CLI (`gh`)를 사용합니다.

### 설치

```bash
# macOS
brew install gh

# Windows
winget install --id GitHub.cli

# Linux
sudo apt install gh
```

### 인증

```bash
gh auth login
```

## ✅ 자동 생성되는 체크리스트

### 작업 계획 체크리스트 (버전 관리 포함)
```markdown
- [ ] 버전 확인 (현재: 1.0.0)
- [ ] 이슈 생성 (자동 버전 업데이트)
- [ ] 코드베이스 분석
- [ ] 브랜치 생성 (버전 정보 포함)
- [ ] 개발 작업
- [ ] 테스트 작성
- [ ] 코드 품질 검사
- [ ] PR 생성
- [ ] 코드 리뷰
- [ ] 병합
- [ ] 릴리즈 태그 생성 (자동)
- [ ] 정리
```

### PR 체크리스트
```markdown
- [ ] 테스트 통과
- [ ] 린트/타입 체크 통과
- [ ] 문서 업데이트
- [ ] Breaking changes 없음
- [ ] 리뷰어 지정
```

## 📊 Conventional Commits 지원

커밋 메시지 자동 생성 시 Conventional Commits 형식 준수:

- `feat:` - 새로운 기능
- `fix:` - 버그 수정
- `docs:` - 문서 변경
- `style:` - 코드 포맷팅
- `refactor:` - 코드 리팩토링
- `test:` - 테스트 추가
- `chore:` - 빌드/설정 변경

## 💡 Best Practices

### ✅ 해야 할 것
- 명확한 이슈 제목 및 설명
- 작은 단위의 PR (300 lines 이하)
- 자주 커밋 및 푸시
- main 브랜치 최신 상태 유지
- 의미 있는 커밋 메시지
- 충분한 테스트 커버리지

### ❌ 하지 말아야 할 것
- main 브랜치에 직접 커밋
- 거대한 PR (500+ lines)
- 오래된 브랜치 유지 (1주일 이상)
- 리뷰 없이 병합
- 불명확한 커밋 메시지
- Breaking changes 문서화 누락

## 🔧 요구사항

- Git 저장소
- GitHub 저장소
- GitHub CLI (`gh`) 설치 및 인증
- Git 2.23+ (브랜치 생성 기능)

## 📚 추가 자료

- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [GitHub CLI Manual](https://cli.github.com/manual/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 🤝 기여

버그 리포트나 기능 제안은 [GitHub Issues](https://github.com/devlikebear/ai-agent-extensions/issues)에 등록해주세요.

## 📄 라이선스

MIT License

---
name: github-flow
description: GitHub Flow 워크플로우 전체 프로세스를 체크리스트 중심으로 자동화합니다. 이슈 생성, 작업 계획, 브랜치 관리, PR 생성/리뷰/병합까지 전체 사이클을 지원합니다.
---

# GitHub Flow - 워크플로우 자동화

당신은 GitHub Flow 전문가입니다. 이슈 생성부터 PR 병합까지 전체 워크플로우를 체크리스트 중심으로 자동화하고 안내합니다.

## GitHub Flow란?

GitHub Flow는 GitHub에서 권장하는 간단하고 효과적인 브랜치 기반 워크플로우입니다.

### 핵심 원칙
1. **main 브랜치는 항상 배포 가능한 상태 유지**
2. **새로운 작업은 main에서 브랜치 생성**
3. **작업 완료 후 Pull Request 생성**
4. **코드 리뷰 후 main에 병합**
5. **병합 즉시 배포**

## 전체 워크플로우

```
이슈 생성 → 작업 계획 → 브랜치 생성 → 개발 → PR 생성 → 리뷰 → 병합 → 정리
```

## GitHub CLI 활용

이 플러그인은 GitHub CLI (`gh`)를 적극 활용합니다.

### GitHub CLI 설치 확인

```bash
# 설치 확인
gh --version

# 인증 확인
gh auth status

# 인증 (필요시)
gh auth login
```

## 1단계: 이슈 생성

### 기능 요청 이슈 생성

```bash
gh issue create \
  --title "Add user profile page" \
  --body "## Description
새로운 사용자 프로필 페이지를 추가합니다.

## Features
- 사용자 정보 표시
- 아바타 이미지
- 프로필 수정 기능

## Acceptance Criteria
- [ ] 사용자 정보가 올바르게 표시됨
- [ ] 아바타 이미지가 로드됨
- [ ] 프로필 수정이 정상 동작함" \
  --label "feature"
```

### 버그 수정 이슈 생성

```bash
gh issue create \
  --title "Fix login redirect issue" \
  --body "## Bug Description
로그인 후 리다이렉트가 제대로 동작하지 않습니다.

## Steps to Reproduce
1. 로그인 페이지 접속
2. 올바른 credentials 입력
3. 로그인 버튼 클릭

## Expected Behavior
대시보드로 리다이렉트되어야 함

## Actual Behavior
홈페이지로 리다이렉트됨

## Environment
- Browser: Chrome 120
- OS: macOS 14" \
  --label "bug"
```

### 이슈 템플릿

**Feature Request:**
```markdown
## Description
[기능에 대한 간단한 설명]

## Motivation
[왜 이 기능이 필요한가?]

## Proposed Solution
[제안하는 해결 방법]

## Acceptance Criteria
- [ ] 기준 1
- [ ] 기준 2
- [ ] 기준 3

## Additional Context
[추가 정보, 스크린샷 등]
```

**Bug Report:**
```markdown
## Bug Description
[버그에 대한 명확한 설명]

## Steps to Reproduce
1. [첫 번째 단계]
2. [두 번째 단계]
3. [세 번째 단계]

## Expected Behavior
[예상되는 동작]

## Actual Behavior
[실제 발생하는 동작]

## Environment
- Browser/Node version:
- OS:
- Additional info:

## Screenshots
[해당되는 경우 스크린샷 추가]
```

## 2단계: 작업 계획 수립

이슈와 코드베이스를 분석하여 체크리스트 중심의 작업 계획을 생성합니다.

### 작업 계획 프로세스

1. **이슈 내용 분석**
   - 요구사항 파악
   - Acceptance Criteria 확인
   - 우선순위 결정

2. **코드베이스 분석**
   - 관련 파일 탐색
   - 기존 패턴 확인
   - 의존성 파악

3. **영향 범위 분석**
   - 변경이 필요한 파일 목록
   - 영향받는 컴포넌트/모듈
   - 테스트가 필요한 영역

4. **작업 계획 문서 생성**

```markdown
# 작업 계획: Add user profile page (#123)

## 요구사항 요약
사용자 프로필 페이지를 추가하여 사용자 정보를 표시하고 수정할 수 있도록 함

## 영향 범위 분석

### 생성할 파일
- `app/profile/page.tsx` - 프로필 페이지
- `components/ProfileCard.tsx` - 프로필 카드 컴포넌트
- `components/ProfileEditForm.tsx` - 프로필 수정 폼
- `__tests__/ProfileCard.test.tsx` - 단위 테스트

### 수정할 파일
- `app/api/user/route.ts` - 프로필 조회 API 추가
- `lib/types.ts` - User 타입 확장

### 영향받는 영역
- 사용자 인증 시스템
- 라우팅
- API 엔드포인트

## 작업 체크리스트

### 1. 준비 작업
- [ ] Issue #123 확인
- [ ] 관련 코드 리뷰
- [ ] 디자인 시스템 확인

### 2. 개발 작업
- [ ] 브랜치 생성: `feature/123-user-profile-page`
- [ ] API 엔드포인트 개발
  - [ ] GET /api/user/:id
  - [ ] PATCH /api/user/:id
- [ ] 프로필 페이지 컴포넌트 개발
  - [ ] ProfileCard 컴포넌트
  - [ ] ProfileEditForm 컴포넌트
  - [ ] 프로필 페이지 레이아웃
- [ ] 타입 정의 추가

### 3. 테스트
- [ ] 단위 테스트 작성
  - [ ] ProfileCard 테스트
  - [ ] ProfileEditForm 테스트
  - [ ] API 엔드포인트 테스트
- [ ] E2E 테스트
  - [ ] 프로필 조회 시나리오
  - [ ] 프로필 수정 시나리오
- [ ] 테스트 실행 및 통과 확인

### 4. 코드 품질
- [ ] ESLint 검사
- [ ] TypeScript 타입 체크
- [ ] 코드 포맷팅 (Prettier)

### 5. 문서화
- [ ] 컴포넌트 주석 추가
- [ ] API 문서 업데이트
- [ ] CHANGELOG 항목 추가

### 6. PR 및 병합
- [ ] PR 생성
- [ ] 코드 리뷰 요청
- [ ] 리뷰 피드백 반영
- [ ] main 브랜치 병합
- [ ] 브랜치 정리

## 예상 소요 시간
- API 개발: 2시간
- UI 컴포넌트: 3시간
- 테스트: 2시간
- 리뷰 및 수정: 1시간
- **총 예상: 8시간**

## 주의사항
- 기존 사용자 데이터 마이그레이션 불필요
- 아바타 이미지는 Gravatar 사용
- 프로필 공개 범위 설정 고려 (추후 구현)
```

## 3단계: 브랜치 생성

### 브랜치 네이밍 컨벤션

- **Feature**: `feature/{issue-number}-{short-description}`
- **Bug Fix**: `fix/{issue-number}-{short-description}`
- **Hotfix**: `hotfix/{issue-number}-{short-description}`

### 브랜치 생성 및 전환

```bash
# main이 최신 상태인지 확인
git checkout main
git pull origin main

# 새 브랜치 생성
git checkout -b feature/123-user-profile-page

# 브랜치 푸시 (upstream 설정)
git push -u origin feature/123-user-profile-page
```

### 이슈 번호와 자동 연동

브랜치명에 이슈 번호를 포함하면 GitHub이 자동으로 연결합니다.

## 4단계: 개발 작업 수행

작업 계획의 체크리스트를 따라 개발을 진행합니다.

### 커밋 컨벤션 (Conventional Commits)

```bash
# Feature
git commit -m "feat(profile): add user profile page component"

# Bug Fix
git commit -m "fix(auth): resolve login redirect issue"

# Documentation
git commit -m "docs(api): update profile endpoint documentation"

# Test
git commit -m "test(profile): add ProfileCard component tests"

# Refactor
git commit -m "refactor(profile): extract profile logic to custom hook"
```

### 작은 단위로 자주 커밋

```bash
# 좋은 예: 논리적 단위로 커밋
git add app/profile/page.tsx
git commit -m "feat(profile): add profile page layout"

git add components/ProfileCard.tsx
git commit -m "feat(profile): add ProfileCard component"

git add __tests__/ProfileCard.test.tsx
git commit -m "test(profile): add ProfileCard tests"
```

## 4.5단계: PR 생성 전 문서 갱신

PR을 생성하기 전에 프로젝트 문서를 최신 상태로 갱신합니다.

### 자동 문서 갱신 (권장)

```bash
# Claude Code 문서 갱신 플러그인 사용
/docs --update
```

위 명령어가 지원되면 다음을 자동으로 수행합니다:
- API 문서 업데이트
- README 파일 갱신
- CHANGELOG 항목 추가
- 버전 정보 동기화

### 수동 문서 갱신

`/docs --update`가 사용 불가능한 경우 수동으로 문서를 갱신합니다:

#### 1. 문서 파일 검색

```bash
# API 문서 찾기
find . -name "API*" -o -name "*api*" -o -name "docs/*" | grep -E "\.(md|rst|txt)$"

# README 찾기
find . -name "README*" -o -name "readme*"

# CHANGELOG 찾기
find . -name "CHANGELOG*" -o -name "CHANGES*" -o -name "HISTORY*"
```

#### 2. 각 문서 갱신

**README.md 갱신:**
```markdown
## 새로운 기능

### v1.1.0 (Feature)
- Add dark mode support (#123)
- 새로운 기능 설명

### v1.0.1 (Bug Fix)
- Fix login redirect issue (#124)
- 버그 수정 내용
```

**CHANGELOG.md 갱신:**
```markdown
# Changelog

## [1.1.0] - 2024-10-19

### Added
- Add dark mode support (#123)
- 새로운 기능 1
- 새로운 기능 2

### Fixed
- Fix login redirect issue (#124)

### Changed
- 변경사항 1

---

## [1.0.1] - 2024-10-18

### Fixed
- Critical bug fix (#122)
```

**API 문서 (docs/API.md) 갱신:**
```markdown
# API Documentation

## v1.1.0 New Endpoints

### GET /api/themes
프로필 테마 조회
- Response: `{ themes: Theme[] }`

### PATCH /api/user/:id/theme
사용자 테마 변경
- Body: `{ themeId: string }`
- Response: `{ success: boolean }`
```

#### 3. 문서 변경 커밋

```bash
# 변경된 문서 추가
git add README.md CHANGELOG.md docs/API.md

# 문서 갱신 커밋
git commit -m "docs: update documentation for v1.1.0

- Update README with new features
- Add v1.1.0 entry to CHANGELOG
- Update API documentation

Closes #[issue-number]"

# 원격에 푸시
git push origin feature/123-add-dark-mode-support
```

### 문서 갱신 체크리스트

```markdown
## 문서 갱신 확인 목록
- [ ] `/docs --update` 실행 또는 수동 갱신 완료
- [ ] README.md 버전 정보 업데이트
- [ ] CHANGELOG.md에 새로운 버전 항목 추가
- [ ] API 문서 (있는 경우) 업데이트
- [ ] 문서 파일 커밋
- [ ] 브랜치에 푸시
- [ ] PR에 문서 갱신 내용 포함
```

## 5단계: Pull Request 생성

### PR 생성

```bash
gh pr create \
  --title "feat: Add user profile page" \
  --body "$(cat <<'EOF'
## Summary
Closes #123

사용자 프로필 페이지를 추가합니다.

## Changes
- ✨ 프로필 페이지 컴포넌트 추가
- 🔧 프로필 조회/수정 API 엔드포인트
- 🧪 단위 테스트 및 E2E 테스트
- 📝 API 문서 업데이트

## Screenshots
[프로필 페이지 스크린샷]

## Checklist
- [x] 테스트 작성 및 통과
- [x] 린트/타입 체크 통과
- [x] 문서 업데이트
- [x] Breaking changes 없음

## Related Issues
- Closes #123

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)" \
  --assignee "@me" \
  --label "feature"
```

### PR 템플릿

```markdown
## Summary
Closes #[issue-number]

[PR에 대한 간단한 설명]

## Type of Change
- [ ] Bug fix (버그 수정)
- [ ] New feature (새로운 기능)
- [ ] Breaking change (기존 기능 변경)
- [ ] Documentation update (문서 업데이트)

## Changes
- [변경 사항 1]
- [변경 사항 2]
- [변경 사항 3]

## Testing
- [x] 단위 테스트 추가/업데이트
- [x] 모든 테스트 통과
- [x] 수동 테스트 완료

## Checklist
- [x] 코드가 스타일 가이드를 따름
- [x] 자기 리뷰 완료
- [x] 주석 추가 (복잡한 로직)
- [x] 문서 업데이트
- [x] Breaking changes 문서화

## Screenshots (선택사항)
[스크린샷 추가]

## Related Issues
- Closes #[issue-number]
```

## 6단계: PR 리뷰

### PR 리뷰 요청

```bash
# 특정 사용자에게 리뷰 요청
gh pr edit --add-reviewer username1,username2

# 팀에게 리뷰 요청
gh pr edit --add-reviewer team-name
```

### 코드 변경 사항 분석

```bash
# PR의 변경 사항 확인
gh pr diff

# PR의 파일 목록
gh pr view --json files

# PR 상태 확인
gh pr view
```

### 리뷰 코멘트 제안

PR 분석 후 다음 관점에서 리뷰 코멘트를 제안합니다:

1. **코드 품질**
   - 가독성
   - 유지보수성
   - DRY 원칙
   - SOLID 원칙

2. **보안**
   - 입력 검증
   - 인증/권한
   - 민감 정보 노출

3. **성능**
   - 불필요한 re-render
   - N+1 쿼리
   - 메모리 누수

4. **테스트**
   - 테스트 커버리지
   - Edge case
   - 테스트 품질

### 피드백 반영

```bash
# 피드백에 따라 코드 수정
git add .
git commit -m "refactor(profile): apply code review feedback"
git push
```

## 7단계: PR 병합

### 병합 전 최종 체크리스트

```markdown
## 병합 전 체크리스트
- [ ] 모든 CI 검사 통과
- [ ] 최소 1명 이상의 Approve
- [ ] 충돌 해결 완료
- [ ] main 브랜치 최신 상태 반영
- [ ] 문서 업데이트 완료
```

### PR 병합

```bash
# Squash and Merge (권장)
gh pr merge --squash --delete-branch

# Merge Commit
gh pr merge --merge --delete-branch

# Rebase and Merge
gh pr merge --rebase --delete-branch
```

### 병합 후 이슈 자동 close

PR 본문에 `Closes #123` 포함 시 자동으로 이슈가 닫힙니다.

## 8단계: 병합 후 정리

### main 브랜치 복귀 및 최신화

```bash
# main 브랜치로 전환
git checkout main

# 최신 변경 사항 가져오기
git pull origin main

# 원격 브랜치 정리
git remote prune origin
```

### 로컬 브랜치 삭제

```bash
# 병합된 브랜치 삭제
git branch -d feature/123-user-profile-page

# 강제 삭제 (필요시)
git branch -D feature/123-user-profile-page
```

### 병합된 브랜치 확인

```bash
# 병합된 브랜치 목록
git branch --merged

# 병합 안 된 브랜치 목록
git branch --no-merged
```

## 자동화된 워크플로우

### 전체 워크플로우 한 번에 실행

```bash
/github-flow --full-cycle --issue 123
```

위 명령어로 다음을 자동 수행:
1. 이슈 #123 분석
2. 작업 계획 생성
3. 브랜치 생성
4. 개발 작업 (사용자가 수행)
5. 테스트 및 코드 품질 검사
6. **문서 갱신** (`/docs --update` 또는 수동 갱신)
7. 문서 변경 커밋
8. 리모트에 푸시
9. PR 생성
10. 리뷰 (사용자가 수행)
11. 병합
12. 릴리즈 태그 생성 (자동)
13. 정리

### 수동 단계별 워크플로우

```bash
# 1. 이슈 생성 (자동 버전 관리)
/github-flow --issue-create --type feature --title "Add dark mode support"

# 2. 작업 계획 수립
/github-flow --plan --issue 123

# 3. 브랜치 생성
/github-flow --branch --issue 123

# 4. 개발 작업 수행 (사용자)
# ... 코드 작성, 테스트, 커밋 ...

# 5. PR 생성 전 문서 갱신
/docs --update
# 또는 수동 갱신 후 커밋
git add README.md CHANGELOG.md
git commit -m "docs: update documentation for v1.1.0"
git push origin feature/123-add-dark-mode-support

# 6. PR 생성
/github-flow --pr-create --issue 123

# 7. PR 리뷰 (사용자/팀)
/github-flow --pr-review 456

# 8. PR 병합 + 릴리즈 (자동 버전 태그 생성)
/github-flow --merge-cleanup
```

## 버전 관리 자동화

이 플러그인은 이슈 타입에 따라 자동으로 버전을 관리합니다.

### 버전 관리 규칙

- **Feature 이슈** (`--type feature`): 마이너 버전 업데이트
  - 예: 1.0.0 → 1.1.0
  - 이슈와 브랜치 생성 시 새 버전과 함께 생성
  - PR 병합 시 자동으로 릴리즈 태그 생성

- **Bug 이슈** (`--type bug`): 패치 버전 업데이트
  - 예: 1.0.0 → 1.0.1
  - 이슈와 브랜치 생성 시 새 버전과 함께 생성
  - PR 병합 시 자동으로 릴리즈 태그 생성

### 프로젝트 버전 자동 감지

플러그인은 다음 파일에서 자동으로 현재 버전을 감지합니다:
- `package.json` (Node.js 프로젝트)
- `pyproject.toml` (Python 프로젝트)
- `Cargo.toml` (Rust 프로젝트)
- `build.gradle` (Java/Kotlin 프로젝트)
- `.claude-plugin/plugin.json` (Claude Code Plugin)
- `.claude-plugin/marketplace.json` (Claude Code Plugin)

### 예시: Feature 이슈 생성 및 버전 업데이트

```bash
# package.json 버전: 1.0.0
/github-flow --issue-create --type feature --title "Add dark mode support"
```

**자동 수행 내용:**
1. 현재 버전 감지: 1.0.0
2. 마이너 버전 업데이트: 1.0.0 → 1.1.0
3. 이슈 생성: "feat: Add dark mode support [v1.1.0]"
4. 브랜치 생성: `feature/123-add-dark-mode-support`
5. 이슈 본문에 버전 정보 포함

**출력:**
```markdown
✅ 이슈 생성 완료: #123

Title: feat: Add dark mode support
Version: 1.1.0
URL: https://github.com/user/repo/issues/123
Branch: feature/123-add-dark-mode-support
Labels: feature
```

### 예시: Bug 이슈 생성 및 버전 업데이트

```bash
# package.json 버전: 1.0.0
/github-flow --issue-create --type bug --title "Fix login redirect issue"
```

**자동 수행 내용:**
1. 현재 버전 감지: 1.0.0
2. 패치 버전 업데이트: 1.0.0 → 1.0.1
3. 이슈 생성: "fix: Fix login redirect issue [v1.0.1]"
4. 브랜치 생성: `fix/124-fix-login-redirect-issue`
5. 이슈 본문에 버전 정보 포함

**출력:**
```markdown
✅ 이슈 생성 완료: #124

Title: fix: Fix login redirect issue
Version: 1.0.1
URL: https://github.com/user/repo/issues/124
Branch: fix/124-fix-login-redirect-issue
Labels: bug
```

### PR 병합 시 자동 릴리즈

PR 병합 완료 후 자동으로 릴리즈 태그가 생성됩니다.

```bash
/github-flow --merge-cleanup
```

**자동 수행 내용:**
1. PR 병합 (squash)
2. 이슈 자동 close
3. 버전 태그 생성: `v1.1.0` (또는 `v1.0.1`)
4. 릴리즈 노트 생성
5. 브랜치 정리
6. main 브랜치로 복귀

## 릴리즈 관리 (`--release`)

### 수동 릴리즈 생성

특정 버전으로 릴리즈 태그를 생성합니다.

```bash
# 현재 버전으로 릴리즈
/github-flow --release

# 특정 버전으로 릴리즈
/github-flow --release --version 2.0.0

# 메시지와 함께 릴리즈
/github-flow --release --version 2.0.0 --message "Major version update with breaking changes"
```

### 릴리즈 태그 자동 생성

플러그인은 다음과 같이 릴리즈 태그를 생성합니다:

```bash
git tag -a v1.1.0 -m "Release v1.1.0

Changes:
- Add dark mode support (#123)

Generated with github-flow plugin"
git push origin v1.1.0
```

### 릴리즈 노트 생성

PR 병합 시 자동으로 생성되는 릴리즈 노트 템플릿:

```markdown
# Release v1.1.0

## 🎉 New Features
- Add dark mode support (#123)

## 🐛 Bug Fixes
- Fix login redirect issue (#124)

## 📝 Documentation
- Update API documentation (#125)

## 🔄 Changes
- 2 feature additions
- 1 bug fix
- Changelog updated

---
Generated by [github-flow](https://github.com/devlikebear/ai-agent-extensions)
```

### 전체 버전 관리 워크플로우

```
이슈 생성 (v1.1.0)
    ↓
브랜치 생성 (feature/123-xxx)
    ↓
개발 작업
    ↓
PR 생성
    ↓
PR 병합
    ↓
릴리즈 태그 생성 (v1.1.0)
    ↓
릴리즈 노트 생성
    ↓
main 브랜치 정리
```

## 사용 예시

### 이슈 생성 (버전 관리 포함)
```bash
/github-flow --issue-create --type feature --title "Add dark mode support"
```

### Feature 버전 업데이트 (마이너)
```bash
/github-flow --issue-create --type feature --title "Add user profile page"
# 1.0.0 → 1.1.0
```

### Bug 버전 업데이트 (패치)
```bash
/github-flow --issue-create --type bug --title "Fix login redirect issue"
# 1.0.0 → 1.0.1
```

### 수동 릴리즈 생성
```bash
/github-flow --release --version 2.0.0
```

### 현재 버전으로 릴리즈
```bash
/github-flow --release
```

### 작업 계획 수립
```bash
/github-flow --plan --issue 123
```

### 브랜치 생성
```bash
/github-flow --branch --issue 123
```

### PR 생성
```bash
/github-flow --pr-create --issue 123
```

### PR 리뷰 분석
```bash
/github-flow --pr-review 456
```

### 병합 및 정리
```bash
/github-flow --merge-cleanup
```

## GitHub CLI 명령어 치트시트

```bash
# 이슈
gh issue create                 # 이슈 생성
gh issue list                   # 이슈 목록
gh issue view 123               # 이슈 조회

# PR
gh pr create                    # PR 생성
gh pr list                      # PR 목록
gh pr view 456                  # PR 조회
gh pr diff                      # PR diff 보기
gh pr checks                    # PR 검사 상태
gh pr review                    # PR 리뷰
gh pr merge                     # PR 병합

# 저장소
gh repo view                    # 저장소 정보
gh repo clone                   # 저장소 클론

# 워크플로우
gh workflow list                # 워크플로우 목록
gh workflow view                # 워크플로우 조회
gh run list                     # 실행 목록
gh run view                     # 실행 조회
```

## Best Practices

### ✅ 해야 할 것
- 명확한 이슈 제목 및 설명
- 작은 단위의 PR
- 자주 커밋 및 푸시
- main 브랜치 최신 상태 유지
- 의미 있는 커밋 메시지
- 충분한 테스트 커버리지

### ❌ 하지 말아야 할 것
- main 브랜치에 직접 커밋
- 거대한 PR (500+ lines)
- 오래된 브랜치 유지
- 리뷰 없이 병합
- 불명확한 커밋 메시지
- Breaking changes 문서화 누락

## 트러블슈팅

### 브랜치 충돌 해결

```bash
# main 최신 변경사항 가져오기
git checkout main
git pull origin main

# 작업 브랜치로 돌아가기
git checkout feature/123-user-profile-page

# main 변경사항 병합
git merge main

# 충돌 해결 후
git add .
git commit -m "chore: resolve merge conflicts"
git push
```

### GitHub CLI 인증 문제

```bash
# 로그아웃
gh auth logout

# 재인증
gh auth login

# 토큰 확인
gh auth status
```

## 마무리

GitHub Flow로 체계적인 협업을 시작하세요!

**핵심 포인트:**
- 📋 체크리스트 중심 작업
- 🔄 지속적인 통합 및 배포
- 👥 코드 리뷰 문화
- 🚀 빠른 피드백 사이클

지금 GitHub Flow 워크플로우를 시작하세요!

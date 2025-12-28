# `/tdd-workflow` - AI를 위한 TDD 워크플로우

Kent Beck의 TDD(Test-Driven Development) 원칙을 따라 Next.js 웹 서비스를 체계적으로 개발하는 워크플로우 플러그인입니다.

## 📋 주요 기능

### Red-Green-Refactor 사이클 자동화
- **Red**: 실패하는 테스트 먼저 작성
- **Green**: 테스트를 통과하는 최소한의 코드 작성
- **Refactor**: 코드 개선 및 리팩토링

### Next.js 특화 테스트 전략
- React 컴포넌트 테스트 (Testing Library)
- API 라우트 테스트
- Server/Client 컴포넌트 구분 테스트
- App Router & Pages Router 지원

### 워크플로우 단계별 가이드
1. 요구사항 분석
2. 테스트 케이스 정의
3. 실패하는 테스트 작성 (Red)
4. 최소 구현 (Green)
5. 리팩토링 (Refactor)
6. 테스트 커버리지 확인

## 🚀 사용 방법

### 기본 사용
```bash
/tdd-workflow "Add user authentication feature"
```

### 특정 기능 개발
```bash
/tdd-workflow --feature "Shopping cart" --type component
```

### 리팩토링
```bash
/tdd-workflow --refactor src/components/Header.tsx
```

## 📖 사용 예시

### 예시 1: 사용자 프로필 컴포넌트

**입력:**
```
/tdd-workflow "Create UserProfile component that displays name and email"
```

**출력:**

#### 🔴 Red: 테스트 작성
```typescript
// __tests__/UserProfile.test.tsx
import { render, screen } from '@testing-library/react';
import UserProfile from '@/components/UserProfile';

describe('UserProfile', () => {
  it('should display user name', () => {
    const user = { name: 'John Doe', email: 'john@example.com' };
    render(<UserProfile user={user} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
```

#### ✅ Green: 최소 구현
```typescript
// components/UserProfile.tsx
interface UserProfileProps {
  user: {
    name: string;
    email: string;
  };
}

export default function UserProfile({ user }: UserProfileProps) {
  return <div>{user.name}</div>;
}
```

#### 🔄 Refactor: 리팩토링
```typescript
// components/UserProfile.tsx (개선)
interface User {
  name: string;
  email: string;
}

interface UserProfileProps {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <article className="user-profile">
      <h1 className="user-profile__name">{user.name}</h1>
      <p className="user-profile__email">{user.email}</p>
    </article>
  );
}
```

### 예시 2: API Route

**입력:**
```
/tdd-workflow "Create GET /api/users endpoint"
```

**출력:**

#### 🔴 Red: 테스트 작성
```typescript
// __tests__/api/users.test.ts
import { GET } from '@/app/api/users/route';

describe('GET /api/users', () => {
  it('should return list of users', async () => {
    const request = new Request('http://localhost:3000/api/users');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });
});
```

#### ✅ Green: 최소 구현
```typescript
// app/api/users/route.ts
export async function GET(request: Request) {
  return Response.json([]);
}
```

#### 🔄 Refactor: 리팩토링
```typescript
// app/api/users/route.ts (개선)
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const users = await db.users.findMany();
    return Response.json(users);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
```

## 🎯 TDD 원칙

### Kent Beck의 3법칙
1. 실패하는 테스트를 먼저 작성
2. 테스트를 통과하는 최소한의 코드 작성
3. 코드를 개선하고 리팩토링

### 추가 원칙
- 한 번에 하나의 테스트만 작성
- 테스트는 빠르게 실행되어야 함
- 테스트는 독립적이어야 함
- 프로덕션 코드보다 테스트 코드를 먼저 작성

## 🧪 지원하는 테스트 프레임워크

- **Jest**: 가장 널리 사용되는 테스트 프레임워크
- **Vitest**: 빠른 실행 속도의 현대적 테스트 프레임워크
- **Playwright**: E2E 테스트
- **React Testing Library**: React 컴포넌트 테스트

## ✅ 체크리스트 자동 생성

각 작업마다 다음과 같은 체크리스트를 자동으로 생성합니다:

```markdown
## TDD 체크리스트

### 요구사항 분석
- [ ] 기능 요구사항 명확화
- [ ] 테스트 가능한 단위로 분해
- [ ] 우선순위 결정

### Red: 테스트 작성
- [ ] 테스트 케이스 정의
- [ ] 실패하는 테스트 작성
- [ ] 테스트 실행 및 실패 확인

### Green: 최소 구현
- [ ] 테스트를 통과하는 최소 코드 작성
- [ ] 테스트 실행 및 통과 확인

### Refactor: 리팩토링
- [ ] 코드 개선 (DRY, SOLID 원칙 적용)
- [ ] 테스트 재실행 (여전히 통과하는지 확인)
- [ ] 커버리지 확인
```

## 📊 테스트 커버리지 목표

- **라인 커버리지**: 80% 이상
- **브랜치 커버리지**: 75% 이상
- **함수 커버리지**: 80% 이상

## 💡 Best Practices

### ✅ 해야 할 것
- 항상 Red → Green → Refactor 순서 준수
- 작은 단위로 점진적 개발
- 각 단계마다 테스트 실행
- 리팩토링 후 테스트 재실행
- 커밋 전 전체 테스트 실행

### ❌ 하지 말아야 할 것
- 테스트 없이 프로덕션 코드 작성
- 여러 개의 테스트를 한 번에 작성
- 실패하지 않는 테스트 작성
- 테스트를 통과시키기 위해 과도한 코드 작성
- 리팩토링 중 새로운 기능 추가

## 🔧 요구사항

- Next.js 12+ (App Router 또는 Pages Router)
- Node.js 18+
- 테스트 프레임워크 (Jest, Vitest, Playwright 중 하나)
- React Testing Library (권장)

## 📚 추가 자료

- [Kent Beck - Test Driven Development: By Example](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530)
- [Next.js Testing Documentation](https://nextjs.org/docs/testing)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 🤝 기여

버그 리포트나 기능 제안은 [GitHub Issues](https://github.com/devlikebear/ai-agent-extensions/issues)에 등록해주세요.

## 📄 라이선스

MIT License

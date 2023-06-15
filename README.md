# TypeScript Dependency Injection


[microsoft/tsyringe](https://github.com/microsoft/tsyringe) を利用してインタフェース、値に DI する。

## ライブラリについて

- Constructor Injection を可能にする軽量 DI ライブラリ
- InjectorToken: DI コンテナのキー
- Provider: Token に紐づくインスタンスを提供する

## コードサンプル

抽象化した情報

- 環境情報 (development, staging, production)
- データ保存


```typescript
interface Environment {
  env: 'dev' | 'stg' | 'prod'
  api: string
}

const LOCAL: Environment = {
  env: 'dev',
  api: 'http://localhost:9000'
}

const STAGING: Environment = {
  env: 'stg',
  api: 'xxx'
}

const PRODUCTION: Environment = {
  env: 'prod',
  api: 'yyy'
}
```

```typescript
interface User {
  name: string
}

interface UserRepository {
  env: Environment
  save(user: User): Promise<void>
}

class NopUserRepository implements UserRepository {
  constructor(
    private @inject(INJECTOR_TOKEN.ENVIRONMENT) env: Environment
  ) {}
  ...
}

class MockUserRepository implements UserRepository {
  constructor(
    private @inject(INJECTOR_TOKEN.ENVIRONMENT) env: Environment
  ) {}
  ...
}
```

```typescript
@singleton()
class UserService {
  constructor(
    private @inject(INJECTOR_TOKEN.USER_REPOSITORY) repository: UserRepository
  ) {}

  save() {
    const user = { name: 'hoge' } as User
    this.repository.save(user)
  }
}
```

```typescript
container.register<Environment>(INJECTOR_TOKEN.ENVIRONMENT, { useValue: LOCAL })
container.register<UserRepository>(INJECTOR_TOKEN.USER_REPOSITORY, { useClass: MockUserRepository })
const userService = container.resolve(UserService)
userService.save()
```

```sh
npx tsc
node ./dist/index.js
```

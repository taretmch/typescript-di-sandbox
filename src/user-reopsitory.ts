import { inject, injectable } from 'tsyringe'

import { Environment }    from './environment'
import { User }           from './user'
import { INJECTOR_TOKEN } from './injector-token'

export interface UserRepository {
  env: Environment
  save(user: User): Promise<void>
}

@injectable()
export class NopUserRepository implements UserRepository {

  env: Environment

  constructor(
    @inject(INJECTOR_TOKEN.ENVIRONMENT) env: Environment
  ) {
    this.env = env
  }

  save(user: User): Promise<void> {
    console.log('no operation')
    console.log('environment: ', this.env.env)
    return new Promise(() => {})
  }
}

@injectable()
export class MockUserRepository implements UserRepository {

  env: Environment

  constructor(
    @inject(INJECTOR_TOKEN.ENVIRONMENT) env: Environment
  ) {
    this.env = env
  }

  save(user: User): Promise<void> {
    console.log('mock!')
    console.log('save user ', user, ' to: ', this.env.api)
    return new Promise(() => {})
  }
}

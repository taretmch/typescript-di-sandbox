import { inject, singleton } from 'tsyringe'

import { INJECTOR_TOKEN } from './injector-token'
import { User }           from './user'
import { UserRepository } from './user-reopsitory'

@singleton()
export class UserService {
  constructor(
    @inject(INJECTOR_TOKEN.USER_REPOSITORY) private repository: UserRepository
  ) {}

  save() {
    const user = { name: 'hoge' } as User
    this.repository.save(user)
  }
}


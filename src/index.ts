import "reflect-metadata"
import { container }                          from 'tsyringe'
import { Environment, LOCAL }                 from './environment'
import { INJECTOR_TOKEN }                     from './injector-token'
import { MockUserRepository, UserRepository } from './user-reopsitory'
import { UserService }                        from './user-service'

container.register<Environment>(INJECTOR_TOKEN.ENVIRONMENT, { useValue: LOCAL })
container.register<UserRepository>(INJECTOR_TOKEN.USER_REPOSITORY, { useClass: MockUserRepository })
const userService = container.resolve(UserService)
userService.save()

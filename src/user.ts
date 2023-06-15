export namespace User {
  export type Id  = number
}

export interface User {
  id: User.Id
  name: string
}

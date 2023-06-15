export interface Environment {
  env: 'dev' | 'stg' | 'prod'
  api: string
}

export const LOCAL: Environment = {
  env: 'dev',
  api: 'http://localhost:9000'
}

export const STAGING: Environment = {
  env: 'stg',
  api: 'xxx'
}

export const PRODUCTION: Environment = {
  env: 'prod',
  api: 'yyy'
}

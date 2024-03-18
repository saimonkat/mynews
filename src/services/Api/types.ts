export type TMethods = 'GET' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type TRoute = {
  path: string
  method: TMethods
}

export type TRoutes =
  // Auth
  'auth'

export type TParams = {
  [key: string]: any
}

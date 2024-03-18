import { TRoute, TRoutes } from './types'

const routes: Record<TRoutes, TRoute> = {
  // Auth
  auth: {
    path: '/auth',
    method: 'POST',
  },
}

export { routes }

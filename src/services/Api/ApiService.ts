import { Provider } from '@/facades'
import { routes } from './consts'
import { TParams, TRoutes } from './types'

interface QueryProps {
  route: TRoutes
  params: TParams
  throttle?: number
  revalidate?: number
}

let throttles: Array<TRoutes> = []

const query = async ({ route, params, throttle, revalidate }: QueryProps): Promise<Response> => {
  if (throttles.find(elem => elem === route)) throw new Error('Throttle')
  const apiUrl = process?.env?.NEXT_PUBLIC_API_URL ?? ''
  const method = routes[route]['method']
  let url = apiUrl + (await prepareParamsForPath(routes[route]['path'], params))
  let body = null

  if (method === 'GET') {
    url += await prepareParamsForGet(params)
  } else {
    body = await prepareParamsForPost(params)
  }

  const headers = {
    'Content-Type': 'application/json',
  }

  const { authFacade } = Provider()
  const { authData } = await authFacade()

  if (authData().accessToken) Object.assign(headers, { Authorization: authData().accessToken })

  const response = await fetch(url, {
    method,
    mode: 'cors',
    headers,
    body,
    next: { revalidate, tags: [route] },
  })

  if (response.status < 200 || response.status > 300) {
    throw new Error(response.status.toString())
  }

  if (throttle) {
    throttles.push(route)
    setTimeout(() => {
      throttles.splice(
        throttles.findIndex(elem => elem === route),
        1,
      )
    }, throttle)
  }

  return response
}

const prepareParamsForGet = async (params: TParams): Promise<string> => {
  const prepareObject = (data: any): Array<string> => {
    let params: Array<string> = []
    for (const key in data) {
      if (typeof data[key] === 'object') {
        for (const param of prepareObject(data[key])) {
          params.push('[' + key + ']' + param)
        }
      } else {
        params.push('[' + key + ']=' + data[key])
      }
    }
    return params
  }
  let paramsArray = []
  for (const key in params) {
    if (!params[key]) continue
    if (typeof params[key] === 'object') {
      for (const param of prepareObject(params[key])) {
        paramsArray.push(key + param)
      }
    } else {
      paramsArray.push(key + '=' + params[key])
    }
  }
  if (paramsArray.length > 0) return '?' + paramsArray.join('&')
  return ''
}

const prepareParamsForPost = async (params: TParams): Promise<string> => {
  return JSON.stringify(params)
}

const prepareParamsForPath = async (path: string, params: TParams): Promise<string> => {
  const matches = path.match(/\{(.+?)\}/g)
  if (matches) {
    for (const match of matches) {
      const name = match.slice(1, -1)
      if (!params[name]) throw new Error(`Required parameter ${name} is missing`)
      path = path.replace(match, params[name])
    }
  }
  return path
}

export { query }

'use client'

import { query } from '../Api'
import { login } from './AuthService'
import { LoginByIdentificatorProps, TAuth } from './types'

const loginByIdentificator = async ({
  identificator,
}: LoginByIdentificatorProps): Promise<TAuth> => {
  const response = await query({
    route: 'auth',
    params: {
      identificator,
    },
  })

  const data = await response.json()

  return await login(data)
}

export { loginByIdentificator }

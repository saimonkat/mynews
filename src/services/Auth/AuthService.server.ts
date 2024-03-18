'use server'

import jwt from 'jsonwebtoken'
import { login } from './AuthService'
import { LoginByIdentificatorProps, TAuth } from './types'

const loginByIdentificator = async ({
  identificator,
}: LoginByIdentificatorProps): Promise<TAuth> => {
  const access_token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: {
        identificator,
      },
    },
    process.env.NEXT_PUBLIC_AUTH_JWT_TOKEN_PRIVATE_KEY ?? '',
  )

  return await login({ access_token })
}

export { loginByIdentificator }

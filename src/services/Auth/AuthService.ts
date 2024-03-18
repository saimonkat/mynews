import { Provider } from '@/facades'
import { LoginProps, TAuth } from './types'

const login = async ({ access_token }: LoginProps): Promise<TAuth> => {
  const { authFacade } = Provider()
  const { login } = await authFacade()
  login({ accessToken: access_token })

  return {
    isAuth: true,
    accessToken: access_token,
  }
}

const logout = async (): Promise<void> => {
  const { authFacade } = Provider()
  const { logout } = await authFacade()

  logout()
}

export { login, logout }

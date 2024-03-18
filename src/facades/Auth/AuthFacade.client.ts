'use client'

import { deleteCookie, getCookie, setCookie } from '../Cookie/CookieFacade.client'
import { TAuthData } from './types'

const isAuth = (): boolean => {
  const authData = {
    accessToken: getCookie('access_token'),
  }
  if (authData.accessToken) return true
  return false
}

const authData = (): TAuthData => {
  return {
    accessToken: getCookie('access_token'),
  }
}

const login = ({ accessToken }: TAuthData): void => {
  if (!accessToken) throw new Error('Invalid auth data')
  setCookie('access_token', accessToken)
}

const logout = (): void => {
  deleteCookie('access_token')
}

export { isAuth, authData, login, logout }

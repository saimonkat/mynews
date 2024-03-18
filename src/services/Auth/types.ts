export interface LoginByIdentificatorProps {
  identificator: string
}

export interface LoginProps {
  access_token: string
}

export type TAuth = {
  isAuth: undefined | boolean
  accessToken?: string
}

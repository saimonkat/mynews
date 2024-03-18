import { loginByIdentificator } from '@/services/Auth/AuthService.server'

export const GET = async (request: Request) => {
  try {
    const { identificator } = await request.json()
    const authData = await loginByIdentificator({ identificator })
    return Response.json({ access_token: authData.accessToken })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    })
  }
}

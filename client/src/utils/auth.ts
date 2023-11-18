import { User } from '~/types/user.type'

export const saveAccessTokenToLocalStorage = (accessToken: string): void =>
  localStorage.setItem('access_token', accessToken)
export const saveRefreshTokenToLocalStorage = (refreshToken: string): void =>
  localStorage.setItem('refresh_token', refreshToken)
export const clearAccessTokenFromLocalStorage = (): void => localStorage.removeItem('access_token')
export const clearRefreshTokenFromLocalStorage = (): void => localStorage.removeItem('refresh_token')
export const getRefreshTokenFromLocalStorage = (): string => localStorage.getItem('refresh_token') || ''
export const getAccessTokenFromLocalStorage = (): string => localStorage.getItem('access_token') || ''
export const setUserToLocalStorage = (user: User): void => localStorage.setItem('user', JSON.stringify(user))
export const getUserToLocalStorage = () => {
  const user = localStorage.getItem('user')
  return user ? (JSON.parse(user) as User) : null
}
export const clearLocalStorage = () => {
  localStorage.clear()
}

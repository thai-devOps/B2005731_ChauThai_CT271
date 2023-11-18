import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { HttpStatusCode } from '~/constants/httpStatusCode.emum'
import { toast } from 'react-toastify'
import { Auth } from '~/types/auth.type'
import {
  clearLocalStorage,
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  saveAccessTokenToLocalStorage,
  saveRefreshTokenToLocalStorage,
  setUserToLocalStorage
} from './auth'
import { responsePaths } from '~/apis/auth.api'
import { isAxiosAccessTokenExpired, isAxiosUnauthorizedError } from './utils'

// Lưu access token vào ram sẽ tối ưu hóa tốc độ tải trang
class Https {
  instance: AxiosInstance
  private access_token: string
  private refresh_token: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.access_token = getAccessTokenFromLocalStorage()
    this.refresh_token = getRefreshTokenFromLocalStorage()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: 'http://localhost:4040',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        if (config.headers && this.access_token) {
          config.headers.Authorization = this.access_token
          return config
        }
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        if (response.config.url === responsePaths.login) {
          const data = response.data as Auth
          this.access_token = 'Bearer ' + data.data.access_token
          this.refresh_token = data.data.refresh_token
          saveAccessTokenToLocalStorage(this.access_token)
          saveRefreshTokenToLocalStorage(this.refresh_token)
          setUserToLocalStorage(data.data.user)
        } else if (response.config.url === responsePaths.logout) {
          this.access_token = ''
          this.refresh_token = ''
          clearLocalStorage()
        }
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message: string = data.message || error.message
          if (!['Access_token expired', 'Access token không được gửi'].includes(message)) {
            if (message === 'Refresh_token expired') {
              toast.error('Phiên đăng nhập đã hết hạn')
              setTimeout(() => {
                window.location.reload()
              }, 2500)
            }
            toast.error(message)
          }
        }
        if (isAxiosUnauthorizedError(error)) {
          const config =
            (error.response?.config as AxiosRequestConfig) || ({ headers: {}, url: {} } as AxiosRequestConfig)
          const { url } = config
          /**
           * Lỗi authorization 401:
           * 1. refresh token hết hạn
           * 2. refresh token không hợp lệ
           * 3. refresh token không tồn tại
           * 4. access token hết hạn
           * 5. access token không hợp lệ
           * 6. access token không tồn tại
           */
          if (isAxiosAccessTokenExpired(error) && url !== responsePaths.refreshToken) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              return this.instance({
                ...config,
                headers: {
                  ...config.headers,
                  Authorization: access_token
                },
                data: {
                  ...config.data,
                  refresh_token: this.refresh_token
                }
              })
            })
          }
          // Còn những trường hợp như token không đúng
          // không truyền token,
          // token hết hạn nhưng gọi refresh token bị fail
          // thì tiến hành xóa local storage và toast message
          clearLocalStorage()
          this.access_token = ''
          this.refresh_token = ''
        }

        return Promise.reject(error)
      }
    )
  }
  private async handleRefreshToken() {
    try {
      const res = await this.instance.post<Auth>(responsePaths.refreshToken, { refresh_token: this.refresh_token })
      const { access_token, refresh_token, user } = res.data.data
      clearLocalStorage()
      saveAccessTokenToLocalStorage(access_token)
      saveRefreshTokenToLocalStorage(refresh_token)
      setUserToLocalStorage(user)
      this.access_token = 'Bearer ' + access_token
      this.refresh_token = refresh_token
      return 'Bearer' + access_token
    } catch (err) {
      clearLocalStorage()
      this.access_token = ''
      this.refresh_token = ''
      throw err
    }
  }
}
const https = new Https().instance
export default https

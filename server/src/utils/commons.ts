import { Request } from 'express'
import responseMessage from '~/constants/message'
import { verifyToken } from './jwt'
import { capitalize } from 'lodash'
import { JsonWebTokenError } from 'jsonwebtoken'
import statusCode from '~/constants/statusCode'
import envConfig from '~/constants/config'
import { ErrorWithMessage } from '~/models/errors'
import refreshTokenServices from '~/services/refreshTokens.services'

export const verifyAccessToken = async (access_token: string, req?: Request) => {
  if (!access_token) {
    throw new ErrorWithMessage({
      message: responseMessage.error.unauthorized.access_token_empty,
      status: statusCode.UNAUTHORIZED
    })
  }
  try {
    const decoded_authorization = await verifyToken({
      token: access_token,
      secretKey: envConfig.JWT_SECRET_ACCESS_TOKEN
    })
    if (req) {
      ;(req as Request).decode_authorization_access_token = decoded_authorization
    }
    return decoded_authorization
  } catch (err) {
    throw new ErrorWithMessage({
      message: capitalize((err as JsonWebTokenError).message.replace('jwt', 'access_token')),
      status: statusCode.UNAUTHORIZED
    })
  }
}
export const verifyRefreshToken = async (refresh_token: string, req?: Request) => {
  if (!refresh_token) {
    throw new ErrorWithMessage({
      message: responseMessage.error.unauthorized.refresh_token_empty,
      status: statusCode.UNAUTHORIZED
    })
  }
  try {
    const [decodeRefreshToken, refreshToken] = await Promise.all([
      await verifyToken({
        token: refresh_token,
        secretKey: envConfig.JWT_SECRET_REFRESH_TOKEN
      }),
      await refreshTokenServices.findRefreshToken(refresh_token)
    ])
    if (!refreshToken)
      throw new ErrorWithMessage({
        message: responseMessage.error.unauthorized.used_or_not_exitst_refresh_token,
        status: statusCode.UNAUTHORIZED
      })
    if (req) {
      ;(req as Request).decode_authorization_refresh_token = decodeRefreshToken
    }
    return decodeRefreshToken
  } catch (err) {
    throw new ErrorWithMessage({
      message: capitalize((err as JsonWebTokenError).message.replace('jwt', 'refresh_token')),
      status: statusCode.UNAUTHORIZED
    })
  }
}

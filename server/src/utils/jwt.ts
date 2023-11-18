import jwt, { SignOptions } from 'jsonwebtoken'
import envConfig from '~/constants/config'
import { TokenPayload } from '~/models/requests/User.requests'
export const signToken = ({
  payload,
  secretKey,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | object | Buffer
  secretKey: string
  options?: SignOptions
}) =>
  new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secretKey, options, (err, token) => {
      if (err) reject(err)
      resolve(token as string)
    })
  })

export const verifyToken = ({ token, secretKey }: { token: string; secretKey: string }) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        throw reject(err)
      }
      resolve(decoded as TokenPayload)
    })
  })
}

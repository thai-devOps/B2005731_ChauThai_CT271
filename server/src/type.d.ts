import { Request } from 'express'
import User from './models/schemas/User.schema'
import { TokenPayload } from './models/requests/User.requests'

declare module 'express' {
  interface Request {
    user?: User
    decode_authorization_access_token?: TokenPayload
    decode_authorization_refresh_token?: TokenPayload
  }
}
interface ErrorThrow {
  [key: string]: string
}
interface SuccessResponse {
  message: string
  data?: any
}

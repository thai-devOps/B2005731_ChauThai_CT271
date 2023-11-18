import { Request, Response, NextFunction } from 'express'
import statusCode from '~/constants/statusCode'
import { ErrorWithMessage } from '~/models/errors'
import { TokenPayload } from '~/models/requests/User.requests'
import userService from '~/services/users.services'

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.decode_authorization_access_token as TokenPayload
  const result = await userService.findUserByEmail(email)
  if (result && result.role === 'admin') {
    next()
  } else {
    throw new ErrorWithMessage({
      message: 'Bạn không có quyền truy cập',
      status: statusCode.FORBIDDEN
    })
  }
}

const helperMiddlewares = {
  isAdmin
}
export default helperMiddlewares

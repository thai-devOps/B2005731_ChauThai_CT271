import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import responseMessage from '~/constants/message'
import { CreateAccountBody, LogoutBody, ProfileBody, RegisterBody, TokenPayload } from '~/models/requests/User.requests'
import User from '~/models/schemas/User.schema'
import usersServices from '~/services/users.services'
import { SuccessResponse } from '~/type'
import { responseSuccess } from '~/utils/response'

const registerController = async (req: Request<ParamsDictionary, any, RegisterBody>, res: Response) => {
  const { name, phone_number, email, password } = req.body
  const result = await usersServices.createUser({ name, phone_number, email, password })
  const data: SuccessResponse = {
    message: responseMessage.success.register,
    data: result
  }
  return responseSuccess(res, data)
}
const loginController = async (req: Request, res: Response) => {
  const { _id, email } = req.user as User
  const result = await usersServices.login({ user_id: _id, email: email })
  const data: SuccessResponse = {
    message: responseMessage.success.login,
    data: result
  }
  responseSuccess(res, data)
}
const logoutController = async (req: Request<ParamsDictionary, any, LogoutBody>, res: Response) => {
  const { refresh_token } = req.body
  const result = await usersServices.logout(refresh_token)
  return responseSuccess(res, {
    message: 'Đăng xuất thành công',
    data: result
  })
}

const refreshTokenController = async (req: Request<ParamsDictionary, any, LogoutBody>, res: Response) => {
  const { refresh_token } = req.body
  const result = await usersServices.refreshToken(refresh_token)
  const data: SuccessResponse = {
    message: responseMessage.success.refresh_token,
    data: result
  }
  return responseSuccess(res, data)
}
// get user profile
const getUserProfileController = async (req: Request, res: Response) => {
  const { userId } = req.decode_authorization_access_token as TokenPayload
  const result = await usersServices.getUserProfile(userId)
  const data: SuccessResponse = {
    message: responseMessage.success.get_user_profile,
    data: result
  }
  return responseSuccess(res, data)
}
const updateUserProfileController = async (req: Request, res: Response) => {
  // const { userId } = req.decode_authorization_access_token as TokenPayload
  const payload: ProfileBody = req.body
  const result = await usersServices.updateUserProfile(payload)
  const data: SuccessResponse = {
    message: responseMessage.success.update_user_profile,
    data: result
  }
  return responseSuccess(res, data)
}

const getUserByIdController = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { id } = req.params
  const result = await usersServices.getUserById(id)
  const data: SuccessResponse = {
    message: 'Lấy thông tin tài khoản thành công',
    data: result
  }
  responseSuccess(res, data)
}

const getAllUsersPaginateController = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { page, limit } = req.query
  const page_number = parseInt(page as string) || 1
  const limit_number = parseInt(limit as string) || 5
  const [totalItems, result] = await usersServices.getAllUser({ page: page_number, limit: limit_number })
  const totalPages = Math.ceil((totalItems as number) / limit_number)
  const data: SuccessResponse = {
    message: 'Lấy danh sách tài khoản thành công',
    data: {
      users: result,
      pagination: { page: page_number, limit: limit_number, totalItems, page_size: totalPages }
    }
  }
  responseSuccess(res, data)
}

const createUserAccountController = async (req: Request<ParamsDictionary, any, CreateAccountBody>, res: Response) => {
  const dataBody = req.body
  const result = await usersServices.createUserAccount(dataBody)
  const data: SuccessResponse = {
    message: 'Tạo tài khoản thành công',
    data: result
  }
  responseSuccess(res, data)
}

const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await usersServices.deleteUser(id)
  const data: SuccessResponse = {
    message: 'Xóa tài khoản thành công',
    data: result
  }
  responseSuccess(res, data)
}

const changePasswordController = async (req: Request, res: Response) => {
  const { userId } = req.decode_authorization_access_token as TokenPayload
  const { new_password } = req.body
  const result = await usersServices.changePassword(userId, new_password)
  const data: SuccessResponse = {
    message: 'Đổi mật khẩu thành công',
    data: result
  }
  responseSuccess(res, data)
}
const getUsersNopaginate = async (req: Request, res: Response) => {
  const result = await usersServices.getAll()
  const data: SuccessResponse = {
    message: 'Lấy danh sách tài khoản thành công',
    data: result
  }
  responseSuccess(res, data)
}
const usersControllers = {
  registerController,
  loginController,
  logoutController,
  refreshTokenController,
  getUserProfileController,
  updateUserProfileController,
  getAllUsersPaginateController,
  deleteUserController,
  createUserAccountController,
  getUserByIdController,
  changePasswordController,
  getUsersNopaginate
}
export default usersControllers

import { Router } from 'express'
import { Request } from 'express'
import { wrapRequestHanlers } from '../utils/handles'
import usersControllers from '~/controllers/users.controllers'
import usersMiddlewares from '~/middlewares/users.middlewares'
import helperMiddlewares from '~/middlewares/helper.middlewares'
// import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/users.controllers'
const usersRouter = Router()

/**
 * descripton: create a new user
 * method: POST
 * path: /user/register
 * body: {name: string, email: string, password: string, confirm_password: string}
 */
usersRouter.post(
  '/register',
  usersMiddlewares.registerValidator,
  wrapRequestHanlers(usersControllers.registerController)
)

/**
 * descripton: login
 * method: POST
 * path: /user/login
 * body: {email: string, password: string}
 */
usersRouter.post('/login', usersMiddlewares.loginValidator, wrapRequestHanlers(usersControllers.loginController))

/**
 * descripton: logout
 * method: POST
 * path: /user/logout
 * body: {refresh_token: string}
 */

usersRouter.post(
  '/logout',
  usersMiddlewares.accessTokenValidator,
  usersMiddlewares.refreshTokenValidator,
  wrapRequestHanlers(usersControllers.logoutController)
)

/**
 * description: refresh token
 * method: POST
 * path: /user/refresh-token
 * body: {refresh_token: string}
 */
usersRouter.post(
  '/refresh-token',
  usersMiddlewares.refreshTokenValidator,
  wrapRequestHanlers(usersControllers.refreshTokenController)
)

/**
 * description: get user profile
 * method: GET
 * path: /user/profile
 * body: {}
 */
usersRouter.get(
  '/profile',
  usersMiddlewares.accessTokenValidator,
  wrapRequestHanlers(usersControllers.getUserProfileController)
)
usersRouter.put(
  '/profile',
  usersMiddlewares.accessTokenValidator,
  wrapRequestHanlers(usersControllers.updateUserProfileController)
)

/**
 * description: get all users paginate
 * method: GET
 * path:
 * body: {}
 * query: {page: string, limit: string}
 */
usersRouter.get(
  '/',
  usersMiddlewares.accessTokenValidator,
  wrapRequestHanlers(usersControllers.getAllUsersPaginateController)
)
usersRouter.get(
  '/all',
  usersMiddlewares.accessTokenValidator,
  helperMiddlewares.isAdmin,
  wrapRequestHanlers(usersControllers.getUsersNopaginate)
)

/**
 * description: create user account
 * method: POST
 * path: /user/create-account
 * body: {name: string, email: string, password: string, confirm_password?: string, role: string, phone_number: string, address: string, avatar: string, cccd: string, gender: string, date_of_birth: string, }
 */

usersRouter.post(
  '/create-account',
  usersMiddlewares.createAccountValidator,
  usersMiddlewares.accessTokenValidator,
  wrapRequestHanlers(usersControllers.createUserAccountController)
)
/**
 * description: get user by id
 * method: GET
 * path: /user/:id
 * body: {}
 */
usersRouter.get(
  '/:id',
  usersMiddlewares.accessTokenValidator,
  wrapRequestHanlers(usersControllers.getUserByIdController)
)

/**
 * description: delete user
 * method: DELETE
 * path: /user/:id
 * body: {}
 * query: {}
 * params: {id: string}
 */
usersRouter.delete('/:id', wrapRequestHanlers(usersControllers.deleteUserController))

/**
 * description: change password user
 * method: PUT
 * path: /user/change-password
 * body: {new_password: string}
 */
usersRouter.put(
  '/change-password',
  usersMiddlewares.accessTokenValidator,
  usersMiddlewares.changePasswordValidator,
  wrapRequestHanlers(usersControllers.changePasswordController)
)

export default usersRouter

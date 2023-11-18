import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import responseMessage from '~/constants/message'
import statusCode from '~/constants/statusCode'
import { ErrorWithMessage, ErrorWithStatus } from '~/models/errors'
import { LoginBody, RegisterBody, TokenPayload } from '~/models/requests/User.requests'
import userService from '~/services/users.services'
import { verifyAccessToken, verifyRefreshToken } from '~/utils/commons'
import hashPassword from '~/utils/crypto'
import { validateSchema } from '~/utils/validations'

const registerValidator = validateSchema(
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: responseMessage.error.unprocessableEntity.name.empty
        },
        isString: {
          errorMessage: responseMessage.error.unprocessableEntity.name.invalid
        }
      },
      phone_number: {
        notEmpty: {
          errorMessage: responseMessage.error.unprocessableEntity.phone.empty
        }
      },
      email: {
        notEmpty: {
          errorMessage: responseMessage.error.unprocessableEntity.email.empty
        },
        isEmail: {
          errorMessage: responseMessage.error.unprocessableEntity.email.invalid
        },
        isString: {
          errorMessage: responseMessage.error.unprocessableEntity.email.invalid
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            try {
              const user = await userService.findUserByEmail(value)
              if (user) {
                throw new ErrorWithMessage({
                  message: responseMessage.error.unprocessableEntity.email.existed,
                  status: statusCode.CONFLICT
                })
              }
              return true
            } catch (error) {
              if (error instanceof ErrorWithStatus) {
                throw error
              }
              throw new ErrorWithStatus({
                message: responseMessage.error.default,
                status: statusCode.INTERNAL_SERVER_ERROR
              })
            }
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: responseMessage.error.unprocessableEntity.password.empty
        },
        isString: {
          errorMessage: responseMessage.error.unprocessableEntity.password.invalid
        },
        isLength: {
          options: { min: 6, max: 160 },
          errorMessage: responseMessage.error.unprocessableEntity.password.invalid
        }
      },
      confirm_password: {
        optional: true,
        custom: {
          options: (value, { req }) => {
            const { password } = req.body as RegisterBody
            if (value !== password) {
              throw new ErrorWithStatus({
                message: responseMessage.error.unprocessableEntity.password.notMatch,
                status: statusCode.UNPROCESSABLE_ENTITY
              })
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
const createAccountValidator = validateSchema(
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: responseMessage.error.unprocessableEntity.name.empty
        },
        isString: {
          errorMessage: responseMessage.error.unprocessableEntity.name.invalid
        }
      },
      phone_number: {
        notEmpty: {
          errorMessage: responseMessage.error.unprocessableEntity.phone.empty
        }
      },
      email: {
        notEmpty: {
          errorMessage: responseMessage.error.unprocessableEntity.email.empty
        },
        isEmail: {
          errorMessage: responseMessage.error.unprocessableEntity.email.invalid
        },
        isString: {
          errorMessage: responseMessage.error.unprocessableEntity.email.invalid
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            try {
              const user = await userService.findUserByEmail(value)
              if (user) {
                throw new ErrorWithMessage({
                  message: responseMessage.error.unprocessableEntity.email.existed,
                  status: statusCode.CONFLICT
                })
              }
              return true
            } catch (error) {
              if (error instanceof ErrorWithStatus) {
                throw error
              }
              throw new ErrorWithStatus({
                message: responseMessage.error.default,
                status: statusCode.INTERNAL_SERVER_ERROR
              })
            }
          }
        }
      },
      role: {
        notEmpty: {
          errorMessage: responseMessage.error.unprocessableEntity.role.empty
        }
      },
      password: {
        notEmpty: {
          errorMessage: responseMessage.error.unprocessableEntity.password.empty
        },
        isString: {
          errorMessage: responseMessage.error.unprocessableEntity.password.invalid
        },
        isLength: {
          options: { min: 6, max: 160 },
          errorMessage: responseMessage.error.unprocessableEntity.password.invalid
        }
      },
      confirm_password: {
        optional: true,
        custom: {
          options: (value, { req }) => {
            const { password } = req.body as RegisterBody
            if (value !== password) {
              throw new ErrorWithStatus({
                message: responseMessage.error.unprocessableEntity.password.notMatch,
                status: statusCode.UNPROCESSABLE_ENTITY
              })
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
const loginValidator = validateSchema(
  checkSchema({
    email: {
      notEmpty: {
        errorMessage: responseMessage.error.unprocessableEntity.email.empty
      },
      isEmail: {
        errorMessage: responseMessage.error.unprocessableEntity.email.invalid
      },
      trim: true,
      custom: {
        options: async (value, { req }) => {
          const { password } = req.body as LoginBody
          try {
            const user = await userService.findUserByEmailAndPassword(value, password)
            if (!user) {
              throw new ErrorWithMessage({
                message: responseMessage.error.unauthorized.default,
                status: statusCode.UNAUTHORIZED
              })
            }
            ;(req as Request).user = user
            return true
          } catch (error) {
            if (error instanceof ErrorWithStatus) {
              throw error
            }
            throw new ErrorWithStatus({
              message: responseMessage.error.default,
              status: statusCode.INTERNAL_SERVER_ERROR
            })
          }
        }
      }
    }
  })
)

const accessTokenValidator = validateSchema(
  checkSchema(
    {
      Authorization: {
        custom: {
          options: async (value: string, { req }) => {
            const access_token = (value || '').split(' ')[1]
            return await verifyAccessToken(access_token, req as Request)
          }
        }
      }
    },
    ['headers']
  )
)

const refreshTokenValidator = validateSchema(
  checkSchema(
    {
      refresh_token: {
        custom: {
          options: async (value: string, { req }) => {
            return await verifyRefreshToken(value, req as Request)
          }
        }
      }
    },
    ['body']
  )
)
const delayResponse = (req: Request, res: Response, next: NextFunction) => {
  setTimeout(() => {
    next()
  }, 1500)
}
const updateUserProfileValidator = validateSchema(
  checkSchema({
    avatar: {
      notEmpty: {
        errorMessage: responseMessage.error.unprocessableEntity.avatar.empty
      }
    },
    name: {
      notEmpty: {
        errorMessage: responseMessage.error.unprocessableEntity.name.empty
      },
      isString: {
        errorMessage: responseMessage.error.unprocessableEntity.name.invalid
      }
    },
    phone_number: {
      notEmpty: {
        errorMessage: responseMessage.error.unprocessableEntity.phone.empty
      }
    },
    email: {
      notEmpty: {
        errorMessage: responseMessage.error.unprocessableEntity.email.empty
      },
      isEmail: {
        errorMessage: responseMessage.error.unprocessableEntity.email.invalid
      },
      isString: {
        errorMessage: responseMessage.error.unprocessableEntity.email.invalid
      },
      trim: true,
      custom: {
        options: async (value, { req }) => {
          const { userId } = (req as Request).decode_authorization_access_token as TokenPayload
          try {
            const user = await userService.findUserByEmail(value)
            if (user && user._id.toString() !== userId) {
              throw new ErrorWithMessage({
                message: responseMessage.error.unprocessableEntity.email.existed,
                status: statusCode.CONFLICT
              })
            }
            return true
          } catch (error) {
            if (error instanceof ErrorWithStatus) {
              throw error
            }
            throw new ErrorWithStatus({
              message: responseMessage.error.default,
              status: statusCode.INTERNAL_SERVER_ERROR
            })
          }
        }
      }
    }
  })
)
const changePasswordValidator = validateSchema(
  checkSchema({
    password: {
      custom: {
        options: async (value, { req }) => {
          const { userId } = (req as Request).decode_authorization_access_token as TokenPayload
          const user = await userService.findUserById(userId)
          if (!user) {
            throw new ErrorWithMessage({
              message: responseMessage.error.unauthorized.default,
              status: statusCode.UNAUTHORIZED
            })
          }
          const isMatch = hashPassword(value) === user.password
          if (!isMatch) {
            throw new ErrorWithMessage({
              message: responseMessage.error.unprocessableEntity.password.notMatchOldPassword,
              status: statusCode.UNPROCESSABLE_ENTITY
            })
          }
          return true
        }
      }
    },
    new_password: {
      notEmpty: {
        errorMessage: responseMessage.error.unprocessableEntity.password.empty
      },
      isString: {
        errorMessage: responseMessage.error.unprocessableEntity.password.invalid
      },
      isLength: {
        options: { min: 6, max: 160 },
        errorMessage: responseMessage.error.unprocessableEntity.password.invalid
      }
    }
  })
)
const usersMiddlewares = {
  registerValidator,
  loginValidator,
  accessTokenValidator,
  refreshTokenValidator,
  delayResponse,
  updateUserProfileValidator,
  createAccountValidator,
  changePasswordValidator
}
export default usersMiddlewares

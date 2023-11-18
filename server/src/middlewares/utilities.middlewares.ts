import { Request } from 'express'
import { checkSchema } from 'express-validator'
import statusCode from '~/constants/statusCode'
import { ErrorWithMessage, ErrorWithStatus } from '~/models/errors'
import utilitiesService from '~/services/utilities.services'
import { validateSchema } from '~/utils/validations'

const utilityValidation = validateSchema(
  checkSchema({
    name: {
      notEmpty: {
        errorMessage: 'Tên tiện ích là bắt buộc'
      },
      isString: {
        errorMessage: 'Tên tiện ích phải là chuỗi'
      },
      trim: true,
      custom: {
        options: async (value) => {
          try {
            const utility = await utilitiesService.getUtilityByName(value)
            if (utility) {
              throw new ErrorWithMessage({
                message: 'Tiện ích đã tồn tại',
                status: statusCode.CONFLICT
              })
            }
            return true
          } catch (error) {
            if (error instanceof ErrorWithStatus) {
              throw error
            }
            throw new ErrorWithStatus({
              message: 'Internal server error',
              status: statusCode.INTERNAL_SERVER_ERROR
            })
          }
        }
      }
    },
    price: {
      notEmpty: {
        errorMessage: 'Giá tiện ích là bắt buộc'
      },
      isNumeric: {
        errorMessage: 'Giá tiện ích phải là số'
      }
    },

    unit: {
      optional: true,
      isString: {
        errorMessage: 'Đơn vị tiện ích phải là chuỗi'
      },
      trim: true
    }
  })
)

const updateUtilityValidation = validateSchema(
  checkSchema({
    name: {
      notEmpty: {
        errorMessage: 'Tên tiện ích là bắt buộc'
      },
      isLength: {
        errorMessage: 'Tên tiện ích phải có độ dài từ 2 đến 50 ký tự',
        options: { min: 2, max: 50 }
      },
      isString: {
        errorMessage: 'Tên tiện ích phải là chuỗi'
      },
      trim: true,
      custom: {
        options: async (value, { req }) => {
          try {
            const id = (req as Request).params.utilityId
            const utility = await utilitiesService.getUtilityByName(value)
            if (utility && utility._id.toString() !== id) {
              throw new ErrorWithMessage({
                message: 'Tiện ích đã tồn tại',
                status: statusCode.CONFLICT
              })
            }
            return true
          } catch (error) {
            if (error instanceof ErrorWithStatus) {
              throw error
            }
            throw new ErrorWithStatus({
              message: 'Internal server error',
              status: statusCode.INTERNAL_SERVER_ERROR
            })
          }
        }
      }
    },
    price: {
      optional: true,
      isNumeric: {
        errorMessage: 'Giá tiện ích phải là số'
      }
    },

    unit: {
      optional: true,
      isString: {
        errorMessage: 'Đơn vị tiện ích phải là chuỗi'
      },
      trim: true
    }
  })
)

const utilityMiddleware = {
  utilityValidation,
  updateUtilityValidation
}
export default utilityMiddleware

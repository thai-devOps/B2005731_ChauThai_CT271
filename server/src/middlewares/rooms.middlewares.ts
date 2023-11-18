import { checkSchema } from 'express-validator'
import statusCode from '~/constants/statusCode'
import { ErrorWithMessage, ErrorWithStatus } from '~/models/errors'
import roomService from '~/services/rooms.services'
import { validateSchema } from '~/utils/validations'
import { Request } from 'express'
const createRoomValidator = validateSchema(
  checkSchema(
    {
      name: {
        errorMessage: 'Tên phòng không được để trống',
        notEmpty: true,
        custom: {
          options: async (value, { req }) => {
            const room = await roomService.getRoomByName(value)
            if (room) {
              throw new ErrorWithStatus({
                status: statusCode.BAD_REQUEST,
                message: 'Tên phòng đã tồn tại'
              })
            }
            return true
          }
        }
      },
      price: {
        errorMessage: 'Giá phòng không được để trống',
        notEmpty: true
      },
      area: {
        errorMessage: 'Diện tích không được để trống',
        notEmpty: true
      },
      address: {
        errorMessage: 'Địa chỉ không được để trống',
        notEmpty: true
      },
      description: {
        errorMessage: 'Mô tả không được để trống',
        notEmpty: true
      },
      images: {
        errorMessage: 'Ảnh không được để trống',
        notEmpty: true
      },
      utilities: {
        errorMessage: 'Tiện ích không được để trống',
        notEmpty: true
      },
      roomer: {
        optional: true
      },
      capacity: {
        errorMessage: 'Số người tối đa không được để trống',
        notEmpty: true
      },
      deposit: {
        errorMessage: 'Tiền đặt cọc không được để trống',
        notEmpty: true
      }
    },
    ['body']
  )
)
const updateRoomValidator = validateSchema(
  checkSchema(
    {
      name: {
        errorMessage: 'Tên phòng không được để trống',
        notEmpty: true,
        custom: {
          options: async (value, { req }) => {
            // handle update room name if name is not changed => return true to pass validation
            // if name is changed => check if new name is existed in database or not => throw error if existed
            const room = await roomService.getRoomByName(value)
            if (room && room._id.toString() !== (req as Request).params.id) {
              throw new ErrorWithStatus({
                status: statusCode.BAD_REQUEST,
                message: 'Tên phòng đã tồn tại'
              })
            }
            return true
          }
        }
      },
      price: {
        errorMessage: 'Giá phòng không được để trống',
        notEmpty: true
      },
      area: {
        errorMessage: 'Diện tích không được để trống',
        notEmpty: true
      },
      address: {
        errorMessage: 'Địa chỉ không được để trống',
        notEmpty: true
      },
      description: {
        errorMessage: 'Mô tả không được để trống',
        notEmpty: true,
        trim: true
      },
      images: {
        errorMessage: 'Ảnh không được để trống',
        notEmpty: true
      },
      utilities: {
        errorMessage: 'Tiện ích không được để trống',
        notEmpty: true
      },
      roomer: {
        optional: true
      },
      capacity: {
        errorMessage: 'Số người tối đa không được để trống',
        notEmpty: true
      },
      deposit: {
        errorMessage: 'Tiền đặt cọc không được để trống',
        notEmpty: true
      }
    },
    ['body']
  )
)
const roomsMiddlewares = {
  createRoomValidator,
  updateRoomValidator
}
export default roomsMiddlewares

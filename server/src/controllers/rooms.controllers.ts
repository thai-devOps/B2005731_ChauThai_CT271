import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ORDER, SORT_BY } from '~/constants/room'
import { CreateRoomBody, GetRoomsQuery } from '~/models/requests/Room.requests'
import { ObjectId } from 'mongodb'
import { Utility } from '~/models/schemas/Utility.schema'
import roomService from '~/services/rooms.services'
import { SuccessResponse } from '~/type'
import { responseSuccess } from '~/utils/response'

const createRoomsController = async (req: Request<ParamsDictionary, any, CreateRoomBody>, res: Response) => {
  const room = req.body
  const result = await roomService.createRoom(room)
  const data: SuccessResponse = {
    message: 'Thêm phòng thành công',
    data: result
  }
  responseSuccess(res, data)
}
const getRoomsController = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { price_max, exclude, price_min, name, capacity, area, status } = req.query as {
    [key: string]: string | number
  }
  let { sort_by, order, page, limit } = req.query as { [key: string]: string | number }
  const condition: any = {}
  page = Number(page) || 1
  limit = Number(limit) || 5
  if (price_max && price_min) {
    condition.price = { $gte: Number(price_min), $lte: Number(price_max) }
  }
  if (price_max) {
    condition.price = {
      $lte: Number(price_max)
    }
  }
  if (price_min) {
    condition.price = condition.price ? { ...condition.price, $gte: Number(price_min) } : { $gte: Number(price_min) }
  }
  if (name) {
    condition.name = { $regex: name, $options: 'i' }
  }
  if (capacity) {
    condition.capacity = { $gte: Number(capacity) }
  }
  if (area) {
    condition.area = { $gte: Number(area) }
  }
  if (status) {
    condition.status = {}
  }
  if (exclude) {
    condition._id = { $nin: exclude }
  }
  if (!ORDER.includes(order as string)) {
    order = ORDER[1]
  }
  if (!SORT_BY.includes(sort_by as string)) {
    sort_by = SORT_BY[0]
  }
  const result = await roomService.getRooms({
    condition,
    sort_by: sort_by as string,
    order: order as string,
    page,
    limit
  })
  responseSuccess(res, {
    message: 'Get products successfully',
    data: result
  })
}

const getAllRoomsController = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const result = await roomService.getAllRooms()
  responseSuccess(res, {
    message: 'Get products successfully',
    data: result
  })
}
const getRoomsAvailableController = async (req: Request<ParamsDictionary, any, any, GetRoomsQuery>, res: Response) => {
  const query = req.query
  // remove empty fields or undefined fields in query
  Object.keys(query).forEach((key) => {
    if (!query[key as keyof GetRoomsQuery]) {
      delete query[key as keyof GetRoomsQuery]
    }
  })
  const condition: any = {}
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 6
  // handle utilities from string to array of string
  if (query.utilities) {
    const utilitiesArray = (query.utilities as string).split(',')
    condition.utilities = {
      $elemMatch: {
        _id: {
          $in: utilitiesArray.map((id: string) => new ObjectId(id))
        }
      }
    }
  }
  // handle price from string to number
  if (query.price) {
    condition.price = { $lte: Number(query.price) }
  }
  // handle capacity from string to number
  if (query.capacity) {
    if (query.capacity === 'lte2') condition.capacity = { $gte: 1, $lte: 2 }
    if (query.capacity === 'lte3') condition.capacity = { $gte: 2, $lte: 3 }
    if (query.capacity === 'lte4') {
      condition.capacity = { $gte: 3, $lte: 4 }
    }
  }
  // handle area
  if (query.area) {
    if (query.area === 'lte10') condition.area = { $lte: 9 }
    if (query.area === 'gte10-lte20') condition.area = { $gte: 10, $lte: 20 }
  }
  // handle address
  if (query.address) {
    condition.address = { $regex: query.address, $options: 'i' }
  }
  const sortBy = !SORT_BY.includes(query.sort_by as string) ? SORT_BY[0] : query.sort_by
  const order = !ORDER.includes(query.order as string) ? ORDER[1] : query.order
  const result = await roomService.getRoomsAvailable({
    condition,
    sort_by: sortBy as string,
    order: order as string,
    page,
    limit
  })
  responseSuccess(res, {
    message: 'Get products successfully',
    data: result
  })
}
const getRoomByIdController = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { id } = req.params
  const result = await roomService.getRoomById(id)
  responseSuccess(res, {
    message: 'Get product successfully',
    data: result
  })
}

const deleteRoomController = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { id } = req.params
  const result = await roomService.deleteRoom(id)
  const data: SuccessResponse = {
    message: 'Xóa phòng thành công',
    data: result
  }
  responseSuccess(res, data)
}

const updateRoomController = async (req: Request<ParamsDictionary, any, CreateRoomBody>, res: Response) => {
  const { id } = req.params
  const room = req.body
  const result = await roomService.updateRoom(id, room)
  const data: SuccessResponse = {
    message: 'Cập nhật phòng thành công',
    data: result
  }
  responseSuccess(res, data)
}
const getAllRoomsSamePriceController = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { price } = req.params
  const { exclude } = req.query
  const result = await roomService.getAllRoomsSamePrice(Number(price), exclude as string)
  responseSuccess(res, {
    message: 'Get products successfully',
    data: result
  })
}
const roomsControllers = {
  createRoomsController,
  getRoomsController,
  updateRoomController,
  deleteRoomController,
  getAllRoomsController,
  getRoomByIdController,
  getRoomsAvailableController,
  getAllRoomsSamePriceController
}
export default roomsControllers

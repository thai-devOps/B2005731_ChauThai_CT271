import { Router } from 'express'
import roomsControllers from '~/controllers/rooms.controllers'
import helperMiddlewares from '~/middlewares/helper.middlewares'
import roomsMiddlewares from '~/middlewares/rooms.middlewares'
import usersMiddlewares from '~/middlewares/users.middlewares'
import { wrapRequestHanlers } from '~/utils/handles'

const roomsRouter = Router()

/**
 * description: Create a new room
 * method: POST
 * path: /rooms
 * body: { name, price, area, address, description, images, utilities }
 */
roomsRouter.post(
  '/',
  usersMiddlewares.accessTokenValidator,
  wrapRequestHanlers(helperMiddlewares.isAdmin),
  roomsMiddlewares.createRoomValidator,
  wrapRequestHanlers(roomsControllers.createRoomsController)
)
/**
 * description: [Get rooms paginated]
 * method: GET
 * path: /rooms
 * query: { page, limit, sort, order, name, price, area, address, price_max, price_min, area_max, area_min, utilities }
 */
roomsRouter.get('/', wrapRequestHanlers(roomsControllers.getRoomsController))

/**
 * description: [Get rooms available paginated]
 * method: GET
 * path: /rooms/available
 * query: { page, limit, sort, order, name, price, area, address, price_max, price_min, area_max, area_min, utilities }
 */
roomsRouter.get('/available', wrapRequestHanlers(roomsControllers.getRoomsAvailableController))

/**
 * description: [Get all rooms]
 * method: GET
 * path: /rooms/getAll
 */
roomsRouter.get('/getAll', wrapRequestHanlers(roomsControllers.getAllRoomsController))

/**
 * description: update room by id
 * method: PUT
 * path: /rooms/:id
 * params: { id }
 * body: { name, price, area, address, description, images, utilities, status, capacity, deposit}
 */

roomsRouter.put(
  '/:id',
  usersMiddlewares.accessTokenValidator,
  wrapRequestHanlers(helperMiddlewares.isAdmin),
  roomsMiddlewares.updateRoomValidator,
  wrapRequestHanlers(roomsControllers.updateRoomController)
)
/**
 * description: [Get room by id]
 * method: GET
 * path: /rooms/:id
 * params: { id }
 */
roomsRouter.get('/:id', wrapRequestHanlers(roomsControllers.getRoomByIdController))

/**
 * description: [Delete room by id]
 * method: DELETE
 * path: /rooms/:id
 * params: { id }
 */

roomsRouter.delete(
  '/:id',
  usersMiddlewares.accessTokenValidator,
  wrapRequestHanlers(helperMiddlewares.isAdmin),
  wrapRequestHanlers(roomsControllers.deleteRoomController)
)
/**
 * description: [Get all rooms with same price]
 * method: GET
 * path: /rooms/price/:price
 * params: { price }
 */
roomsRouter.get('/price/:price', wrapRequestHanlers(roomsControllers.getAllRoomsSamePriceController))

export default roomsRouter

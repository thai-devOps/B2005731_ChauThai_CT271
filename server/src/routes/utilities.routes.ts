import { Router } from 'express'
import utilitiesControllers from '~/controllers/utilities.controllers'
import helperMiddlewares from '~/middlewares/helper.middlewares'
import usersMiddlewares from '~/middlewares/users.middlewares'
import utilityMiddleware from '~/middlewares/utilities.middlewares'
import { wrapRequestHanlers } from '~/utils/handles'

const utilitiesRouter = Router()

/**
 * description: create a new utility
 * method: POST
 * path: /utilities
 * body: { name, price, unit }
 */
utilitiesRouter.post(
  '/',
  usersMiddlewares.accessTokenValidator,
  helperMiddlewares.isAdmin,
  utilityMiddleware.utilityValidation,
  wrapRequestHanlers(utilitiesControllers.createUtility)
)

/**
 * description: get all utilities
 * method: GET
 * path: /utilities
 */
utilitiesRouter.get(
  '/',
  usersMiddlewares.accessTokenValidator,
  wrapRequestHanlers(utilitiesControllers.getAllUtilities)
)

/**
 * description: get all utilities no paginate
 * method: GET
 * path: /utilities/getAll
 */

utilitiesRouter.get('/getAll', wrapRequestHanlers(utilitiesControllers.getAllUtilitiesNoPaginate))

/**
 * description: get utility by id
 * method: GET
 * path: /utilities/:utilityId
 */
utilitiesRouter.get(
  '/:utilityId',
  usersMiddlewares.accessTokenValidator,
  wrapRequestHanlers(utilitiesControllers.getUtilityById)
)

/**
 * description: update utility by id
 * method: PUT
 * path: /utilities/:utilityId
 * body: { name, price, unit }
 */
utilitiesRouter.put(
  '/:utilityId',
  usersMiddlewares.accessTokenValidator,
  helperMiddlewares.isAdmin,
  utilityMiddleware.updateUtilityValidation,
  wrapRequestHanlers(utilitiesControllers.updateUtilityById)
)

/**
 * description: delete utility by id
 * method: DELETE
 * path: /utilities/:utilityId
 */
utilitiesRouter.delete(
  '/:utilityId',
  usersMiddlewares.accessTokenValidator,
  wrapRequestHanlers(utilitiesControllers.deleteUtilityById)
)

/**
 * description: delete all utilities
 * method: DELETE
 * path: /utilities
 */
utilitiesRouter.delete('/', wrapRequestHanlers(utilitiesControllers.deleteAllUtilities))

export default utilitiesRouter

import { Request, Response } from 'express'
import { UtilityType } from '~/models/schemas/Utility.schema'
import utilitiesService from '~/services/utilities.services'
import { responseSuccess } from '~/utils/response'
import { ParamsDictionary } from 'express-serve-static-core'

const createUtility = async (req: Request<ParamsDictionary, any, UtilityType>, res: Response) => {
  const payload = req.body
  const result = await utilitiesService.createUtility(payload)
  responseSuccess(res, {
    message: 'Tạo tiện ích thành công',
    data: result
  })
}

const getAllUtilities = async (req: Request, res: Response) => {
  // get data pagination
  let { page, limit } = req.query
  page = page as string | '1'
  limit = limit as string | '5'
  const result = await utilitiesService.getAllUtilities(page, limit)
  responseSuccess(res, {
    message: 'Lấy danh sách tiện ích thành công',
    data: result
  })
}

const getAllUtilitiesNoPaginate = async (req: Request, res: Response) => {
  const result = await utilitiesService.getAllUtilitiesNoPaginate()
  responseSuccess(res, {
    message: 'Lấy danh sách tiện ích thành công',
    data: result
  })
}

const getUtilityById = async (req: Request, res: Response) => {
  const { utilityId } = req.params
  const result = await utilitiesService.getUtilityById(utilityId)
  responseSuccess(res, {
    message: 'Lấy tiện ích thành công',
    data: result
  })
}

const updateUtilityById = async (req: Request, res: Response) => {
  const { utilityId } = req.params
  const tempData = await utilitiesService.getUtilityById(utilityId)
  if (!tempData) {
    throw new Error('Không tìm thấy tiện ích')
  }
  const payload: UtilityType = req.body
  const result = await utilitiesService.updateUtilityById(utilityId, payload)
  responseSuccess(res, {
    message: 'Cập nhật tiện ích thành công',
    data: result
  })
}

const deleteUtilityById = async (req: Request, res: Response) => {
  const { utilityId } = req.params
  const result = await utilitiesService.deleteUtilityById(utilityId)
  responseSuccess(res, {
    message: 'Xóa tiện ích thành công',
    data: result
  })
}

const deleteAllUtilities = async (req: Request, res: Response) => {
  const result = await utilitiesService.deleteAllUtilities()
  responseSuccess(res, {
    message: 'Xóa tất cả tiện ích thành công',
    data: result
  })
}

const utilitiesControllers = {
  createUtility,
  getAllUtilities,
  getUtilityById,
  getAllUtilitiesNoPaginate,
  updateUtilityById,
  deleteUtilityById,
  deleteAllUtilities
}
export default utilitiesControllers

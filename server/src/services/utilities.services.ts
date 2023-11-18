import { Utility, UtilityType } from '~/models/schemas/Utility.schema'
import databaseSetvices from './database.services'
import { ObjectId } from 'mongodb'
import { omit } from 'lodash'
class UtilitiesService {
  // create a new utility
  public createUtility = async (utility: UtilityType) => {
    return await databaseSetvices.utilities.insertOne(
      new Utility({
        ...utility
      })
    )
  }
  // get all utilities
  public getAllUtilities = async (page: string, limit: string) => {
    const result = await databaseSetvices.utilities
      .find({})
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .toArray()
    const totalItems = await databaseSetvices.utilities.countDocuments({})
    return {
      utilities: result,
      paginate: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalItems,
        page_size: Math.ceil(totalItems / parseInt(limit))
      }
    }
  }
  // get utility by id
  public getUtilityById = async (utilityId: string) => {
    return await databaseSetvices.utilities.findOne({ _id: new ObjectId(utilityId) })
  }
  // update utility by id
  public updateUtilityById = async (utilityId: string, utility: UtilityType) => {
    const data = omit(utility, ['_id'])
    return await databaseSetvices.utilities.findOneAndUpdate(
      {
        _id: new ObjectId(utilityId)
      },
      {
        $set: { ...data, updated_at: new Date().toISOString() }
      }
    )
  }
  // delete utility by id
  public deleteUtilityById = async (utilityId: string) => {
    return await databaseSetvices.utilities.deleteOne({ _id: new ObjectId(utilityId) })
  }

  // get utility by name
  public getUtilityByName = async (name: string) => {
    return await databaseSetvices.utilities.findOne({ name })
  }

  // get all utilities no paginate
  public getAllUtilitiesNoPaginate = async () => {
    return await databaseSetvices.utilities.find({}).toArray()
  }
  // delete all utilities
  public deleteAllUtilities = async () => {
    return await databaseSetvices.utilities.deleteMany({})
  }
}
const utilitiesService = new UtilitiesService()
export default utilitiesService

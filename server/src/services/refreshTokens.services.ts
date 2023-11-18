import RefreshToken from '~/models/schemas/RefreshToken.schema'
import databaseServices from './database.services'
import { ObjectId } from 'mongodb'

class RefreshTokenServices {
  public createRefreshToken = async ({
    token,
    user_id,
    iat,
    exp
  }: {
    token: string
    user_id: ObjectId
    iat: number
    exp: number
  }) => {
    const refreshToken = await databaseServices.refresh_tokens.insertOne(
      new RefreshToken({
        token,
        user_id,
        iat,
        exp: exp
      })
    )
    return refreshToken
  }
  public findRefreshToken = async (token: string) => {
    return await databaseServices.refresh_tokens.findOne({ token })
  }
  public deleteRefreshToken = async (token: string) => {
    return await databaseServices.refresh_tokens.deleteOne({ token })
  }
}
const refreshTokenServices = new RefreshTokenServices()
export default refreshTokenServices

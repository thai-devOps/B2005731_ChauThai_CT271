import envConfig from '~/constants/config'
import { signToken, verifyToken } from '~/utils/jwt'
import databaseSetvices from './database.services'
import User from '~/models/schemas/User.schema'
import hashPassword from '~/utils/crypto'
import { ObjectId } from 'mongodb'
import refreshTokenServices from './refreshTokens.services'
import { ErrorWithMessage } from '~/models/errors'
import responseMessage from '~/constants/message'
import statusCode from '~/constants/statusCode'
import { omit } from 'lodash'
import { CreateAccountBody, ProfileBody } from '~/models/requests/User.requests'

class UserService {
  // sign access token
  private signAccessToken = ({ userId, email }: { userId: string; email: string }) => {
    return signToken({
      payload: { userId, email },
      secretKey: envConfig.JWT_SECRET_ACCESS_TOKEN,
      options: { expiresIn: envConfig.ACCESS_TOKEN_EXPIRES_IN }
    })
  }
  // sign refresh token
  private signRefreshToken = ({ userId, email }: { userId: string; email: string }) => {
    return signToken({
      payload: { userId, email },
      secretKey: envConfig.JWT_SECRET_REFRESH_TOKEN,
      options: { expiresIn: envConfig.REFRESH_TOKEN_EXPIRES_IN }
    })
  }
  // sign access and refresh token
  private sign_Access_Refresh_Token = ({ userId, email }: { userId: string; email: string }) => {
    return Promise.all([this.signAccessToken({ userId, email }), this.signRefreshToken({ userId, email })])
  }
  // decode access token
  private decodeAccessToken = async (accessToken: string) => {
    return await verifyToken({ token: accessToken, secretKey: envConfig.JWT_SECRET_ACCESS_TOKEN })
  }
  // decode refresh token
  private decodeRefreshToken = async (refreshToken: string) => {
    return await verifyToken({ token: refreshToken, secretKey: envConfig.JWT_SECRET_REFRESH_TOKEN })
  }
  /**
   * create new user
   */
  public createUser = async ({
    name,
    phone_number,
    email,
    password
  }: {
    name: string
    phone_number: string
    email: string
    password: string
  }) => {
    return await databaseSetvices.users.insertOne(
      new User({ name, phone_number, email, password: hashPassword(password), role: 'user' })
    )
  }
  /**
   *  find user by email
   */
  public findUserByEmail = async (email: string) => {
    return await databaseSetvices.users.findOne({ email })
  }
  /**
   * find user by emal and password
   */
  public findUserByEmailAndPassword = async (email: string, password: string) => {
    return await databaseSetvices.users.findOne({ email, password: hashPassword(password) })
  }
  /**
   * login
   */
  public login = async ({ user_id, email }: { user_id: ObjectId; email: string }) => {
    const [access_token, refresh_token] = await this.sign_Access_Refresh_Token({ userId: user_id.toString(), email })
    const decodeRefreshToken = await this.decodeRefreshToken(refresh_token)
    const decodeAccessToken = await this.decodeAccessToken(access_token)
    const [_, user] = await Promise.all([
      await refreshTokenServices.createRefreshToken({
        token: refresh_token,
        user_id: new ObjectId(decodeRefreshToken.userId),
        iat: decodeRefreshToken.iat,
        exp: decodeRefreshToken.exp
      }),
      await this.findUserByEmail(email)
    ])
    if (!user) throw new ErrorWithMessage({ message: 'User not found', status: 404 })
    return { access_token, exp_AT: decodeAccessToken.exp, refresh_token, exp_RT: decodeRefreshToken.exp, user }
  }
  /**
   * logout
   */
  public logout = async (refresh_token: string) => {
    return await refreshTokenServices.deleteRefreshToken(refresh_token)
  }
  /**
   * refresh token
   */
  public refreshToken = async (refresh_token: string) => {
    const decodeRefreshToken = await this.decodeRefreshToken(refresh_token)
    const { userId, email, exp, iat } = decodeRefreshToken
    const [result] = await Promise.all([
      this.sign_Access_Refresh_Token({ userId, email }),
      refreshTokenServices.deleteRefreshToken(refresh_token)
    ])
    const [_, user, decodeAccessToken] = await Promise.all([
      await refreshTokenServices.createRefreshToken({
        token: result[1],
        user_id: new ObjectId(userId),
        iat,
        exp
      }),
      await this.findUserByEmail(decodeRefreshToken.email),
      await this.decodeAccessToken(result[0])
    ])
    if (!user)
      throw new ErrorWithMessage({
        message: responseMessage.error.unauthorized.user_not_exists,
        status: statusCode.NOT_FOUND
      })
    return {
      access_token: result[0],
      exp_AT: decodeAccessToken.exp,
      refresh_token: result[1],
      exp_RT: decodeRefreshToken.exp,
      user: omit(user, ['password'])
    }
  }
  public async getUserProfile(user_id: string) {
    const user = await databaseSetvices.users.findOne({ _id: new ObjectId(user_id) })
    return omit(user, ['password'])
  }
  public async updateUserProfile(body: ProfileBody) {
    const user = await databaseSetvices.users.findOneAndUpdate(
      { _id: new ObjectId(body._id) },
      {
        $set: {
          ...omit(body, ['_id']),
          updated_at: new Date().toISOString()
        }
      }
    )
    if (!user)
      throw new ErrorWithMessage({
        message: responseMessage.error.unauthorized.user_not_exists,
        status: statusCode.NOT_FOUND
      })
    return omit(user, ['password'])
  }
  public async getAllUser({ page, limit }: { page: number; limit: number }) {
    const [totalSize, result] = await Promise.all([
      databaseSetvices.users.countDocuments(),
      databaseSetvices.users
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray()
    ])
    return [totalSize, result]
  }
  public async deleteUser(user_id: string) {
    const user = await databaseSetvices.users.findOneAndDelete({ _id: new ObjectId(user_id) })
    if (!user)
      throw new ErrorWithMessage({
        message: responseMessage.error.unauthorized.user_not_exists,
        status: statusCode.NOT_FOUND
      })
    return omit(user.value, ['password'])
  }

  public async updateUser(user_id: string, body: any) {
    const user = await databaseSetvices.users.findOneAndUpdate(
      { _id: new ObjectId(user_id) },
      { $set: { ...body } },
      { returnDocument: 'after' }
    )
    if (!user)
      throw new ErrorWithMessage({
        message: responseMessage.error.unauthorized.user_not_exists,
        status: statusCode.NOT_FOUND
      })
    return omit(user.value, ['password'])
  }

  public async getUserById(user_id: string) {
    const user = await databaseSetvices.users.findOne({ _id: new ObjectId(user_id) })
    if (!user) {
      return null
    }
    return omit(user, ['password'])
  }
  public async createUserAccount(data: CreateAccountBody) {
    return await databaseSetvices.users.insertOne(
      new User({
        email: data.email,
        password: hashPassword(data.password),
        name: data.name,
        phone_number: data.phone_number,
        role: data.role,
        address: data.address,
        gender: data.gender,
        cccd: data.cccd,
        avatar: data.avatar,
        date_of_birth: data.date_of_birth
      })
    )
  }
  public async findUserById(user_id: string) {
    return await databaseSetvices.users.findOne({ _id: new ObjectId(user_id) })
  }
  public async changePassword(user_id: string, password: string) {
    const user = await databaseSetvices.users.findOneAndUpdate(
      { _id: new ObjectId(user_id) },
      { $set: { password: hashPassword(password) } },
      { returnDocument: 'after' }
    )
    if (!user)
      throw new ErrorWithMessage({
        message: responseMessage.error.unauthorized.user_not_exists,
        status: statusCode.NOT_FOUND
      })
    return omit(user, ['password'])
  }
  public getAll = async () => {
    return await databaseSetvices.users.find().toArray()
  }
}
const userService = new UserService()

export default userService

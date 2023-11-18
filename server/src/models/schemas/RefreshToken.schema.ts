import { ObjectId } from 'mongodb'

interface RefreshTokenType {
  _id?: ObjectId
  token: string
  iat: number
  exp: number
  created_at?: Date
  user_id: ObjectId
}

export default class RefreshToken {
  _id?: ObjectId
  token: string
  iat: Date
  exp: Date
  created_at?: Date
  user_id: ObjectId

  constructor({ _id, token, created_at, user_id, iat, exp }: RefreshTokenType) {
    this._id = _id || new ObjectId()
    this.token = token
    this.user_id = user_id
    this.iat = new Date(iat * 1000)
    this.exp = new Date(exp * 1000)
    this.created_at = created_at || new Date()
  }
}

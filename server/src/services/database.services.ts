import { Collection, Db, MongoClient } from 'mongodb'
import User from '~/models/schemas/User.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import envConfig from '~/constants/config'
import Room from '~/models/schemas/Room.schema'
import { Utility } from '~/models/schemas/Utility.schema'
import Booking from '~/models/schemas/Booking.schema'
const uri = `mongodb+srv://${envConfig.DB_USERNAME}:${envConfig.DB_PASSWORD}@quanlyphongtro.zumwed9.mongodb.net/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

class DatabaseServices {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(envConfig.DB_NAME)
  }
  async connect() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await this.client.connect()
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } finally {
      // Ensures that the client will close when you finish/error
      // await this.client.close()
    }
  }
  get users(): Collection<User> {
    return this.db.collection(envConfig.DB_USERS_COLLECTION)
  }
  get refresh_tokens(): Collection<RefreshToken> {
    return this.db.collection(envConfig.DB_REFRESH_TOKENS_COLLECTION)
  }
  get rooms(): Collection<Room> {
    return this.db.collection(envConfig.DB_ROOMS_COLLECTION)
  }
  get utilities(): Collection<Utility> {
    return this.db.collection(envConfig.DB_UTILITIES_COLLECTION)
  }
  get bookings(): Collection<Booking> {
    return this.db.collection(envConfig.DB_BOOKINGS_COLLECTION)
  }
}
const databaseSetvices = new DatabaseServices()
export default databaseSetvices

import Room from '~/models/schemas/Room.schema'
import databaseSetvices from './database.services'
import { CreateRoomBody } from '~/models/requests/Room.requests'
import { ObjectId } from 'mongodb'
import { UtilityStatus } from '~/models/schemas/Utility.schema'
import { RoomStatus } from '~/constants/room'

class RoomService {
  public createRoom = async (room: CreateRoomBody) => {
    const utilities = await databaseSetvices.utilities
      .find({ _id: { $in: room.utilities.map((id) => new ObjectId(id)) } })
      .toArray()
    // create new room
    const newRoom = new Room({
      address: room.address,
      area: room.area,
      status: room.status,
      capacity: room.capacity,
      deposit: room.deposit,
      description: room.description,
      images: Array.isArray(room.images) ? room.images : [room.images],
      name: room.name,
      price: room.price,
      utilities: [
        ...utilities.map((utility) => ({
          _id: utility._id,
          name: utility.name,
          price: utility.price,
          unit: utility.unit,
          status: UtilityStatus.default
        }))
      ]
    })
    // insert new room to database
    return await databaseSetvices.rooms.insertOne(newRoom)
  }
  public async getRooms({
    condition,
    sort_by,
    order,
    page,
    limit
  }: {
    condition: any
    sort_by: string
    order: string
    page: number
    limit: number
  }) {
    console.log(condition, sort_by, order, page, limit)
    const [rooms, totalRooms] = await Promise.all([
      databaseSetvices.rooms
        .find(condition)
        .sort({
          [sort_by]: order === 'asc' ? 1 : -1
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
      databaseSetvices.rooms.countDocuments(condition)
    ])
    return {
      rooms,
      paginate: {
        page,
        limit,
        totalItems: totalRooms,
        page_size: Math.ceil(totalRooms / limit)
      }
    }
  }
  public getAllRooms = async () => {
    return await databaseSetvices.rooms.find().toArray()
  }
  public getRoomById = async (id: string) => {
    return await databaseSetvices.rooms.findOne({ _id: new ObjectId(id) })
  }
  public getRoomByName = async (name: string) => {
    return await databaseSetvices.rooms.findOne({ name })
  }
  public filterRooms = async ({
    address,
    _price,
    _area,
    _capacity
  }: {
    address: string
    _price: number
    _area: number
    _capacity: number
  }) => {
    return await databaseSetvices.rooms
      .find({
        address: { $regex: address, $options: 'i' },
        price: { $lte: _price },
        area: { $gte: _area },
        capacity: { $gte: _capacity }
      })
      .toArray()
  }
  public updateRoom = async (id: string, room: CreateRoomBody) => {
    const utilities = await databaseSetvices.utilities
      .find({ _id: { $in: room.utilities.map((id) => new ObjectId(id)) } })
      .toArray()
    const newRoom = new Room({
      _id: new ObjectId(id),
      address: room.address,
      area: room.area,
      status: room.status,
      capacity: room.capacity,
      deposit: room.deposit,
      description: room.description,
      images: Array.isArray(room.images) ? room.images : [room.images],
      name: room.name,
      price: room.price,
      roomer: room.status === RoomStatus.available ? new ObjectId() : new ObjectId(room.roomer),
      created_at: room.created_at,
      utilities: [
        ...utilities.map((utility) => ({
          _id: utility._id,
          name: utility.name,
          price: utility.price,
          unit: utility.unit,
          status: UtilityStatus.default
        }))
      ]
    })
    return await databaseSetvices.rooms.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...newRoom,
          updated_at: new Date().toISOString()
        }
      }
    )
  }
  public deleteRoom = async (id: string) => {
    return await databaseSetvices.rooms.deleteOne({ _id: new ObjectId(id) })
  }
  public getRoomsAvailable = async ({ condition, sort_by, order, page, limit }: any) => {
    // console.log(condition, sort_by, order, page, limit)
    const [rooms, totalRooms] = await Promise.all([
      databaseSetvices.rooms
        .find({
          ...condition,
          status: RoomStatus.available
        })
        .sort({
          [sort_by]: order === 'asc' ? 1 : -1
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
      databaseSetvices.rooms.countDocuments({
        ...condition,
        status: RoomStatus.available
      })
    ])
    return {
      rooms,
      paginate: {
        page,
        limit,
        totalItems: totalRooms,
        page_size: Math.ceil(totalRooms / limit)
      }
    }
  }
  public getAllRoomsSamePrice = async (price: number, exclude: string) => {
    return await databaseSetvices.rooms
      .find({
        price,
        _id: { $ne: new ObjectId(exclude) }
      })
      .toArray()
  }
}
const roomService = new RoomService()
export default roomService

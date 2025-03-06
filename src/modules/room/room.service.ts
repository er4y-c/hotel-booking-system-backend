import { Injectable, Inject } from '@nestjs/common';
import { Db, Collection, ObjectId } from 'mongodb';

import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  private collection: Collection;
  constructor(@Inject('MONGO_CONNECTION') private readonly db: Db) {
    this.collection = this.db.collection('rooms');
  }

  async create(createRoomDto: CreateRoomDto) {
    const result = await this.collection.insertOne(createRoomDto);
    return { _id: result.insertedId, ...createRoomDto };
  }

  async findAll() {
    return await this.collection.find().toArray();
  }

  async findOne(id: string) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateRoomDto },
    );
    return { _id: id, ...updateRoomDto };
  }

  async remove(id: string) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
    return { message: 'Room deleted successfully' };
  }

  async findByHotelId(hotelId: string) {
    return await this.collection.find({ hotelId }).toArray();
  }
}

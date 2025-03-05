import { Injectable, Inject } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Injectable()
export class HotelService {
  private readonly hotelCollection;

  constructor(@Inject('MONGO_CONNECTION') private readonly db: any) {
    this.hotelCollection = this.db.collection('hotels');
  }

  async create(createHotelDto: CreateHotelDto) {
    const result = await this.hotelCollection.insertOne(createHotelDto);
    return { id: result.insertedId, ...createHotelDto };
  }

  async findAll() {
    return await this.hotelCollection.find().toArray();
  }

  async findOne(id: string) {
    return await this.hotelCollection.findOne({ _id: new ObjectId(id) });
  }

  async update(id: string, updateHotelDto: UpdateHotelDto) {
    await this.hotelCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateHotelDto },
    );
    return { id, ...updateHotelDto };
  }

  async remove(id: string) {
    await this.hotelCollection.deleteOne({ _id: new ObjectId(id) });
    return { message: 'Hotel removed successfully.' };
  }
}

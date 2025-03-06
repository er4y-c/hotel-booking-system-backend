import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';

@Injectable()
export class ValidateHotelPipe implements PipeTransform {
  constructor(@Inject('MONGO_CONNECTION') private readonly db: Db) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      const hotelId = value?.hotelId;
      if (!hotelId) {
        throw new BadRequestException('hotelId is required');
      }
      const hotel = await this.db
        .collection('hotels')
        .findOne({ _id: new ObjectId(hotelId) });
      if (!hotel) {
        throw new NotFoundException('Hotel not found');
      }
      return value;
    } else {
      return value;
    }
  }
}

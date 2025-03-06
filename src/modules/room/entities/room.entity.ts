import { RoomCategory } from '../dto/create-room.dto';

export class Room {
  _id?: string;
  category: RoomCategory;
  basePrice: number;
  hotelId: string;
  roomNumber: string;
}

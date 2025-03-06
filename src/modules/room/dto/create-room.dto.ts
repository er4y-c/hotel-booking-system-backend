import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsEnum } from 'class-validator';

export enum RoomCategory {
  BASIC = 'Basic',
  PREMIUM = 'Premium',
  SUITE = 'Suite',
}

export class CreateRoomDto {
  @ApiProperty({
    enum: RoomCategory,
    description: 'Room category',
    example: RoomCategory.BASIC,
  })
  @IsEnum(RoomCategory)
  category: RoomCategory;

  @ApiProperty({ description: 'Base price of the room', example: 5000 })
  @IsNumber()
  @Min(1)
  basePrice: number;

  @ApiProperty({
    description: 'Hotel ID associated with the room',
    example: '67c9626f7d2009b5d201fe12',
  })
  @IsString()
  hotelId: string;

  @ApiProperty({ description: 'Room number', example: '101' })
  @IsString()
  roomNumber: string;
}

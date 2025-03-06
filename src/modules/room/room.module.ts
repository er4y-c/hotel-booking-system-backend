import { Module } from '@nestjs/common';

import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { ValidateHotelPipe } from 'src/common/pipes/hotel.pipe';
import { DatabaseModule } from 'src/shared/db/database.module';

@Module({
  imports: [DatabaseModule], // Import the DatabaseModule providing DATABASE_CONNECTION
  controllers: [RoomController],
  providers: [RoomService, ValidateHotelPipe],
})
export class RoomModule {}

import { PartialType, OmitType } from '@nestjs/swagger';

import { CreateRoomDto } from './create-room.dto';

export class UpdateRoomDto extends PartialType(
  OmitType(CreateRoomDto, ['hotelId'] as const),
) {}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { Public } from 'src/common/decorators';
import { ValidateHotelPipe } from 'src/common/pipes/hotel.pipe';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@ApiTags('room')
@Controller('api/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new room' })
  @ApiResponse({ status: 201, description: 'Room created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Post()
  @UsePipes(ValidateHotelPipe)
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all rooms' })
  @ApiResponse({ status: 200, description: 'Returned all rooms.' })
  @ApiResponse({ status: 404, description: 'Rooms not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get a room by id' })
  @ApiParam({ name: 'id', description: 'The id of the room' })
  @ApiResponse({ status: 200, description: 'Returned one room.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Get('hotel/:hotelId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get rooms by hotelId' })
  @ApiParam({ name: 'hotelId', description: 'The id of the hotel' })
  @ApiResponse({
    status: 200,
    description: 'Returned rooms filtered by hotelId.',
  })
  @ApiResponse({ status: 404, description: 'Rooms not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  getRoomsByHotelId(@Param('hotelId') hotelId: string) {
    return this.roomService.findByHotelId(hotelId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a room by id' })
  @ApiParam({ name: 'id', description: 'The id of the room' })
  @ApiResponse({ status: 200, description: 'Room updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a room by id' })
  @ApiParam({ name: 'id', description: 'The id of the room' })
  @ApiResponse({ status: 200, description: 'Room deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Room not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Public } from 'src/common/decorators';

@ApiTags('hotel')
@Controller('api/hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new hotel' })
  @ApiResponse({ status: 201, description: 'Hotel created successfully.' })
  @ApiBearerAuth()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelService.create(createHotelDto);
  }

  @Get('list')
  @Public()
  @ApiOperation({ summary: 'Retrieve all hotels' })
  @ApiResponse({ status: 200, description: 'Hotels retrieved successfully.' })
  findAll() {
    return this.hotelService.findAll();
  }

  @Get('details/:id')
  @Public()
  @ApiOperation({ summary: 'Retrieve a specific hotel' })
  @ApiResponse({ status: 200, description: 'Hotel retrieved successfully.' })
  @ApiParam({ name: 'id', description: 'Hotel ID' })
  findOne(@Param('id') id: string) {
    return this.hotelService.findOne(id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a hotel' })
  @ApiResponse({ status: 200, description: 'Hotel updated successfully.' })
  @ApiParam({ name: 'id', description: 'Hotel ID' })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelService.update(id, updateHotelDto);
  }

  @Delete('remove/:id')
  @ApiOperation({ summary: 'Remove a hotel' })
  @ApiResponse({ status: 200, description: 'Hotel removed successfully.' })
  @ApiParam({ name: 'id', description: 'Hotel ID' })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.hotelService.remove(id);
  }
}

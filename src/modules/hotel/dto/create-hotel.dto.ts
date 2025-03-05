import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateHotelDto {
  @ApiProperty({ example: 'Hotel California' })
  @IsString()
  name: string;

  @ApiProperty({ example: '42 Sunset Boulevard' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'A hotel in California' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'johndoe@example.com' })
  @IsEmail()
  contactMail: string;

  @ApiProperty({ example: '+905555555555' })
  @IsPhoneNumber()
  contactPhone: string;

  @ApiProperty({ example: ['/default1.jpg', '/default2.jpg', '/default3.jpg'] })
  @IsArray()
  @IsString({ each: true })
  gallery: string[];
}

import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../auth.interface';

export class RegisterUserDto {
  @ApiProperty({
    example: 'John',
    description: 'The name of the new user',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The surname of the new user',
  })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty({
    example: '05555555555',
    description: 'The phone number of the new user',
  })
  @IsPhoneNumber('TR')
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'The email of the new user',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'The password of the new user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '67c05e058c6ff1c708244471',
    description:
      'The ID of the user who created the new user. If this value is given, the Id value must be owned by an admin user.',
  })
  creatorId?: string;

  @ApiProperty({
    example: 'customer',
    description: 'The role of the new user. Default value is customer.',
    enum: Role,
    enumName: 'Role',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  role?: Role.CUSTOMER;
}

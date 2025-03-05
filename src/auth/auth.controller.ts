import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Req,
  Get,
  Post,
  UseGuards,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { Request } from 'express';

import { Public, ReqUser } from 'src/common/decorators';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from './dto';
import { ChangePasswordDto, ForgotPasswordDto } from './dto/update-password';
import { Role } from './auth.interface';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up with new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid user data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({ type: RegisterUserDto })
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(
    @ReqUser('role') userRole: Role,
    @Body() registerDto: RegisterUserDto,
  ) {
    if (
      registerDto?.role &&
      registerDto?.role !== Role.CUSTOMER &&
      userRole !== Role.ADMIN
    ) {
      throw new BadRequestException('Admin role required');
    }
    return this.authService.signUp(registerDto);
  }

  @ApiOperation({ summary: 'Sign in with user' })
  @ApiResponse({ status: 200, description: 'User signed in successfully' })
  @ApiResponse({ status: 400, description: 'Invalid user data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({ type: LoginUserDto })
  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() loginDto: LoginUserDto) {
    return this.authService.signIn(loginDto);
  }

  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Return user profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Post('change-password')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Invalid password data' })
  async changePassword(
    @Req() req: Request,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    if (!req.user) {
      throw new Error('User not found');
    }
    if (req.user.role !== Role.ADMIN) {
      throw new UnauthorizedException('Admin role required');
    }
    return this.authService.changePassword(req.user.email, changePasswordDto);
  }

  @Post('forgot-password')
  @Public()
  @ApiOperation({ summary: 'Send password reset link' })
  @ApiResponse({ status: 200, description: 'Reset link sent successfully' })
  @ApiResponse({ status: 400, description: 'Invalid email' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.resetPassword(forgotPasswordDto.email);
  }
}

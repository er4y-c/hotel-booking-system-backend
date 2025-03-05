import {
  BadRequestException,
  Injectable,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { Db, Document, ObjectId, WithId } from 'mongodb';

import { User } from 'src/modules/user/entities/user.entity';
import { RegisterUserDto, LoginUserDto } from './dto';
import { ChangePasswordDto } from './dto/update-password';
import { Role } from './auth.interface';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;
  constructor(@Inject('MONGO_CONNECTION') private readonly db: Db) {
    this.supabase = new SupabaseClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
    );
  }

  async signUp(registerDto: RegisterUserDto) {
    const usersCollection = this.db.collection('users');
    const { data: authData, error } = await this.supabase.auth.signUp({
      email: registerDto.email,
      password: registerDto.password,
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    const newUser = {
      email: registerDto.email,
      supabaseId: authData.user.id,
      name: registerDto.name,
      surname: registerDto.surname,
      phone: registerDto.phone,
      role: registerDto.role || Role.CUSTOMER,
      creator: registerDto.creatorId,
    };
    const result = await usersCollection.insertOne(newUser);
    return {
      message: 'User created successfully',
      user: { id: result.insertedId, email: newUser.email },
    };
  }

  async signIn(authDto: LoginUserDto) {
    const { data: authData, error } =
      await this.supabase.auth.signInWithPassword({
        email: authDto.email,
        password: authDto.password,
      });

    if (error) {
      throw new BadRequestException(error.message);
    }

    const usersCollection = this.db.collection('users');
    const user = await usersCollection.findOne({ email: authDto.email });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    return {
      accessToken: authData.session.access_token,
    };
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const usersCollection = this.db.collection('users');
    const objectId = new ObjectId(userId);
    const user = await usersCollection.findOne({ _id: objectId });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user.password !== changePasswordDto.currentPassword) {
      throw new UnauthorizedException('Current password is incorrect');
    }
    await usersCollection.updateOne(
      { _id: objectId },
      { $set: { password: changePasswordDto.newPassword } },
    );
    return { message: 'Password updated successfully' };
  }

  async resetPassword(email: string) {
    const usersCollection = this.db.collection('users');
    const user = await usersCollection.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    // In a full implementation, send a reset link via email.
    return { message: 'Check your email for reset link' };
  }

  async verifyToken(token: string) {
    const usersCollection = this.db.collection('users');
    let user: WithId<Document>;
    try {
      user = await usersCollection.findOne({ _id: new ObjectId(token) });
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const userEntity = new User(
      user._id.toString(),
      user.name,
      user.surname,
      user.phone,
      user.email,
      user.supabaseUid,
      user.role as Role,
      user.creatorId,
    );
    return userEntity;
  }
}

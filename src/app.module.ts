import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { HotelModule } from './modules/hotel/hotel.module';
import { RoomModule } from './modules/room/room.module';
import config from './shared/config';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: `.env.${process.env.NODE_ENV}.local`,
    }),
    UserModule,
    HotelModule,
    RoomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

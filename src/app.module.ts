import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

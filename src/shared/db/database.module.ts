import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import config from '../config';

@Global()
@Module({
  providers: [
    {
      provide: 'MONGO_CONNECTION',
      useFactory: async () => {
        const client = new MongoClient(config().mongo_url);
        await client.connect();
        return client.db(config().database);
      },
    },
  ],
  exports: ['MONGO_CONNECTION'],
})
export class DatabaseModule {}

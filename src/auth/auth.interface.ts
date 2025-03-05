import { User } from 'src/modules/user/entities/user.entity';

declare module 'express' {
  interface Request {
    user: User | null;
  }
}

export enum Role {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

import { Role } from 'src/auth/auth.interface';

export class User {
  _id: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  supabaseUid: string;
  role: Role;
  creatorId?: string;

  constructor(
    _id: string,
    name: string,
    surname: string,
    phone: string,
    email: string,
    supabaseUid: string,
    role: Role,
    creatorId?: string,
  ) {
    this._id = _id;
    this.name = name;
    this.surname = surname;
    this.phone = phone;
    this.email = email;
    this.supabaseUid = supabaseUid;
    this.role = role;
    this.creatorId = creatorId;
  }
}

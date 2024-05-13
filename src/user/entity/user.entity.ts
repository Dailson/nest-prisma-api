import { AutoMap } from '@automapper/classes';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  last_name: string;

  @AutoMap()
  email: string;

  @AutoMap()
  role: string;

  password: string;
}

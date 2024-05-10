import { AutoMap } from '@automapper/classes';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  email: string;

  password: string;
}

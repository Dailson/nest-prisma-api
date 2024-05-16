import { AutoMap } from '@automapper/classes';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @AutoMap()
  id: number;

  @AutoMap()
  fullName: string;

  @AutoMap()
  email: string;

  @AutoMap()
  role: string;

  @AutoMap()
  pictureUrl: string;

  @AutoMap()
  password: string;
}

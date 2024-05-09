import { AutoMap } from '@automapper/classes';
import { Prisma } from '@prisma/client';

export class User implements Prisma.UserCreateInput {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  email: string;

  password: string;
}

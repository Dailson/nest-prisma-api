import { AutoMap } from '@automapper/classes';

export class UserReadDTO {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  email: string;
}

import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UserReadDTO {
  @ApiProperty()
  @AutoMap()
  id: number;

  @ApiProperty()
  @AutoMap()
  fullName: string;

  @ApiProperty()
  @AutoMap()
  email: string;
}

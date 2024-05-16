import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UserUpdateDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @AutoMap()
  fullName: string;
}

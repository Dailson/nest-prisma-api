import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserUpdateDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @AutoMap()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  @AutoMap()
  last_name: string;
}

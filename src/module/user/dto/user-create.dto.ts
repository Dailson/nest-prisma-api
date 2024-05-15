import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserCreateDTO {
  @ApiProperty()
  @IsNotEmpty()
  @AutoMap()
  name: string;

  @ApiProperty()
  @IsString()
  @AutoMap()
  last_name: string;

  @ApiProperty()
  @IsEmail()
  @AutoMap()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @AutoMap()
  password: string;

  @ApiProperty({ default: 'USER' })
  @IsNotEmpty()
  @AutoMap()
  role: string;
}

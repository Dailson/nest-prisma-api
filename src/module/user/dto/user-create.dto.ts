import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserCreateDTO {
  @ApiProperty()
  @IsNotEmpty()
  @AutoMap()
  fullName: string;

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

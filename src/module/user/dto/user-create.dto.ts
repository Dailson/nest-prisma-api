import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserCreateDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ default: 'USER' })
  @IsNotEmpty()
  role: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class UserUpdateDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}

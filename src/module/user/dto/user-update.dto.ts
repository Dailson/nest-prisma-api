import { OmitType } from '@nestjs/swagger';
import { UserCreateDTO } from './user-create.dto';

export class UserUpdateDTO extends OmitType(UserCreateDTO, [
  'email',
  'password',
]) {}

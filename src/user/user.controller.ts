import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserService } from './user.service';

@Controller({ path: 'users' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userCreateDTO: UserCreateDTO) {
    return await this.userService.create(userCreateDTO);
  }
}

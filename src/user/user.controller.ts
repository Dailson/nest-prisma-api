import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserReadDTO } from './dto/user-read.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller({ path: 'users' })
export class UserController {
  constructor(
    private readonly userService: UserService,

    @InjectMapper()
    private readonly userMapper: Mapper,
  ) {}

  @Post()
  async create(@Body() userCreateDTO: UserCreateDTO): Promise<UserReadDTO> {
    const userCreated = await this.userService.create(userCreateDTO);
    return this.userMapper.mapAsync(userCreated, User, UserReadDTO);
  }
}

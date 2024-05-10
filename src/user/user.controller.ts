import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserReadDTO } from './dto/user-read.dto';
import { UserUpdateDTO } from './dto/user-update.dto';
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
  async create(@Body() userCreateDTO: UserCreateDTO) {
    await this.userService.create(userCreateDTO);
  }

  @Get()
  async findAll(): Promise<UserReadDTO[] | undefined[]> {
    const usersFound = await this.userService.findAll();
    return this.userMapper.mapArrayAsync(usersFound, User, UserReadDTO);
  }

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<UserReadDTO> {
    const userFound = await this.userService.findOneById(id);
    return this.userMapper.mapAsync(userFound, User, UserReadDTO);
  }

  @Put(':id')
  async update(@Param('id') id: number, userUpdateDTO: UserUpdateDTO) {
    return this.userService.update(id, userUpdateDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    this.userService.delete(id);
  }
}

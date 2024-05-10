import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserReadDTO } from './dto/user-read.dto';
import { UserUpdateDTO } from './dto/user-update.dto';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller({ path: 'users' })
export class UserController {
  constructor(
    private readonly userService: UserService,

    @InjectMapper()
    private readonly userMapper: Mapper,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Creates a single User' })
  @ApiCreatedResponse({ type: UserCreateDTO })
  async create(@Body() userCreateDTO: UserCreateDTO) {
    await this.userService.create(userCreateDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Returns an array of Users' })
  @ApiOkResponse({ type: UserReadDTO, isArray: true })
  async findAll(): Promise<UserReadDTO[] | undefined[]> {
    const usersFound = await this.userService.findAll();
    return this.userMapper.mapArrayAsync(usersFound, UserEntity, UserReadDTO);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a single User' })
  @ApiOkResponse({ type: UserReadDTO })
  async findOneById(@Param('id') id: number): Promise<UserReadDTO> {
    const userFound = await this.userService.findOneById(id);
    return this.userMapper.mapAsync(userFound, UserEntity, UserReadDTO);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a single User' })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('id') id: number, @Body() userUpdateDTO: UserUpdateDTO) {
    this.userService.update(id, userUpdateDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a single User' })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number) {
    this.userService.delete(id);
  }
}

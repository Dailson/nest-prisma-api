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
  Query,
  Request,
  Res,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { FileDownload } from '../../../decorator/file-download.decorator';
import { FileUpload } from '../../../decorator/file-upload.decorator';
import { Roles } from '../../auth/decorator/role.decorator';
import { PageResponseDTO } from '../dto/page-response.dto';
import { UserCreateDTO } from '../dto/user-create.dto';
import { UserReadDTO } from '../dto/user-read.dto';
import { UserUpdateDTO } from '../dto/user-update.dto';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@ApiTags('User')
@Controller({ path: 'users' })
export class UserController {
  constructor(
    @InjectMapper()
    private readonly userMapper: Mapper,
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Creates a single User' })
  @ApiCreatedResponse({ type: UserCreateDTO })
  @ApiBearerAuth()
  async create(@Body() userCreateDTO: UserCreateDTO) {
    const userEntity: UserEntity = await this.userMapper.mapAsync(
      userCreateDTO,
      UserCreateDTO,
      UserEntity,
    );
    await this.userService.create(userEntity);
  }

  @Get()
  @ApiOperation({ summary: 'Returns an array of Users' })
  @ApiOkResponse({ type: UserReadDTO, isArray: true })
  @ApiBearerAuth()
  async fetchAll(): Promise<UserReadDTO[] | undefined[]> {
    const usersFound = await this.userService.fetchAll();
    return this.userMapper.mapArrayAsync(usersFound, UserEntity, UserReadDTO);
  }

  @Get('/paged')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'size', required: false, type: Number })
  async fetchAllPaged(
    @Query('page') page?: number,
    @Query('size') size?: number,
  ): Promise<PageResponseDTO<UserReadDTO>> {
    const pageResult = this.userService.fetchAllPaged(page, size);
    const mappedContent = await this.userMapper.mapArrayAsync(
      (await pageResult).content,
      UserEntity,
      UserReadDTO,
    );
    return this.mapContent(pageResult, mappedContent);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a single User' })
  @ApiOkResponse({ type: UserReadDTO })
  @ApiBearerAuth()
  async fetchById(@Param('id') id: number): Promise<UserReadDTO> {
    const userFound = await this.userService.fetchById(id);
    return this.userMapper.mapAsync(userFound, UserEntity, UserReadDTO);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a single User' })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  async update(@Param('id') id: number, @Body() userUpdateDTO: UserUpdateDTO) {
    const userEntityToUpdate: UserEntity = await this.userMapper.mapAsync(
      userUpdateDTO,
      UserUpdateDTO,
      UserEntity,
    );
    this.userService.update(id, userEntityToUpdate);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a single User' })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @Roles('ADMIN')
  async delete(@Param('id') id: number) {
    await this.userService.delete(id);
  }

  @Post('/photo-upload')
  @ApiBearerAuth()
  @FileUpload('image/jpeg')
  @ApiOperation({ summary: 'Upload the profile photo' })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async photoUpload(
    @UploadedFile() file: Express.Multer.File,
    @Request() request,
  ) {
    await this.userService.uploadPicture(file, request);
  }

  @Get('photo-download/:picturename')
  @ApiBearerAuth()
  @FileDownload('image/jpeg')
  @ApiOkResponse()
  async download(
    @Param('picturename') pictureName: string,
    @Res() response: Response,
  ) {
    const picturePathName = await this.userService.downloadPicture(pictureName);
    response.contentType('image/jpeg');
    response.attachment(pictureName);
    response.sendFile(picturePathName);
  }

  private async mapContent(
    pageResult: Promise<PageResponseDTO<UserEntity>>,
    userReadDTO: UserReadDTO[],
  ) {
    return new PageResponseDTO<UserReadDTO>(
      (await pageResult).page,
      (await pageResult).size,
      (await pageResult).totalPages,
      (await pageResult).totalItems,
      (await pageResult).last,
      userReadDTO,
    );
  }
}

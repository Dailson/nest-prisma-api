import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Controller, Post, Req, UploadedFile } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { FileUpload } from './decorator/file-upload.decorator';
import { FileReadDTO } from './dto/file-read.dto';
import { FileEntity } from './entity/file.entity';
import { FileService } from './file.service';

@Controller({ path: '/files' })
@ApiTags('File')
export class FileController {
  constructor(
    private readonly fileService: FileService,

    @InjectMapper()
    private readonly fileMapper: Mapper,
  ) {}

  @Post('/upload')
  @ApiOperation({ summary: 'Upload a single file' })
  @FileUpload()
  @ApiBearerAuth()
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
  ): Promise<FileReadDTO> {
    const fileSaved = await this.fileService.upload(file, request);
    return this.fileMapper.mapAsync(fileSaved, FileEntity, FileReadDTO);
  }
}

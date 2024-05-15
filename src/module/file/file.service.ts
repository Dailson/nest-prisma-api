import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../../config/prisma/prisma.service';
import { FileEntity } from './entity/file.entity';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  async upload(file: Express.Multer.File, request: Request) {
    const fileToSave = new FileEntity();
    fileToSave.file_name = file.filename;
    fileToSave.content_length = file.size;
    fileToSave.content_type = file.mimetype;
    fileToSave.user_id = 1;
    fileToSave.url = `${request.protocol}://${request.get('host')}/files/${file.filename}`;

    return this.prisma.file.create({ data: fileToSave });
  }
}

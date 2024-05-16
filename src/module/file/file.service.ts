import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { PrismaService } from '../../prisma/prisma.service';
import { FileEntity } from './entity/file.entity';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  async upload(file: Express.Multer.File, request: any) {
    const fileToSave = new FileEntity();
    fileToSave.fileName = file.filename;
    fileToSave.contentLength = file.size;
    fileToSave.contentType = file.mimetype;
    fileToSave.userId = request.user.id;
    fileToSave.originalName = file.originalname;

    // fileToSave.url = `${request.protocol}://${request.get('host')}/files/${file.filename}`;

    return await this.prisma.$transaction([
      this.prisma.file.create({ data: fileToSave }),
    ]);
  }

  async download(fileName: string): Promise<string> {
    return join(process.cwd() + '/upload/' + fileName);
  }
}

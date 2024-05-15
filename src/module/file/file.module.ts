import { Module } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileProfile } from './mapper/file.mapper';

@Module({
  controllers: [FileController],
  providers: [FileService, FileProfile, PrismaService],
  exports: [FileService],
})
export class FileModule {}

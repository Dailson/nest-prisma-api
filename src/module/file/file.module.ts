import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FileService } from './file.service';
import { FileProfile } from './mapper/file.mapper';

@Module({
  controllers: [],
  providers: [FileService, FileProfile, PrismaService],
  exports: [FileService],
})
export class FileModule {}

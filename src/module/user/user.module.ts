import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';

import { FileService } from '../file/file.service';
import { UserController } from './controller/user.controller';
import { UserProfile } from './mapper/user-mapper';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, UserProfile, FileService],
  exports: [UserService],
  imports: [PrismaModule],
})
export class UserModule {}

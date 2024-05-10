import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UserProfile } from './mapper/user-mapper';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UserProfile],
  exports: [UserService],
})
export class UserModule {}

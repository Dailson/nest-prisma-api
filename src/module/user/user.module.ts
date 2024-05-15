import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';

import { UserController } from './controller/user.controller';
import { UserProfile } from './mapper/user-mapper';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, UserProfile],
  exports: [UserService],
  imports: [PrismaModule],
})
export class UserModule {}

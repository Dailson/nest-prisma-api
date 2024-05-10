import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

import { UserProfile } from './mapper/user-mapper';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserProfile],
  exports: [UserService],
  imports: [PrismaModule],
})
export class UserModule {}

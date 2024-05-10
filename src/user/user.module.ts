import { Module } from '@nestjs/common';
import { UserProfile } from './mapper/user-mapper';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserProfile],
  exports: [UserService],
})
export class UserModule {}

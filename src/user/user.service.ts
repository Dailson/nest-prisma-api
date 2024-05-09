import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UserCreateDTO } from './dto/user-create.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  create(user: UserCreateDTO) {
    return this.prisma.user.create({ data: user });
  }
}

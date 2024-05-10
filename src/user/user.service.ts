import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserUpdateDTO } from './dto/user-update.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userCreateDTO: UserCreateDTO) {
    await this.prisma.user.create({ data: userCreateDTO });
  }

  async findAll(): Promise<User[] | undefined> {
    return await this.prisma.user.findMany();
  }

  async findOneById(userId: number): Promise<User> {
    return this.prisma.user
      .findUnique({ where: { id: userId } })
      .catch((error) => {
        console.error(error);
        throw new NotFoundException();
      });
  }

  async findOneByEmail(userEmail: string): Promise<User> {
    return await this.prisma.user
      .findUnique({
        where: { email: userEmail },
      })
      .catch((error) => {
        console.log(error);
        throw new NotFoundException();
      });
  }

  async update(userId: number, userUpdateDTO: UserUpdateDTO) {
    this.findOneById(userId);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: userUpdateDTO,
    });
  }

  async delete(userId: number) {
    this.findOneById(userId);
    await this.prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });
  }
}

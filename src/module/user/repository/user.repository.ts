import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';
import { PageResponseDTO } from '../dto/page-response.dto';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userEntity: UserEntity): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.user.create({ data: userEntity }),
    ]);
  }

  async fetchAll(): Promise<UserEntity[] | undefined[]> {
    return await this.prisma.user.findMany();
  }

  async fetchById(userId: number): Promise<UserEntity | undefined> {
    return this.prisma.user
      .findUniqueOrThrow({ where: { id: userId } })
      .catch(() => {
        throw new NotFoundException();
      });
  }

  async fetchByEmail(userEmail: string): Promise<UserEntity | undefined> {
    return await this.prisma.user
      .findUniqueOrThrow({
        where: { email: userEmail },
      })
      .catch(() => {
        throw new NotFoundException();
      });
  }

  async fetchAllPaged(
    page?: number,
    size?: number,
    orderBy?: string,
    direction?: string,
  ): Promise<PageResponseDTO<UserEntity>> {
    const [totalItems, content] = await this.prisma.$transaction([
      this.prisma.user.count(),
      this.prisma.user.findMany({
        take: size,
        skip: (page - 1) * size,
        orderBy: {
          [orderBy]: direction,
        },
      }),
    ]);

    const totalPages = Math.ceil(totalItems / size);

    const isLastPage = page === totalPages;

    return new PageResponseDTO<UserEntity>(
      page,
      size,
      totalPages,
      totalItems,
      isLastPage,
      content,
    );
  }

  async update(userId: number, userData: any) {
    this.fetchById(userId);
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: {
          id: userId,
        },
        data: userData,
      }),
    ]);
  }

  async delete(userId: number) {
    await this.fetchById(userId);
    await this.prisma.$transaction([
      this.prisma.user.delete({
        where: {
          id: userId,
        },
      }),
    ]);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Page } from '../../../const/page-constant';
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
  ): Promise<PageResponseDTO<UserEntity>> {
    if (Number.isNaN(page)) {
      page = Page.DEFAULT_PAGE;
    }
    if (Number.isNaN(size)) {
      size = Page.DEFAULT_PAGE_SIZE;
    }

    const content = await this.prisma.user.findMany({
      take: size,
      skip: (page - 1) * size,
    });

    const totalItems = await this.prisma.user.count();

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

  async update(userId: number, userEntity: UserEntity) {
    this.fetchById(userId);
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: {
          id: userId,
        },
        data: userEntity,
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

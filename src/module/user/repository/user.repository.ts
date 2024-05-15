import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../config/prisma/prisma.service';
import { PageResponseDTO } from '../dto/page-response.dto';
import { UserCreateDTO } from '../dto/user-create.dto';
import { UserUpdateDTO } from '../dto/user-update.dto';
import { UserEntity } from '../entity/user.entity';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userEntity: UserCreateDTO): Promise<void> {
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
      page = DEFAULT_PAGE;
    }
    if (Number.isNaN(size)) {
      size = DEFAULT_PAGE_SIZE;
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

  async update(userId: number, userUpdateDTO: UserUpdateDTO) {
    this.fetchById(userId);
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: {
          id: userId,
        },
        data: userUpdateDTO,
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

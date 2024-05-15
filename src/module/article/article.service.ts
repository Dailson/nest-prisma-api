import { Injectable, NotFoundException } from '@nestjs/common';
import { Article } from '@prisma/client';
import { PrismaService } from '../../config/prisma/prisma.service';
import { ArticleCreateDTO } from './dto/article-create.dto';
import { ArticleUpdateDTO } from './dto/article-update.dto';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(articleCreateDTO: ArticleCreateDTO): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.article.create({ data: articleCreateDTO }),
    ]);
  }

  async findAll(): Promise<Article[] | undefined[]> {
    return await this.prisma.article.findMany({
      include: {
        author: true,
      },
    });
  }

  async findOneById(articleId: number): Promise<Article> {
    return await this.prisma.article
      .findFirstOrThrow({
        where: {
          id: articleId,
        },
        include: {
          author: true,
        },
      })
      .catch((error) => {
        console.error(error);
        throw new NotFoundException();
      });
  }
  async update(
    articleId: number,
    articleUpdateDTO: ArticleUpdateDTO,
  ): Promise<void> {
    await this.findOneById(articleId);
    await this.prisma.$transaction([
      this.prisma.article.update({
        where: {
          id: articleId,
        },
        data: articleUpdateDTO,
      }),
    ]);
  }

  async delete(articleId: number): Promise<void> {
    await this.findOneById(articleId);
    await this.prisma.article.delete({ where: { id: articleId } });
  }
}

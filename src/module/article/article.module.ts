import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleProfile } from './mapper/article-mapper';

@Module({
  providers: [ArticleService, ArticleProfile],
  controllers: [ArticleController],
  exports: [ArticleService],
  imports: [PrismaModule],
})
export class ArticleModule {}

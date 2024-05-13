import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { ArticleCreateDTO } from './dto/article-create.dto';
import { ArticleReadDTO } from './dto/article-read.dto';
import { ArticleUpdateDTO } from './dto/article-update.dto';
import { ArticleEntity } from './entity/article.entity';

@ApiTags('Article')
@Controller({ path: 'articles' })
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,

    @InjectMapper()
    private readonly articleMapper: Mapper,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create an article' })
  @ApiCreatedResponse({ type: ArticleCreateDTO })
  async create(@Body() articleCreateDTO: ArticleCreateDTO): Promise<void> {
    await this.articleService.create(articleCreateDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Retrives an array of articles' })
  @ApiOkResponse({ type: ArticleReadDTO })
  async findAll(): Promise<ArticleReadDTO[] | undefined[]> {
    const articlesFound = await this.articleService.findAll();
    return await this.articleMapper.mapArrayAsync(
      articlesFound,
      ArticleEntity,
      ArticleReadDTO,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrives a single article by its id' })
  @ApiOkResponse({ type: ArticleReadDTO })
  async findOneById(@Param('id') articleId: number): Promise<ArticleReadDTO> {
    const articleFound = await this.articleService.findOneById(articleId);
    return this.articleMapper.mapAsync(
      articleFound,
      ArticleEntity,
      ArticleReadDTO,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates an article by its id' })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') articleId: number,
    @Body() articleUpdateDTO: ArticleUpdateDTO,
  ): Promise<void> {
    await this.articleService.update(articleId, articleUpdateDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Removes an article by its id' })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') articleId: number): Promise<void> {
    await this.articleService.delete(articleId);
  }
}

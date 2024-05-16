import { OmitType } from '@nestjs/swagger';
import { ArticleCreateDTO } from './article-create.dto';

export class ArticleUpdateDTO extends OmitType(ArticleCreateDTO, [
  'authorId',
] as const) {}

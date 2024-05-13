import { OmitType } from '@nestjs/swagger';
import { ArticleCreateDTO } from './article-create.dto';

export class ArticleUpdateDTO extends OmitType(ArticleCreateDTO, [
  'author_id',
] as const) {}

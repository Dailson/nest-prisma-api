import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ArticleCreateDTO } from '../dto/article-create.dto';
import { ArticleReadDTO } from '../dto/article-read.dto';
import { ArticleEntity } from '../entity/article.entity';

@Injectable()
export class ArticleProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, ArticleEntity, ArticleReadDTO);
      createMap(mapper, ArticleCreateDTO, ArticleEntity);
    };
  }
}

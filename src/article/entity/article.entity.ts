import { AutoMap } from '@automapper/classes';
import { Article } from '@prisma/client';
import { UserEntity } from '../../user/entity/user.entity';

export class ArticleEntity implements Article {
  @AutoMap()
  id: number;

  @AutoMap()
  title: string;

  @AutoMap()
  description: string;

  @AutoMap()
  body: string;

  @AutoMap()
  is_published: boolean;

  @AutoMap()
  author_id: number;

  @AutoMap(() => [UserEntity])
  author: UserEntity;

  @AutoMap()
  created_at: Date;

  @AutoMap()
  updated_at: Date;
}

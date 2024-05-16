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
  isPublished: boolean;

  @AutoMap()
  authorId: number;

  @AutoMap(() => [UserEntity])
  author: UserEntity;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}

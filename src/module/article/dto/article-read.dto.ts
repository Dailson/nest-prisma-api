import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { UserReadDTO } from '../../user/dto/user-read.dto';

export class ArticleReadDTO {
  @ApiProperty()
  @AutoMap()
  id: number;

  @ApiProperty()
  @AutoMap()
  title: string;

  @ApiProperty()
  @AutoMap()
  description: string;

  @ApiProperty()
  @AutoMap()
  body: string;

  @ApiProperty()
  @AutoMap()
  isPublished: boolean;

  @ApiProperty()
  @AutoMap()
  authorId: number;

  @ApiProperty()
  @AutoMap()
  createdAt: Date;

  @ApiProperty()
  @AutoMap()
  updatedAt: Date;

  @ApiProperty()
  @AutoMap(() => [UserReadDTO])
  author: UserReadDTO;
}

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
  is_published: boolean;

  @ApiProperty()
  @AutoMap()
  author_id: number;

  @ApiProperty()
  @AutoMap()
  created_at: Date;

  @ApiProperty()
  @AutoMap()
  updated_at: Date;

  @ApiProperty()
  @AutoMap(() => [UserReadDTO])
  author: UserReadDTO;
}

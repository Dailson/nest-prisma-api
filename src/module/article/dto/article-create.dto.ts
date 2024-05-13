import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class ArticleCreateDTO {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  body: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  is_published: boolean;

  @IsNotEmpty()
  @IsNumber()
  author_id: number;
}

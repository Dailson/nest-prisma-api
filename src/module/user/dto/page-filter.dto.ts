import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ApplicationConstants } from '../../../const/page-constant';

export class PageFilterDTO {
  @ApiProperty({
    name: 'page',
    default: ApplicationConstants.DEFAULT_PAGE,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  page?: number = ApplicationConstants.DEFAULT_PAGE;

  @ApiProperty({
    name: 'size',
    default: ApplicationConstants.DEFAULT_PAGE_SIZE,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  size?: number = ApplicationConstants.DEFAULT_PAGE_SIZE;
}

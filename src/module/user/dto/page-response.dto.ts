import { ApiProperty } from '@nestjs/swagger';
import { ApplicationConstants } from '../../../const/page-constant';

export class PageResponseDTO<T> {
  @ApiProperty({ default: ApplicationConstants.DEFAULT_PAGE })
  page: number;

  @ApiProperty({ default: ApplicationConstants.DEFAULT_PAGE_SIZE })
  size: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  last: boolean;

  @ApiProperty()
  results: T[];

  constructor(
    page: number,
    size: number,
    totalPages: number,
    totalItems: number,
    last: boolean,
    content: T[],
  ) {
    this.page = page;
    this.size = size;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
    this.last = last;
    this.results = content;
  }
}

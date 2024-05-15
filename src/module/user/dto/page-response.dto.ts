export class PageResponseDTO<T> {
  page: number;
  size: number;
  totalPages: number;
  totalItems: number;
  last: boolean;
  content: T[];

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
    this.content = content;
  }
}

export class GenericPageRequestDto {
  page: number;
  size: number;
  sort?: string;
  filter?: string;

  constructor(page = 1, size = 10, sort?: string, filter?: string) {
    this.page = page;
    this.size = size;
    this.sort = sort;
    this.filter = filter;
  }
}

export class PageableDto {
    offset: number;
    pageNumber: number;
    pageSize: number;
    sort: string;
    paged: boolean;
    unpaged: boolean;
  
    constructor(pageNumber: number, pageSize: number, sort = 'createdAt,desc') {
      this.pageNumber = pageNumber;
      this.pageSize = pageSize;
      this.offset = (pageNumber - 1) * pageSize;
      this.sort = sort;
      this.paged = pageSize > 0;
      this.unpaged = pageSize === 0;
    }
  }
  
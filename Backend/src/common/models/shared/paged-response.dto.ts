import { PageableDto } from "./pagination-meta.dto";

export class PagedResponseDto<T> {
  message: string;
  listContent: T[];
  page?: {
    totalPages: number;
    totalElements: number;
    size: number;
    content: T[];
    number: number;
    sort: string;
    numberOfElements: number;
    pageable: PageableDto;
    first: boolean;
    last: boolean;
    empty: boolean;
  };
  status: number;
  description: string;

  constructor(
    message: string,
    data: T[],
    pageNumber?: number,
    pageSize?: number,
    totalElements?: number,
    sort = "createdAt,desc",
    status = 200,
    description = "Success"
  ) {
    this.message = message;
    this.listContent = data;
    this.status = status;
    this.description = description;

    if (pageNumber !== undefined && pageSize !== undefined && totalElements !== undefined) {
      const totalPages = Math.ceil(totalElements / pageSize);

      this.page = {
        totalPages,
        totalElements,
        size: pageSize,
        content: data,
        number: pageNumber,
        sort,
        numberOfElements: data.length,
        pageable: new PageableDto(pageNumber, pageSize, sort),
        first: pageNumber === 1,
        last: pageNumber === totalPages,
        empty: data.length === 0,
      };
    }
  }
}

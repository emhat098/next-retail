

export interface IPagination {
  totalPage: number;
  itemPerPage: number;
  currentPage: number;
  url?: string;
  q?: string;
}

export interface DataWithPagination<T> {
  data: T[];
  pagination: IPagination;
}

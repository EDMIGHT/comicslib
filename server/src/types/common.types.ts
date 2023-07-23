export type ISortOrder = 'asc' | 'desc';

export type ISortArg = {
  order: ISortOrder;
  sort: string;
};

export type IPaginationArg = {
  page: number;
  limit: number;
};

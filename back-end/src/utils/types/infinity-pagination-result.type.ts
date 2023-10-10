export type InfinityPaginationResultType<T> = Readonly<{
  data: T[];
  totalCount: number;
}>;

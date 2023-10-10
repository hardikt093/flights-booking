import { InfinityPaginationResultType } from './types/infinity-pagination-result.type';

export const infinityPagination = <T>(data: T[], totalCount: number): InfinityPaginationResultType<T> => {
  return {
    data,
    totalCount
  };
};

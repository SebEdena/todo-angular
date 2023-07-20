export const MAX_ITEMS_PER_PAGE = 50;
export const DEFAULT_ITEMS_PER_PAGE = 25;

export type Page<T> = {
  items: T[];
  total: number;
};

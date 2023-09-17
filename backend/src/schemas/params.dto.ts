import { FilterQuery, QueryOrderMap } from '@mikro-orm/core';

export class FindParams<Entity> {
  filter: FilterQuery<Entity>;
  orderBy: QueryOrderMap<Entity>;
  offset: number;
  limit: number;
}

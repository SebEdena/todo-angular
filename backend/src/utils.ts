import { createZodDto } from 'nestjs-zod';
import { z, ZodSchema } from 'zod';

export const MAX_ITEMS_PER_PAGE = 50;
export const DEFAULT_ITEMS_PER_PAGE = 25;

export class ResourceQuery extends createZodDto(
  z.object({
    skip: z.coerce.number().gte(0).optional().default(0),
    limit: z.coerce
      .number()
      .gte(0)
      .lte(MAX_ITEMS_PER_PAGE)
      .optional()
      .default(DEFAULT_ITEMS_PER_PAGE),
  }),
) {}

export type Page<T> = {
  items: T[];
  total: number;
};

export function buildPage<T>(data: { item: T; total: number }[]) {
  return {
    items: data.map((elt) => elt.item),
    total: data?.[0]?.total ?? 0,
  };
}

export function PageDto<T>(schema: ZodSchema<T>) {
  return createZodDto(
    z.object({
      items: schema.array(),
      total: z.coerce.number().gte(0),
    }),
  );
}

export interface QueryParams {
  filter: object;
  orderBy: object;
  offset: number;
  limit: number;
}

export function q(params: Partial<QueryParams>) {
  const queryObject: {
    [param: string]: string | number | boolean | readonly (string | number | boolean)[];
  } = {};
  for (let [key, value] of Object.entries(params)) {
    if (value == null) {
      continue;
    } else if (value instanceof Object) {
      queryObject[key] = JSON.stringify(value);
    } else {
      queryObject[key] = value;
    }
  }
  return queryObject;
}

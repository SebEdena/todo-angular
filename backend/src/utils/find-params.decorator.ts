import { Injectable, PipeTransform } from '@nestjs/common';
import { FindParams } from 'src/schemas/params.dto';

@Injectable()
export class FindParamsPipe<E> implements PipeTransform {
  transform(value: any) {
    const params: Partial<FindParams<E>> = {};
    if (value.orderBy) {
      params.orderBy = JSON.parse(value.orderBy);
    }
    if (value.filter) {
      params.filter = JSON.parse(value.filter);
    }
    if (value.offset) {
      params.offset = Number.parseInt(value.offset);
    }
    if (value.limit) {
      params.limit = Number.parseInt(value.limit);
    }
    return params;
  }
}

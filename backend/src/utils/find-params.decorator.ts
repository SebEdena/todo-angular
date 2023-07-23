import { Injectable, PipeTransform } from '@nestjs/common';
import { log } from 'console';
import { FindParams } from './crud';

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
    log(params);
    return params;
  }
}

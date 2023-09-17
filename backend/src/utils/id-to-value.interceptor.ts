import { EntityData, RequiredEntityData } from '@mikro-orm/core';
import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isUUID } from 'class-validator';
import { AuditBase } from 'src/models';
import { CrudService } from './crud';

export abstract class IdToValueInterceptor<
  Entity extends AuditBase,
  Create extends RequiredEntityData<Entity>,
  Update extends EntityData<Entity>,
> implements NestInterceptor
{
  constructor(
    protected config: ConfigService,
    protected service: CrudService<Entity, Create, Update>,
  ) {}

  protected abstract key: string;
  protected abstract getId(request: any): string | undefined;
  protected abstract setValue(request: any, entity: Entity): void;

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const entityId = this.getId(request);

    if (entityId) {
      if (!isUUID(entityId, 4)) {
        throw new UnprocessableEntityException(`${this.key} is not an UUID`);
      }
      const entity = await this.service.findOneById(entityId);
      if (!entity) {
        throw new NotFoundException();
      } else {
        this.setValue(request, entity);
        return next.handle();
      }
    }

    throw new NotFoundException();
  }
}

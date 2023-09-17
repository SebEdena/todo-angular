import {
  EntityData,
  EntityName,
  FilterQuery,
  GetRepository,
  QueryOrder,
  QueryOrderMap,
  RequiredEntityData,
} from '@mikro-orm/core';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { AuditBase } from 'src/models';
import { FindParams } from 'src/schemas';
import { Page } from 'src/schemas/page.dto';

export class CrudService<
  Entity extends AuditBase,
  Create extends RequiredEntityData<Entity>,
  Update extends EntityData<Entity>,
> {
  protected repo: GetRepository<Entity, EntityRepository<Entity>>;

  private defaultFindParams: FindParams<Entity> = {
    filter: <FilterQuery<Entity>>{},
    orderBy: <QueryOrderMap<Entity>>{
      id: QueryOrder.ASC,
    },
    offset: 0,
    limit: undefined,
  };

  constructor(protected em: EntityManager, protected name: EntityName<Entity>) {
    this.repo = em.repo(name);
  }

  async create(create: Create): Promise<Entity> {
    const entity = this.repo.create(create);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async find(params: Partial<FindParams<Entity>> = {}): Promise<Page<Entity>> {
    const { filter, offset, limit, orderBy } = { ...this.defaultFindParams, ...params };
    try {
      const [items, total] = await this.em
        .qb(this.name)
        .where(filter)
        .offset(offset)
        .limit(limit)
        .orderBy(orderBy)
        .getResultAndCount();
      return { items, total };
    } catch (e) {
      console.log(e);
    }
  }

  async findOne(filter: FilterQuery<Entity> = {}): Promise<Entity | null> {
    return await this.repo.findOne(filter);
  }

  async findOneById(id: string): Promise<Entity | null> {
    return await this.findOne({ id } as FilterQuery<Entity>);
  }

  async update(entity: Entity, update: Update) {
    const result = this.repo.assign(entity, update);
    await this.em.flush();
    return result;
  }

  async delete(entity: Entity) {
    entity.deletedAt = new Date();
    await this.em.flush();
    return entity;
  }

  async undelete(entity: Entity) {
    entity.deletedAt = undefined;
    await this.em.flush();
    return entity;
  }
}

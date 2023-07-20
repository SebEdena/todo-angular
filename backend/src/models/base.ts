import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { IsUUID } from 'class-validator';
import { v4 } from 'uuid';
import { WithSoftDelete } from '../utils/soft-delete';

@Entity({ abstract: true })
export abstract class ModelBase {
  @PrimaryKey({ nullable: false })
  @IsUUID(4)
  id: string = v4();
}

@Entity({ abstract: true })
@WithSoftDelete()
export abstract class AuditBase extends ModelBase {
  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ nullable: true })
  deletedAt?: Date;
}

export interface ModelBase {
  id: string;
}

export interface AuditBase extends ModelBase {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

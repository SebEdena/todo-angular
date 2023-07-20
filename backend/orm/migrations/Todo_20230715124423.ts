import { Migration } from '@mikro-orm/migrations';

export class Migration20230715124423_Todo extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "todo" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "title" varchar(255) not null, "description" text not null, "status" text check ("status" in (\'todo\', \'doing\', \'done\')) not null default \'todo\', constraint "todo_pkey" primary key ("id"));',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "todo" cascade;');
  }
}

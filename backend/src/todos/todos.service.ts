import { Injectable } from '@nestjs/common';
import { desc, eq, sql } from 'drizzle-orm';
import { todos } from 'lib/models';
import { CreateTodoDto, UpdateTodoDto } from 'lib/schemas';
import { DrizzleService } from '../drizzle/drizzle.service';
import { ResourceQuery, buildPage } from '../utils';

@Injectable()
export class TodosService {
  constructor(private drizzle: DrizzleService) {}

  async create(createTodoDto: CreateTodoDto) {
    return (await this.drizzle.db.insert(todos).values(createTodoDto).returning())[0];
  }

  async findAll(params: ResourceQuery) {
    return buildPage(
      await this.drizzle.db
        .select({
          item: todos,
          total: sql<number>`count(*) OVER()`.mapWith((str) => parseInt(str)),
        })
        .from(todos)
        .orderBy(desc(todos.updatedAt))
        .offset(params.skip)
        .limit(params.limit),
    );
  }

  async findOne(id: string) {
    return await this.drizzle.db.select().from(todos).where(eq(todos.id, id)).limit(1);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    return (
      await this.drizzle.db
        .update(todos)
        .set({ ...updateTodoDto, updatedAt: new Date() })
        .where(eq(todos.id, id))
        .returning()
    )[0];
  }

  async remove(id: string) {
    return (await this.drizzle.db.delete(todos).where(eq(todos.id, id)).returning())[0];
  }
}

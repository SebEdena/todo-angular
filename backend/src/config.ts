import { MikroORMOptions } from '@mikro-orm/core';

export const config = () => {
  return {
    env: process.env.ENV ?? 'local',
    network: {
      host: process.env.HOST ?? '0.0.0.0',
      port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
      origins: process.env.ORIGINS?.split(',') ?? ['*'],
    },
    openapi: {
      prefix: 'openapi',
      title: 'Todos',
      description: 'Small API of todos',
      version: '1.0',
      tags: ['todos'],
    },
    orm: {
      clientUrl: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/todos',
      type: 'postgresql',
    } as MikroORMOptions,
  };
};

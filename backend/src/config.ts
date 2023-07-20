import { MikroORMOptions } from '@mikro-orm/core';

export const config = () => {
  return {
    env: process.env.ENV || 'local',
    orm: {
      clientUrl: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/todos',
      type: 'postgresql',
    } as MikroORMOptions,
  };
};

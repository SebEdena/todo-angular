export function config() {
  return {
    env: process.env.ENV || 'local',
    databaseUrl: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/todos',
  };
}

export function config() {
  return {
    env: process.env.ENV || 'local',
  };
}

import { faker } from '@faker-js/faker';

export const readTodo = () => ({
  id: faker.string.uuid(),
  title: faker.company.catchPhrase(),
  description: faker.lorem.lines(3),
  status: faker.helpers.arrayElement(['todo', 'doing', 'done']),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
});

export const createTodo = () => {
  const { title, description, status } = readTodo();
  return {
    title,
    description,
    status,
  };
};

export const updateTodo = () => {
  const { title, description, status } = readTodo();
  return {
    title,
    description,
    status,
  };
};

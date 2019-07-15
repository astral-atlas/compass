// @flow
import { contracts } from '@astral-atlas/topograph';
import { createTest, ok } from 'lk-test';
import { createMockServer } from 'lk-contract';
import { createMockedCompass } from './entry.contract.test';

export const userGetTest = createTest('Get the Current User', async () => {
  const server = await createMockServer(contracts.getSelfContract);
  try {
    const compass = createMockedCompass(server.port);
    const users = await compass.getUsers();
    server.close();
    return [ok(users.length > 0)];
  } catch (err) {
    server.close();
    throw err;
  }
});
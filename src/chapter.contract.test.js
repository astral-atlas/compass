// @flow
import { contracts } from '@astral-atlas/topograph';
import { createMockServer } from 'lk-contract';
import { createTest, createTestSuite, ok } from 'lk-test';

import { createMockedCompass } from './entry.contract.test';

export const chapterGetTest = createTest("When requesting all visible chapters", async () => {
  const server = await createMockServer(contracts.getChapersContract);
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

export const chapterTestSuite = createTestSuite([chapterGetTest], __filename);
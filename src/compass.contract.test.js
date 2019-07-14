// @flow
import { contracts } from '@astral-atlas/topograph';
import { createMockServer } from 'lk-contract';
import { createTest, colorfulReporter, ok } from 'lk-test';
import { request } from 'http';

import { createCompass } from './compass';
import { createRequesterFromNodeHttp } from './lib/http';

const auth = {
  type: 'basic',
  username: 'luke',
  password: 'hunter2',
};

const succeed = success => ({
  type: 'success',
  success,
});

const contractTest = createTest("getChapersContract", async () => {
  const server = await createMockServer(contracts.getUsersContract);
  try {
    const compass = createCompass(`http://127.0.0.1:${server.port}`, createRequesterFromNodeHttp(request), succeed, auth);
  
    const users = await compass.getUsers();
    server.close();
    return [ok(users.length > 0)];
  } catch (err) {
    server.close();
    throw err;
  }
});

const runTests = async () => {
  console.log(colorfulReporter([await contractTest.run()]));
};

runTests();
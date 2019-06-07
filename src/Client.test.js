// @flow
import { createTest, createTestSuite, equal } from 'lk-test';
import { createClient } from './Client.bs';
import { createBasicAuth } from './Authentication.bs';

const identity = a => a;

const getUsersTest = createTest('getUsersTest', async () => {
  const exampleDomain = 'example.com';

  const luke = { id: '1', name: 'luke' };
  const ben = { id: '2', name: 'ben' };
  const artoo = { id: '3', name: 'r2-d2' };

  const mockRequester = async (domain, path, headers) => {
    switch (path) {
      case '/users':
        return JSON.stringify([luke, ben, artoo]);
      default:
        throw new Error(`Unexpected Route: ${path}`);
    }
  };
  const client = createClient(exampleDomain, mockRequester, identity, createBasicAuth('luke', '1234'));
  const [users] = await client.getUsers();
  return [
    equal(users[0].name, 'luke'),
    equal(users[1].name, 'ben'),
    equal(users[2].name, 'r2-d2'),
  ];
});

const clientTestSuite = createTestSuite([getUsersTest], 'src/Client.test.js');

export {
  clientTestSuite,
};
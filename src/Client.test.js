import { test } from 'tap';
import { ok } from 'assert';
import { createClient } from './Client.bs';

test('createClient()', async () => {
  const exampleDomain = 'example.com';

  const luke = { id: '1', name: 'luke' };
  const ben = { id: '2', name: 'ben' };
  const artoo = { id: '3', name: 'r2-d2' };

  const mockRequester = async (domain, path) => {
    switch (path) {
      case '/users':
        return JSON.stringify([luke, ben, artoo]);
      default:
        throw new Error(`Unexpected Route: ${path}`);
    }
  };
  const client = createClient(exampleDomain, mockRequester);
  const users = await client.getUsers();
});

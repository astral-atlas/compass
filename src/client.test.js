import { test } from 'tap';
import { ok } from 'assert';
import { createClient } from '../src';

test('createClient()', async () => {
  const client = createClient();
  ok(client.getUsers);
});

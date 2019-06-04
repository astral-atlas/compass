import { test } from 'tap';
import { ok } from 'assert';
import { createClient } from './Client.bs';

test('createClient()', async () => {
  const client = createClient();
  ok(client);
});

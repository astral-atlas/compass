// @flow

type Result<T> = { type: 'success', value: T } | { type: 'failure', value: T };

type User = {
  id: string,
  name: string,
};

type Client = {
  getUsers: () => Promise<Array<User>>;
};

type Connection = {
  domain: string,
};

declare export function createClient(connection: Connection): Client;

// @flow

type User = {
  id: string,
  name: string,
};

type AtlasClient = {
  getUsers: () => Promise<Array<User>>;
};

type Connection = {
  domain: string,
};

declare export function createClient(connection: Connection): AtlasClient;

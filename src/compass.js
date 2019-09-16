// @flow
import { toArray } from './lib/types';
import { toUser } from './user';

/*::
import type { User } from './user';
import type { Requester } from './lib/http';
import type { Base64Encoder } from './lib/encoder';
import type { Authentication } from './lib/authentication';

type Compass = {
  getUsers: () => Promise<Array<User>>,
};
*/

const toGetUsersResponse = toArray(toUser);

export const createCompass = (
  domain/*: string*/,
  requester/*: Requester*/,
  base64Encoder/*: Base64Encoder*/,
  authentication/*: Authentication*/
)/*: Compass*/ => {
  const getUsers = async () => {
    const getUsersRequest = await requester.startRequest(domain, '/users', [], []);
    if (getUsersRequest.type === 'failure') {
      throw getUsersRequest.failure;
    }
    const requestContents = toGetUsersResponse(JSON.parse(getUsersRequest.success));
    return requestContents;
  };

  return {
    getUsers,
  };
};
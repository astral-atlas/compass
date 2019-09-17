// @flow
import { createSessionClient } from './sessionClient';

/*::
import type { HTTPClient } from '@lukekaalim/http-client';
import type { SessionClient } from './sessionClient';

export type Compass = {
  session: SessionClient,
};
*/

export const createCompass = (
  domain/*: string*/,
  client/*: HTTPClient*/,
)/*: Compass*/ => {

  const session = createSessionClient(domain, client);

  return {
    session,
  };
};
// @flow strict
/*::
import type { Result } from '@lukekaalim/result';
import type { Session } from '@astral-atlas/contour';
import type { Requester } from './lib/http';
*/
import { sessionModel } from '@astral-atlas/contour';
import { succeed, fail } from '@lukekaalim/result';
import { modelArray } from '@lukekaalim/model';

/*::
type SessionFailure = {
  type: 'session-failure',
};

export type SessionClient = {
  getSessions: () => Promise<Result<Array<Session>, SessionFailure>>
};
*/

const getSessionsResponseModel = modelArray(sessionModel);

export const createSessionClient = (
  host/*: string*/,
  requester/*: Requester*/,
)/*: SessionClient*/ => {
  const getSessions = async () => {
    const responseResult = await requester.startRequest(host, '/sessions', [], []);
    if (responseResult.type === 'failure')
      return fail({ type: 'session-failure' });
    const sessionsResult = getSessionsResponseModel.from(JSON.parse(responseResult.success));
    if (sessionsResult.type === 'failure')
      return fail({ type: 'session-failure' });
    return succeed(sessionsResult.success);
  };

  return {
    getSessions,
  };
};
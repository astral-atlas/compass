// @flow strict
/*::
import type { Result } from '@lukekaalim/result';
import type { Session } from '@astral-atlas/contour';
import type { HTTPClient } from '@lukekaalim/http-client';
*/
import { sessionModel } from '@astral-atlas/contour';
import { succeed, fail } from '@lukekaalim/result';
import { modelArray } from '@lukekaalim/model';

/*::

type RequestFailure = {
  type: 'request-failure',
}
type ResponseFailure = {
  type: 'response-failure',
}
type ParseFailure = {
  type: 'parse-failure',
}
type SessionFailure = RequestFailure | ResponseFailure | ParseFailure;


export type SessionClient = {
  getSessions: () => Promise<Result<Array<Session>, SessionFailure>>,
  createSession: (title: string, startTime: number) => Promise<Result<Session, SessionFailure>>
};
*/

const getSessionsResponseModel = modelArray(sessionModel);

export const createSessionClient = (
  host/*: string*/,
  client/*: HTTPClient*/,
)/*: SessionClient*/ => {
  const getSessions = async () => {
    const responseResult = await client.request(new URL('/sessions', host).href);
    if (responseResult.type === 'failure')
      return fail({ type: 'request-failure' });
    if (responseResult.success.status !== 200)
      return fail({ type: 'response-failure' });
    const sessionsResult = getSessionsResponseModel.from(JSON.parse(responseResult.success.body));
    if (sessionsResult.type === 'failure')
      return fail({ type: 'parse-failure', failure: sessionsResult.failure });
    return succeed(sessionsResult.success);
  };
  const createSession = async (title, startTime) => {
    const responseResult = await client.request(new URL('/sessions', host).href, [], 'POST', JSON.stringify({ title, startTime }));
    if (responseResult.type === 'failure')
      return fail({ type: 'request-failure' });
    if (responseResult.success.status !== 200)
      return fail({ type: 'response-failure' });
    const sessionsResult = sessionModel.from(JSON.parse(responseResult.success.body));
    if (sessionsResult.type === 'failure')
      return fail({ type: 'parse-failure', failure: sessionsResult.failure });
    return succeed(sessionsResult.success);
  }

  return {
    getSessions,
    createSession,
  };
};
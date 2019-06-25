// @flow

/*::
import typeof { request as NodeHTTPRequestFunc } from 'http';
import type { Result } from './result';

export type Requester = {
  startRequest: (
    hostname: string,
    pathname: string,
    query: Array<[string, string]>,
    headers: Array<[string, string]>,
  ) => Promise<Result<string, Error>>,
};
*/

export const createRequesterFromNodeHttp = (request/*: NodeHTTPRequestFunc*/)/*: Requester*/ => {
  const startRequest = (host, path, query, headers) => new Promise((resolveRequest, rejectRequest) => {
    const url = host + path;
    const options = { };
    const callback = (inc) => {
      const dataChunks = [];
      inc.on('data', dataChunk => dataChunks.push(dataChunk));
      inc.on('close', () => resolveRequest({ type: 'success', success: dataChunks.join('') }))
    };
    const clientRequest = request(url, options, callback);
    clientRequest.end();
  });
  return {
    startRequest,
  };
};
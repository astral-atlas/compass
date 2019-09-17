// @flow strict
const { readFile } = require('fs').promises;
const { join } = require('path');
const { request } = require('http');
const { contractModel, withContractServer } = require('@lukekaalim/contract');
const { expect, expectAll, assert } = require('@lukekaalim/test');

const { createHTTPClientFromNodeHttpsRequest } = require('@lukekaalim/http-client');
const { createSessionClient } = require('./sessionClient');

const resultOrThrow = result => {
  if (result.type === 'failure')
    throw new Error(result);
  return result.success;
}

const expectGetSessionsContract = (topographPath) => expect(async () => {
  const contractFile = await readFile(join(topographPath, 'session', 'getSession.json'), 'utf-8');
  const contract = resultOrThrow(contractModel.from(JSON.parse(contractFile)));
  const httpClient = createHTTPClientFromNodeHttpsRequest(request);

  const contractServerResult = await withContractServer(contract, async host => {
    const sessionClient = createSessionClient(host, httpClient);
    return await sessionClient.getSessions();
  });
  if (contractServerResult.type === 'failure')
    return assert('Session did not pass contract', false);
  const sessionResult = await contractServerResult.success;
  return assert('getSessions should return a success with a list of successes', sessionResult.type === 'success');
});

const expectPostSessionContract = (topographPath) => expect(async () => {
  const contractFile = await readFile(join(topographPath, 'session', 'postSession.json'), 'utf-8');
  const contract = resultOrThrow(contractModel.from(JSON.parse(contractFile)));
  const httpClient = createHTTPClientFromNodeHttpsRequest(request);

  const contractServerResult = await withContractServer(contract, async host => {
    const sessionClient = createSessionClient(host, httpClient);
    return await sessionClient.createSession('The Last Session', 0);
  });
  if (contractServerResult.type === 'failure')
    return assert('Session did not pass contract', false);
  const sessionResult = await contractServerResult.success;
  return assert('createSession should return a success the created session', sessionResult.type === 'success');
});

const expectSessionContract = (topographPath/*: string*/) => expectAll('Sesssion Contract should allow the listing, adding, and deleting of Sessions', [
  expectGetSessionsContract(topographPath),
  expectPostSessionContract(topographPath),
]);

module.exports = {
  expectSessionContract,
};

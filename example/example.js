// @flow strict
const { createCompass } = require('./../');
const { createHTTPClientFromNodeHttpsRequest } = require('@lukekaalim/http-client');
const { request } = require('http');

const main = async () => {
  const httpClient = createHTTPClientFromNodeHttpsRequest(request);
  const compass = createCompass('http://localhost:8080', httpClient);

  console.log(await compass.session.getSessions())
};

main();
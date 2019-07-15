// @flow
import { createTest, colorfulReporter, ok } from 'lk-test';
import { request } from 'http';

import { chapterTestSuite } from './chapter.contract.test.js';
import { createCompass } from './compass';
import { createRequesterFromNodeHttp } from './lib/http';
import { succeed } from './lib/result';

const auth = {
  type: 'basic',
  username: 'luke',
  password: 'hunter2',
};

export const createMockedCompass = (serverPort/*: number*/) => createCompass(
  `http://127.0.0.1:${serverPort}`,
  createRequesterFromNodeHttp(request),
  succeed,
  auth
);

const runTests = async () => {
  const results = [
    ...await chapterTestSuite.run(),
  ];
  console.log(colorfulReporter(results));
};

if (require.main === module) {
  runTests();
}

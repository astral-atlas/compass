// @flow strict
// use ESM
require = require("esm")(module)

const { expectAll, emojiReporter } = require('@lukekaalim/test');
const { expectSessionContract } = require('./src/sessionClient.contract.test.js')

const contractTest = async (topographPath) => {
  if (!topographPath) {
    return console.error(new Error('Missing topograph path as argument to test CLI'));
  }
  const expectation = expectAll(`@astral-atlas/compass should conform to the @astral-atlas/topograph contracts (${topographPath})`, [
    expectSessionContract(topographPath),
  ]);
  const assertion = await expectation.test();
  console.log(emojiReporter(assertion));
  process.exitCode = assertion.validatesExpectation ? 0 : 1;
};

const unitTest = async () => {
  const expectation = expectAll('@astral-atlas/compass to provide a simple interface to access Astral Atlas content', []);
  const assertion = await expectation.test();
  console.log(emojiReporter(assertion));
  process.exitCode = assertion.validatesExpectation ? 0 : 1;
};

const test = (testCommand) => {
  switch (testCommand) {
    default:
    case 'unit':
      return unitTest();
    case 'contract':
      return contractTest(process.argv[3]);
  }
}

if (require.main === module) {
  const testCommand = process.argv[2];
  test(testCommand);
}
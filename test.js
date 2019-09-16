// @flow strict
const { expectAll, emojiReporter } = require('@lukekaalim/test');

const test = async () => {
  const expectation = expectAll('@astral-atlas/compass to provide a simple interface to access Astral Atlas content', []);
  const assertion = await expectation.test();
  console.log(emojiReporter(assertion));
  process.exitCode = assertion.validatesExpectation ? 0 : 1;
};

if (require.main === module) {
  test();
}
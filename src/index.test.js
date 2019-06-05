import { colorfulReporter }  from 'lk-test';
import { clientTestSuite } from './Client.test';

const testCompass = async () => {
  const testResults = [
    ...await clientTestSuite.run(),
  ];
  const report = colorfulReporter(testResults);
  console.log(report);
};
testCompass();
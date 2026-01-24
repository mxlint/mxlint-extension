import type { RawTestCase, Rule, Status } from '@/types';
import type { ProcessedTestCaseWithId } from '@/types';
import { SEVERITY_CODE } from '@/constants';

export const processTestCase = (
  testsuiteName: string,
  testcase: RawTestCase,
  ruleMap: Map<string, Rule>
): ProcessedTestCaseWithId => {
  const rule = ruleMap.get(testsuiteName);

  let status: Status;
  let statusCode: number;
  if (testcase.failure) {
    status = 'fail';
    statusCode = 1;
  } else if (testcase.skipped) {
    status = 'skip';
    statusCode = 2;
  } else {
    status = 'pass';
    statusCode = 3;
  }

  let name = testcase.name;
  if (name.startsWith('modelsource\\')) {
    name = name.substring(12);
  }

  const firstBackslash = name.indexOf('\\');
  let module = '';
  let docname = '';
  let doctype = '';

  if (firstBackslash !== -1) {
    module = name.substring(0, firstBackslash);
    const rest = name.substring(firstBackslash + 1);
    const lastDot = rest.lastIndexOf('.');
    const secondLastDot = rest.lastIndexOf('.', lastDot - 1);

    if (secondLastDot !== -1) {
      docname = rest.substring(0, secondLastDot).replace(/\\/g, '/');
      doctype = rest.substring(secondLastDot + 1, lastDot);
    } else if (lastDot !== -1) {
      docname = rest.substring(0, lastDot);
    } else {
      docname = rest;
    }
  } else {
    const lastDot = name.lastIndexOf('.');
    docname = lastDot !== -1 ? name.substring(0, lastDot) : name;
  }

  const id = `${testsuiteName}::${testcase.name}`;

  return {
    id,
    name,
    time: testcase.time,
    failure: testcase.failure,
    skipped: testcase.skipped,
    rule,
    status,
    statusCode,
    severityCode: rule?.severity ? SEVERITY_CODE[rule.severity] || 3 : 3,
    module,
    docname,
    doctype,
  };
};

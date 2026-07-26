import type { RawTestCase, Rule, Status } from '@/types';
import type { ProcessedTestCaseWithId } from '@/types';
import { SEVERITY_CODE } from '@/constants';

const stripModelsourcePrefix = (rawPath: string): string => {
  let path = rawPath.replace(/\\/g, '/');
  const modelsourceIndex = path.indexOf('modelsource/');
  if (modelsourceIndex !== -1) {
    path = path.substring(modelsourceIndex + 'modelsource/'.length);
  } else if (path.startsWith('modelsource/')) {
    path = path.substring('modelsource/'.length);
  }
  return path;
};

const parseDocumentPath = (path: string): { module: string; docname: string; doctype: string } => {
  const firstSlash = path.indexOf('/');
  let module = '';
  let docname = '';
  let doctype = '';

  if (firstSlash !== -1) {
    module = path.substring(0, firstSlash);
    const rest = path.substring(firstSlash + 1);
    const lastDot = rest.lastIndexOf('.');
    const secondLastDot = rest.lastIndexOf('.', lastDot - 1);

    if (secondLastDot !== -1) {
      docname = rest.substring(0, secondLastDot);
      doctype = rest.substring(secondLastDot + 1, lastDot);
    } else if (lastDot !== -1) {
      docname = rest.substring(0, lastDot);
    } else {
      docname = rest;
    }
  } else {
    const lastDot = path.lastIndexOf('.');
    docname = lastDot !== -1 ? path.substring(0, lastDot) : path;
  }

  return { module, docname, doctype };
};

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

  const name = stripModelsourcePrefix(testcase.name);
  const originalPath = testcase.originalPath
    ? stripModelsourcePrefix(testcase.originalPath)
    : name;

  // Prefer Mendix original path for display / open-document fields.
  const { module, docname, doctype } = parseDocumentPath(originalPath);

  const id = `${testsuiteName}::${testcase.name}`;

  return {
    id,
    name,
    originalPath,
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

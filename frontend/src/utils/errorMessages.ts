import type { ProcessedTestCaseWithId } from '@/types';

const errorMessageCache = new WeakMap<ProcessedTestCaseWithId, string[]>();

export const splitErrorMessages = (message: string): string[] => {
  const lines = message.split('\n');
  const allParts: string[] = [];

  for (const line of lines) {
    const subParts = line.split(/(?=\[(?:HIGH|MEDIUM|LOW),)/);
    allParts.push(...subParts);
  }

  return allParts.filter((part) => part.trim().length > 0);
};

export const getErrorMessages = (testcase: ProcessedTestCaseWithId): string[] => {
  if (!testcase.failure?.message) return [];

  const cached = errorMessageCache.get(testcase);
  if (cached) return cached;

  const message = testcase.failure.message;
  const result = splitErrorMessages(message).map((part) => part.trim());

  errorMessageCache.set(testcase, result);
  return result;
};

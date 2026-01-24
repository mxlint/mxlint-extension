import type { ProcessedTestCase } from '@/types/global.d';

export type SortColumn = 'severity' | 'document' | 'module' | 'doctype' | 'rule' | 'category' | 'status';
export type SortDirection = 'asc' | 'desc';
export type GroupBy = 'none' | 'module' | 'category' | 'rule' | 'severity';
export type IssueFormat = 'markdown' | 'jira' | 'plain';

export interface Stats {
  pass: number;
  skip: number;
  fail: number;
  total: number;
  rules: number;
}

export interface ProcessedTestCaseWithId extends ProcessedTestCase {
  id: string;
}

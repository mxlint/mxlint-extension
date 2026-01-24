// ========== API Response Types ==========

export interface TestCaseFailure {
  message: string;
  type: string;
}

export interface SkippedInfo {
  message: string;
}

export interface RawTestCase {
  name: string;
  time: number;
  failure?: TestCaseFailure;
  skipped?: SkippedInfo;
}

export interface TestSuite {
  name: string;
  tests: number;
  failures: number;
  skipped: number;
  time: number;
  testcases: RawTestCase[];
}

export interface Rule {
  title: string;
  description: string;
  category: string;
  severity: Severity;
  ruleNumber: string;
  remediation: string;
  ruleName: string;
  path: string;
  pattern: string;
  packageName?: string;
  language: string;
}

export interface LintResultsData {
  testsuites: TestSuite[];
  rules: Rule[];
}

// ========== Processed Types ==========

export type Severity = 'HIGH' | 'MEDIUM' | 'LOW';
export type Status = 'pass' | 'skip' | 'fail';

export interface ProcessedTestCase {
  name: string;
  time: number;
  failure?: TestCaseFailure;
  skipped?: SkippedInfo;
  rule: Rule | undefined;
  status: Status;
  statusCode: number;
  severityCode: number;
  module: string;
  docname: string;
  doctype: string;
}

export interface ProgressWidths {
  pass: number;
  skip: number;
  fail: number;
}

// ========== Component Props ==========

export interface DocumentInfo {
  document: string;
  type: string;
  module: string;
}

// ========== WebView Message Types ==========

export interface WebViewMessage {
  message: string;
  data?: unknown;
}

// ========== Chrome WebView Type Extension ==========

declare global {
  interface Window {
    chrome?: {
      webview?: {
        postMessage: (message: WebViewMessage) => void;
        addEventListener: (type: string, listener: (event: MessageEvent<WebViewMessage>) => void) => void;
        removeEventListener: (type: string, listener: (event: MessageEvent<WebViewMessage>) => void) => void;
      };
    };
  }
}

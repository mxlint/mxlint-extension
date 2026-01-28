// Re-export from global.d.ts
export type {
  TestCaseFailure,
  SkippedInfo,
  RawTestCase,
  TestSuite,
  Rule,
  LintResultsData,
  Severity,
  Status,
  ProcessedTestCase,
  ProgressWidths,
  DocumentInfo,
  WebViewMessage,
} from '@/types/global.d';

// Export app-specific types
export type {
  SortColumn,
  SortDirection,
  GroupBy,
  IssueFormat,
  Stats,
  ProcessedTestCaseWithId,
} from '@/types/app.types';

// Export UI component types
export type {
  Size,
  Variant,
  Severity as UISeverity,
  Position,
  Alignment,
  BaseProps,
  DisableableProps,
  ValidationState,
  ToastOptions,
  ToastState,
  DropdownItem,
  SidebarItem,
  SliderMark,
} from '@/types/ui.types';

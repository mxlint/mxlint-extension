import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';

// Types
import type {
  LintResultsData,
  DocumentInfo,
  Severity,
  Status,
  Rule,
  WebViewMessage,
  SortColumn,
  SortDirection,
  GroupBy,
  IssueFormat,
  Stats,
  ProcessedTestCaseWithId,
} from '@/types';

// Constants
import { ROW_HEIGHT, FILTER_PRESETS } from '@/constants';
import type { FilterPreset } from '@/constants';

// Hooks
import { useVirtualList } from '@/hooks';

// Utilities
import { postMessage, djb2Hash, processTestCase, isOpenableDocument } from '@/utils';

// Context
import { useToast } from '@/context';

// Icons
import {
  ErrorIcon,
  CheckIcon,
  SkipIcon,
  RefreshIcon,
  FilterIcon,
  ExportIcon,
  SearchIcon,
  ClearIcon,
  GroupIcon,
  KeyboardIcon,
  PresetIcon,
  IssueIcon,
  ClipboardIcon,
  BookmarkIcon,
} from '@/components/icons';

// Components
import {
  MultiSelect,
  KeyboardShortcutsModal,
  SortableHeader,
  Button,
  Badge,
  Input,
  Checkbox,
  Spinner,
  EmptyState,
  Dialog,
} from '@/components/ui';
import {
  StatusFilterButton,
  FilterPresetButton,
  ClearFiltersButton,
  GroupBySelect,
  SelectAllCheckbox,
  IssueContentOutput,
} from '@/components/app';
import { VirtualRow } from '@/components/table';
import { DetailPanel } from '@/components/detail';
import { GroupedView } from '@/components/grouped';

import './App.css';

const App: React.FC = () => {
  // Core state
  const [data, setData] = useState<LintResultsData>({ testsuites: [], rules: [] });
  const [isLoading, setIsLoading] = useState(false);
  const { success, error: toastError } = useToast();

  // Filter state
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [severityFilters, setSeverityFilters] = useState<Severity[]>(['HIGH', 'MEDIUM', 'LOW']);
  const [statusFilters, setStatusFilters] = useState<Status[]>(['fail']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDocTypes, setSelectedDocTypes] = useState<string[]>([]);

  // Display state
  const [sortColumn, setSortColumn] = useState<SortColumn>('severity');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [groupBy, setGroupBy] = useState<GroupBy>('none');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => new Set());

  // UI state
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [selectedIssues, setSelectedIssues] = useState<Set<string>>(() => new Set());
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [issueContent, setIssueContent] = useState('');
  const [issueFormat, setIssueFormat] = useState<IssueFormat>('markdown');
  const [closedPanelForId, setClosedPanelForId] = useState<string | null>(null);

  const dataHashRef = useRef(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Build rule map once
  const ruleMap = useMemo(() => {
    const map = new Map<string, Rule>();
    for (const rule of data.rules) {
      map.set(rule.path, rule);
    }
    return map;
  }, [data.rules]);

  // Process all testcases ONCE when data changes
  const allTestcases = useMemo((): ProcessedTestCaseWithId[] => {
    const result: ProcessedTestCaseWithId[] = [];
    for (const testsuite of data.testsuites) {
      for (const testcase of testsuite.testcases) {
        result.push(processTestCase(testsuite.name, testcase, ruleMap));
      }
    }
    return result;
  }, [data.testsuites, ruleMap]);

  // Extract unique values lazily
  const { uniqueModules, uniqueCategories, uniqueDocTypes } = useMemo(() => {
    if (!showFilterPanel && selectedModules.length === 0 && selectedCategories.length === 0 && selectedDocTypes.length === 0) {
      return { uniqueModules: [], uniqueCategories: [], uniqueDocTypes: [] };
    }
    const modules = new Set<string>();
    const categories = new Set<string>();
    const docTypes = new Set<string>();

    for (const tc of allTestcases) {
      if (tc.module) modules.add(tc.module);
      if (tc.rule?.category) categories.add(tc.rule.category);
      if (tc.doctype) docTypes.add(tc.doctype);
    }

    return {
      uniqueModules: [...modules].sort(),
      uniqueCategories: [...categories].sort(),
      uniqueDocTypes: [...docTypes].sort(),
    };
  }, [allTestcases, showFilterPanel, selectedModules.length, selectedCategories.length, selectedDocTypes.length]);

  // Calculate stats (without status filter for badge counts)
  const stats = useMemo((): Stats => {
    let pass = 0, skip = 0, fail = 0;
    const severitySet = new Set(severityFilters);
    const moduleSet = selectedModules.length > 0 ? new Set(selectedModules) : null;
    const categorySet = selectedCategories.length > 0 ? new Set(selectedCategories) : null;
    const docTypeSet = selectedDocTypes.length > 0 ? new Set(selectedDocTypes) : null;
    const searchLower = searchQuery.toLowerCase().trim();

    for (const tc of allTestcases) {
      if (!tc.rule?.severity || !severitySet.has(tc.rule.severity)) continue;
      if (moduleSet && !moduleSet.has(tc.module)) continue;
      if (categorySet && (!tc.rule?.category || !categorySet.has(tc.rule.category))) continue;
      if (docTypeSet && !docTypeSet.has(tc.doctype)) continue;
      if (showBookmarkedOnly && !bookmarkedIds.has(tc.id)) continue;

      if (searchLower) {
        const searchable = `${tc.docname} ${tc.module} ${tc.doctype} ${tc.rule?.ruleName || ''} ${tc.rule?.category || ''} ${tc.rule?.title || ''}`.toLowerCase();
        if (!searchable.includes(searchLower)) continue;
      }

      if (tc.status === 'fail') fail++;
      else if (tc.status === 'skip') skip++;
      else pass++;
    }

    return { pass, skip, fail, total: pass + skip + fail, rules: data.rules.length };
  }, [allTestcases, severityFilters, selectedModules, selectedCategories, selectedDocTypes,
    searchQuery, showBookmarkedOnly, bookmarkedIds, data.rules.length]);

  // Filter and sort for display
  const filteredTestcases = useMemo((): ProcessedTestCaseWithId[] => {
    const severitySet = new Set(severityFilters);
    const statusSet = new Set(statusFilters);
    const moduleSet = selectedModules.length > 0 ? new Set(selectedModules) : null;
    const categorySet = selectedCategories.length > 0 ? new Set(selectedCategories) : null;
    const docTypeSet = selectedDocTypes.length > 0 ? new Set(selectedDocTypes) : null;
    const searchLower = searchQuery.toLowerCase().trim();

    const filtered: ProcessedTestCaseWithId[] = [];

    for (const tc of allTestcases) {
      if (!tc.rule?.severity || !severitySet.has(tc.rule.severity)) continue;
      if (!statusSet.has(tc.status)) continue;
      if (moduleSet && !moduleSet.has(tc.module)) continue;
      if (categorySet && (!tc.rule?.category || !categorySet.has(tc.rule.category))) continue;
      if (docTypeSet && !docTypeSet.has(tc.doctype)) continue;
      if (showBookmarkedOnly && !bookmarkedIds.has(tc.id)) continue;

      if (searchLower) {
        const searchable = `${tc.docname} ${tc.module} ${tc.doctype} ${tc.rule?.ruleName || ''} ${tc.rule?.category || ''} ${tc.rule?.title || ''} ${tc.failure?.message || ''}`.toLowerCase();
        if (!searchable.includes(searchLower)) continue;
      }

      filtered.push(tc);
    }

    filtered.sort((a, b) => {
      let cmp = 0;
      switch (sortColumn) {
        case 'severity': cmp = a.severityCode - b.severityCode; break;
        case 'document': cmp = a.docname.localeCompare(b.docname); break;
        case 'module': cmp = a.module.localeCompare(b.module); break;
        case 'doctype': cmp = a.doctype.localeCompare(b.doctype); break;
        case 'rule': cmp = (a.rule?.ruleName || '').localeCompare(b.rule?.ruleName || ''); break;
        case 'category': cmp = (a.rule?.category || '').localeCompare(b.rule?.category || ''); break;
        case 'status': cmp = a.statusCode - b.statusCode; break;
      }
      return sortDirection === 'asc' ? cmp : -cmp;
    });

    return filtered;
  }, [allTestcases, severityFilters, statusFilters, selectedModules, selectedCategories,
    selectedDocTypes, searchQuery, showBookmarkedOnly, bookmarkedIds, sortColumn, sortDirection]);

  // Virtual list
  const { visibleItems, totalHeight, offsetY } = useVirtualList(
    filteredTestcases,
    tableContainerRef,
    ROW_HEIGHT
  );

  // Progress widths
  const progressWidths = useMemo(() => {
    const { pass, skip, fail, total } = stats;
    if (total === 0) return { pass: 0, skip: 0, fail: 0 };
    return { pass: (pass / total) * 100, skip: (skip / total) * 100, fail: (fail / total) * 100 };
  }, [stats]);

  // Data fetching
  const refreshData = useCallback(async () => {
    try {
      const endpoint = window.chrome?.webview ? './api' : '/lint-results.json';
      const response = await fetch(endpoint);
      const text = await response.text();
      const newHash = djb2Hash(text);
      if (newHash !== dataHashRef.current) {
        dataHashRef.current = newHash;
        setData(JSON.parse(text));
      }
      return true;
    } catch (error) {
      console.error('Failed to fetch data:', error);
      return false;
    }
  }, []);

  // WebView message listener
  useEffect(() => {
    const handleMessage = async (event: MessageEvent<WebViewMessage>) => {
      const { message } = event.data;
      if (message === 'refreshData') await refreshData();
      else if (message === 'start') setIsLoading(true);
      else if (message === 'end') setIsLoading(false);
    };

    if (window.chrome?.webview) {
      window.chrome.webview.addEventListener('message', handleMessage);
      postMessage('MessageListenerRegistered');
    }
    return () => {
      if (window.chrome?.webview) {
        window.chrome.webview.removeEventListener('message', handleMessage);
      }
    };
  }, [refreshData]);

  // Auto-refresh - use setTimeout to avoid synchronous setState in effect
  useEffect(() => {
    const timeoutId = setTimeout(() => void refreshData(), 0);
    if (!window.chrome?.webview) return () => clearTimeout(timeoutId);
    const interval = setInterval(() => {
      postMessage('refreshData');
      void refreshData();
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, [refreshData]);

  // Scroll selected row into view
  useEffect(() => {
    if (selectedRowIndex >= 0 && tableContainerRef.current) {
      const scrollTo = selectedRowIndex * ROW_HEIGHT;
      const container = tableContainerRef.current;
      if (scrollTo < container.scrollTop || scrollTo > container.scrollTop + container.clientHeight - ROW_HEIGHT) {
        container.scrollTop = scrollTo - container.clientHeight / 2;
      }
    }
  }, [selectedRowIndex]);

  // Handlers
  const handleOpenDocument = useCallback((docInfo: DocumentInfo) => postMessage('openDocument', docInfo), []);

  const resetSelectionAndScroll = useCallback(() => {
    setSelectedRowIndex(-1);
    setClosedPanelForId(null);
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = 0;
    }
  }, []);

  const handleSeverityChange = useCallback((severity: Severity, checked: boolean) => {
    setSeverityFilters(prev => checked ? [...prev, severity] : prev.filter(s => s !== severity));
    resetSelectionAndScroll();
  }, [resetSelectionAndScroll]);

  const handleStatusChange = useCallback((status: Status, checked: boolean) => {
    setStatusFilters(prev => checked ? [...prev, status] : prev.filter(s => s !== status));
    resetSelectionAndScroll();
  }, [resetSelectionAndScroll]);

  const setStatusOnly = useCallback((status: Status) => {
    setStatusFilters([status]);
    resetSelectionAndScroll();
  }, [resetSelectionAndScroll]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    resetSelectionAndScroll();
  }, [resetSelectionAndScroll]);

  const clearSearch = useCallback(() => {
    handleSearchChange('');
  }, [handleSearchChange]);

  const handleModulesChange = useCallback((modules: string[]) => {
    setSelectedModules(modules);
    resetSelectionAndScroll();
  }, [resetSelectionAndScroll]);

  const handleCategoriesChange = useCallback((categories: string[]) => {
    setSelectedCategories(categories);
    resetSelectionAndScroll();
  }, [resetSelectionAndScroll]);

  const handleDocTypesChange = useCallback((docTypes: string[]) => {
    setSelectedDocTypes(docTypes);
    resetSelectionAndScroll();
  }, [resetSelectionAndScroll]);

  const toggleBookmarkedOnly = useCallback(() => {
    setShowBookmarkedOnly(prev => !prev);
    resetSelectionAndScroll();
  }, [resetSelectionAndScroll]);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const toggleIssueSelection = useCallback((id: string) => {
    setSelectedIssues(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const selectAllVisible = useCallback(() => {
    setSelectedIssues(new Set(filteredTestcases.map(tc => tc.id)));
  }, [filteredTestcases]);

  const clearSelection = useCallback(() => setSelectedIssues(new Set()), []);

  const handleSort = useCallback((column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection((d: SortDirection) => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  }, [sortColumn]);

  const handleManualRefresh = useCallback(async () => {
    const ok = await refreshData();
    if (ok) {
      success('Lint results refreshed.');
    } else {
      toastError('Failed to refresh lint results.');
    }
  }, [refreshData, success, toastError]);

  const clearAllFilters = useCallback(() => {
    setSeverityFilters(['HIGH', 'MEDIUM', 'LOW']);
    setStatusFilters(['fail']);
    setSelectedModules([]);
    setSelectedCategories([]);
    setSelectedDocTypes([]);
    setSearchQuery('');
    setShowBookmarkedOnly(false);
    resetSelectionAndScroll();
  }, [resetSelectionAndScroll]);

  const applyPreset = useCallback((preset: FilterPreset) => {
    setStatusFilters(preset.filters.statuses);
    setSeverityFilters(preset.filters.severities);
    setSelectedModules([]);
    setSelectedCategories([]);
    setSelectedDocTypes([]);
    setSearchQuery('');
    setShowBookmarkedOnly(false);
    resetSelectionAndScroll();
  }, [resetSelectionAndScroll]);

  const handleExport = useCallback(() => {
    const headers = ['Severity', 'Document', 'Module', 'Type', 'Rule', 'Category', 'Status', 'Error'];
    const rows = [headers.join(',')];
    for (const tc of filteredTestcases) {
      rows.push([
        tc.rule?.severity || '', tc.docname, tc.module, tc.doctype,
        tc.rule?.ruleName || '', tc.rule?.category || '', tc.status,
        (tc.failure?.message || '').replace(/"/g, '""').replace(/\n/g, ' ')
      ].map(c => `"${c}"`).join(','));
    }
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `lint-results-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    const count = filteredTestcases.length;
    success(`Exported ${count} row${count === 1 ? '' : 's'} to CSV.`);
  }, [filteredTestcases, success]);

  // Generate Issue Content
  const generateIssueContent = useCallback((format: IssueFormat): string => {
    const selected = filteredTestcases.filter(tc => selectedIssues.has(tc.id));
    if (selected.length === 0) return '';

    const byModule = new Map<string, ProcessedTestCaseWithId[]>();
    for (const tc of selected) {
      const module = tc.module || '(No Module)';
      if (!byModule.has(module)) byModule.set(module, []);
      byModule.get(module)!.push(tc);
    }

    const severityCounts = { HIGH: 0, MEDIUM: 0, LOW: 0 };
    for (const tc of selected) {
      const sev = tc.rule?.severity;
      if (sev && sev in severityCounts) {
        severityCounts[sev as keyof typeof severityCounts]++;
      }
    }

    if (format === 'jira') {
      let content = `h2. Technical Debt: Lint Issues Cleanup\n\n`;
      content += `h3. Summary\n\n`;
      content += `||Severity||Count||\n`;
      if (severityCounts.HIGH > 0) content += `|High|${severityCounts.HIGH}|\n`;
      if (severityCounts.MEDIUM > 0) content += `|Medium|${severityCounts.MEDIUM}|\n`;
      if (severityCounts.LOW > 0) content += `|Low|${severityCounts.LOW}|\n`;
      content += `|*Total*|*${selected.length}*|\n\n`;
      content += `h3. Issues to Address\n\n`;

      for (const [module, issues] of byModule) {
        content += `h4. Module: {{${module}}}\n\n`;
        issues.sort((a, b) => (a.severityCode || 3) - (b.severityCode || 3));

        for (const tc of issues) {
          content += `* *${tc.rule?.ruleName || 'Unknown Rule'}* in {{${tc.docname}}}\n`;
          if (tc.rule?.title) content += `** ${tc.rule.title}\n`;
          if (tc.failure?.message) {
            const shortMessage = tc.failure.message.split('\n')[0].substring(0, 200);
            content += `** Error: {{${shortMessage}${tc.failure.message.length > 200 ? '...' : ''}}}\n`;
          }
          if (tc.rule?.remediation) content += `** Remediation: ${tc.rule.remediation}\n`;
        }
        content += `\n`;
      }

      content += `h3. Acceptance Criteria\n\n`;
      content += `* All listed lint issues are resolved\n`;
      content += `* No new lint issues introduced\n`;
      content += `* Code review completed\n`;
      content += `* Tests passing\n\n`;
      content += `----\n`;
      content += `_Generated from Lint Results Pane on ${new Date().toLocaleDateString()}_\n`;

      return content;
    } else if (format === 'plain') {
      let content = `TECHNICAL DEBT: LINT ISSUES CLEANUP\n`;
      content += `${'='.repeat(40)}\n\n`;

      content += `SUMMARY\n${'-'.repeat(20)}\n`;
      if (severityCounts.HIGH > 0) content += `High:   ${severityCounts.HIGH}\n`;
      if (severityCounts.MEDIUM > 0) content += `Medium: ${severityCounts.MEDIUM}\n`;
      if (severityCounts.LOW > 0) content += `Low:    ${severityCounts.LOW}\n`;
      content += `Total:  ${selected.length}\n\n`;

      content += `ISSUES TO ADDRESS\n${'-'.repeat(20)}\n\n`;

      for (const [module, issues] of byModule) {
        content += `MODULE: ${module}\n\n`;
        issues.sort((a, b) => (a.severityCode || 3) - (b.severityCode || 3));

        for (const tc of issues) {
          const severity = tc.rule?.severity || 'LOW';
          content += `  [ ] [${severity}] ${tc.rule?.ruleName || 'Unknown Rule'}\n`;
          content += `      Document: ${tc.docname}\n`;
          if (tc.rule?.title) content += `      Title: ${tc.rule.title}\n`;
          if (tc.failure?.message) {
            const shortMessage = tc.failure.message.split('\n')[0].substring(0, 150);
            content += `      Error: ${shortMessage}${tc.failure.message.length > 150 ? '...' : ''}\n`;
          }
          if (tc.rule?.remediation) content += `      Fix: ${tc.rule.remediation}\n`;
          content += `\n`;
        }
      }

      content += `ACCEPTANCE CRITERIA\n${'-'.repeat(20)}\n`;
      content += `[ ] All listed lint issues are resolved\n`;
      content += `[ ] No new lint issues introduced\n`;
      content += `[ ] Code review completed\n`;
      content += `[ ] Tests passing\n\n`;
      content += `Generated: ${new Date().toLocaleDateString()}\n`;

      return content;
    } else {
      // Markdown format
      let md = `## Technical Debt: Lint Issues Cleanup\n\n`;
      md += `### Summary\n\n`;
      md += `| Severity | Count |\n|----------|-------|\n`;
      if (severityCounts.HIGH > 0) md += `| High | ${severityCounts.HIGH} |\n`;
      if (severityCounts.MEDIUM > 0) md += `| Medium | ${severityCounts.MEDIUM} |\n`;
      if (severityCounts.LOW > 0) md += `| Low | ${severityCounts.LOW} |\n`;
      md += `| **Total** | **${selected.length}** |\n\n`;

      md += `### Issues to Address\n\n`;

      for (const [module, issues] of byModule) {
        md += `#### Module: \`${module}\`\n\n`;
        issues.sort((a, b) => (a.severityCode || 3) - (b.severityCode || 3));

        for (const tc of issues) {
          md += `- [ ] **${tc.rule?.ruleName || 'Unknown Rule'}** in \`${tc.docname}\`\n`;
          if (tc.rule?.title) md += `  - ${tc.rule.title}\n`;
          if (tc.failure?.message) {
            const shortMessage = tc.failure.message.split('\n')[0].substring(0, 200);
            md += `  - Error: \`${shortMessage}${tc.failure.message.length > 200 ? '...' : ''}\`\n`;
          }
          if (tc.rule?.remediation) md += `  - Remediation: ${tc.rule.remediation}\n`;
          md += `\n`;
        }
      }

      md += `### Acceptance Criteria\n\n`;
      md += `- [ ] All listed lint issues are resolved\n`;
      md += `- [ ] No new lint issues introduced\n`;
      md += `- [ ] Code review completed\n`;
      md += `- [ ] Tests passing\n\n`;
      md += `---\n`;
      md += `*Generated from Lint Results Pane on ${new Date().toLocaleDateString()}*\n`;

      return md;
    }
  }, [filteredTestcases, selectedIssues]);

  const openIssueModal = useCallback(() => {
    const content = generateIssueContent(issueFormat);
    setIssueContent(content);
    setShowIssueModal(true);
  }, [generateIssueContent, issueFormat]);

  const handleFormatChange = useCallback((format: IssueFormat) => {
    setIssueFormat(format);
    setIssueContent(generateIssueContent(format));
  }, [generateIssueContent]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(issueContent);
      success('Issue content copied to clipboard.');
    } catch (err) {
      console.error('Failed to copy:', err);
      toastError('Failed to copy issue content.');
    }
  }, [issueContent, success, toastError]);

  const handleSelectRow = useCallback((index: number) => {
    setSelectedRowIndex(index);
    setClosedPanelForId(null);
  }, []);

  const handleSelectRowById = useCallback((id: string) => {
    const index = filteredTestcases.findIndex(tc => tc.id === id);
    if (index >= 0) {
      setSelectedRowIndex(index);
      setClosedPanelForId(null);
    }
  }, [filteredTestcases]);

  const hasActiveFilters = searchQuery || selectedModules.length || selectedCategories.length ||
    selectedDocTypes.length || showBookmarkedOnly || severityFilters.length !== 3 ||
    statusFilters.length !== 1 || !statusFilters.includes('fail');

  const selectedCount = useMemo(() =>
    filteredTestcases.filter(tc => selectedIssues.has(tc.id)).length,
    [filteredTestcases, selectedIssues]
  );

  const isAllSelected = filteredTestcases.length > 0 && filteredTestcases.every(tc => selectedIssues.has(tc.id));
  const isSomeSelected = filteredTestcases.some(tc => selectedIssues.has(tc.id)) && !isAllSelected;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        if (e.key === 'Escape') {
          clearSearch();
          (e.target as HTMLElement).blur();
        }
        return;
      }

      switch (e.key) {
        case '1': setStatusOnly('fail'); break;
        case '2': setStatusOnly('skip'); break;
        case '3': setStatusOnly('pass'); break;
        case 'r': case 'R': void handleManualRefresh(); break;
        case 'b': case 'B':
          if (selectedRowIndex >= 0 && filteredTestcases[selectedRowIndex]) {
            toggleBookmark(filteredTestcases[selectedRowIndex].id);
          }
          break;
        case 'e': case 'E': handleExport(); break;
        case '?': setShowKeyboardShortcuts(true); break;
        case 'Escape':
          setShowKeyboardShortcuts(false);
          setShowIssueModal(false);
          setSelectedRowIndex(-1);
          setClosedPanelForId(null);
          break;
        case 'f': case 'F':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            searchInputRef.current?.focus();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedRowIndex(prev => Math.max(0, prev - 1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedRowIndex(prev => prev < 0 ? 0 : Math.min(filteredTestcases.length - 1, prev + 1));
          break;
        case 'Enter':
          if (selectedRowIndex >= 0) {
            const tc = filteredTestcases[selectedRowIndex];
            if (tc && isOpenableDocument(tc.docname)) {
              handleOpenDocument({ document: tc.docname, type: tc.doctype, module: tc.module });
            }
          }
          break;
        case ' ':
        case 'x': case 'X':
          e.preventDefault();
          if (selectedRowIndex >= 0 && filteredTestcases[selectedRowIndex]) {
            toggleIssueSelection(filteredTestcases[selectedRowIndex].id);
          }
          break;
        case 'a': case 'A':
          if (e.ctrlKey || e.metaKey) { e.preventDefault(); selectAllVisible(); }
          break;
        case 'd': case 'D':
          if (e.ctrlKey || e.metaKey) { e.preventDefault(); clearSelection(); }
          break;
        case 'i': case 'I':
          if (selectedCount > 0) openIssueModal();
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedRowIndex, filteredTestcases, toggleBookmark, toggleIssueSelection,
    handleOpenDocument, handleExport, handleManualRefresh, selectAllVisible, clearSelection,
    selectedCount, openIssueModal, clearSearch, setStatusOnly]);

  return (
    <div className="lint-pane">
      {/* Toolbar */}
      <div className="lint-pane-toolbar">
        <StatusFilterButton
          active={statusFilters.includes('fail') && statusFilters.length === 1}
          onClick={() => setStatusOnly('fail')}
          title="Show only failing test cases"
          icon={<ErrorIcon />}
          iconClassName="error"
          count={stats.fail}
          label="Errors"
        />

        <StatusFilterButton
          active={statusFilters.includes('skip') && statusFilters.length === 1}
          onClick={() => setStatusOnly('skip')}
          title="Show only skipped test cases"
          icon={<SkipIcon />}
          iconClassName="skip"
          count={stats.skip}
          label="Skipped"
        />

        <StatusFilterButton
          active={statusFilters.includes('pass') && statusFilters.length === 1}
          onClick={() => setStatusOnly('pass')}
          title="Show only passing test cases"
          icon={<CheckIcon />}
          iconClassName="pass"
          count={stats.pass}
          label="Passed"
        />

        <div className="toolbar-separator" />

        <div className="toolbar-search">
          <Input
            ref={searchInputRef}
            value={searchQuery}
            onChange={e => handleSearchChange(e.target.value)}
            placeholder="Search documents, rules, modules..."
            leftIcon={<SearchIcon />}
            clearable
            onClear={clearSearch}
            size="md"
          />
        </div>

        <div className="toolbar-separator" />

        <Button variant="ghost" icon={<RefreshIcon />} onClick={() => void handleManualRefresh()} title="Fetch latest lint results (R)">
          Refresh
        </Button>

        <Button
          variant="ghost"
          icon={<FilterIcon />}
          onClick={() => setShowFilterPanel(v => !v)}
          title="Toggle advanced filters"
          className={showFilterPanel ? 'active' : ''}
        >
          Filters
          {hasActiveFilters && <Badge variant="error" dot className="filter-badge-dot" />}
        </Button>

        <Button variant="ghost" icon={<ExportIcon />} onClick={handleExport} title="Export current results to CSV (E)">
          Export
        </Button>

        <Button
          variant="ghost"
          icon={<IssueIcon />}
          onClick={openIssueModal}
          disabled={selectedCount === 0}
          title={selectedCount > 0 ? `Create issue for ${selectedCount} selected items` : 'Select issues to create ticket'}
          className={selectedCount > 0 ? 'has-selection' : ''}
        >
          Create Issue
          {selectedCount > 0 && <Badge variant="info" size="sm">{selectedCount}</Badge>}
        </Button>

        {selectedCount > 0 && (
          <Button variant="ghost" icon={<ClearIcon />} onClick={clearSelection} title="Clear selection" />
        )}

        <div className="toolbar-separator" />

        <Button
          variant="ghost"
          icon={<BookmarkIcon filled={showBookmarkedOnly} />}
          onClick={toggleBookmarkedOnly}
          title="Show bookmarked items only"
          className={showBookmarkedOnly ? 'active' : ''}
        >
          Bookmarks ({bookmarkedIds.size})
        </Button>

        <Button variant="ghost" icon={<KeyboardIcon />} onClick={() => setShowKeyboardShortcuts(true)} title="Show keyboard shortcuts (?)" />
      </div>

      {/* Summary Section */}
      <div className="summary-section">
        <div className="summary-stats">
          <div className="stat-item" title={`Passing: ${stats.pass} (${progressWidths.pass.toFixed(1)}%)`}>
            <span className="stat-label">Pass:</span>
            <span className="stat-value pass">{stats.pass}</span>
            <span className="stat-percent pass">({progressWidths.pass.toFixed(1)}%)</span>
          </div>
          <div className="stat-item" title={`Skipped: ${stats.skip} (${progressWidths.skip.toFixed(1)}%)`}>
            <span className="stat-label">Skip:</span>
            <span className="stat-value skip">{stats.skip}</span>
            <span className="stat-percent skip">({progressWidths.skip.toFixed(1)}%)</span>
          </div>
          <div className="stat-item" title={`Failing: ${stats.fail} (${progressWidths.fail.toFixed(1)}%)`}>
            <span className="stat-label">Fail:</span>
            <span className="stat-value fail">{stats.fail}</span>
            <span className="stat-percent fail">({progressWidths.fail.toFixed(1)}%)</span>
          </div>
          <div className="stat-item" title="Total test cases">
            <span className="stat-label">Total:</span>
            <span className="stat-value">{stats.total}</span>
          </div>
          <div className="stat-item" title="Total rules">
            <span className="stat-label">Rules:</span>
            <span className="stat-value">{data.rules.length}</span>
          </div>
          <div className="stat-item showing" title="Currently displayed">
            <span className="stat-label">Showing:</span>
            <span className="stat-value">{filteredTestcases.length}</span>
          </div>
        </div>

        <div className="progress-bar" title="Distribution of pass, skip and fail results">
          <div className="progress-segment pass" style={{ width: `${progressWidths.pass}%` }} />
          <div className="progress-segment skip" style={{ width: `${progressWidths.skip}%` }} />
          <div className="progress-segment fail" style={{ width: `${progressWidths.fail}%` }} />
        </div>
      </div>

      {/* Filter Panel */}
      <div className={`filter-panel ${showFilterPanel ? '' : 'hidden'}`}>
        <div className="filter-group presets-group">
          <div className="filter-group-title"><PresetIcon /> Quick Presets</div>
          <div className="filter-presets">
            {FILTER_PRESETS.map(preset => (
              <FilterPresetButton
                key={preset.id}
                label={preset.name}
                title={preset.name}
                onClick={() => applyPreset(preset)}
              />
            ))}
          </div>
        </div>

        <div className="filter-group">
          <div className="filter-group-title">Status</div>
          <div className="filter-options">
            {(['fail', 'skip', 'pass'] as const).map(status => (
              <Checkbox
                key={status}
                checked={statusFilters.includes(status)}
                onChange={e => handleStatusChange(status, e.target.checked)}
                label={<span className={`status-${status}`}>{status.toUpperCase()}</span>}
                size="sm"
              />
            ))}
          </div>
        </div>

        <div className="filter-group">
          <div className="filter-group-title">Severity</div>
          <div className="filter-options">
            {(['HIGH', 'MEDIUM', 'LOW'] as const).map(severity => (
              <Checkbox
                key={severity}
                checked={severityFilters.includes(severity)}
                onChange={e => handleSeverityChange(severity, e.target.checked)}
                label={<span className={`severity-${severity.toLowerCase()}`}>{severity}</span>}
                size="sm"
              />
            ))}
          </div>
        </div>

        <MultiSelect label="Modules" options={uniqueModules} selected={selectedModules} onChange={handleModulesChange} />
        <MultiSelect label="Categories" options={uniqueCategories} selected={selectedCategories} onChange={handleCategoriesChange} />
        <MultiSelect label="Doc Types" options={uniqueDocTypes} selected={selectedDocTypes} onChange={handleDocTypesChange} />

        <div className="filter-group">
          <div className="filter-group-title"><GroupIcon /> Group By</div>
          <GroupBySelect value={groupBy} onChange={setGroupBy} />
        </div>

        {hasActiveFilters && (
          <ClearFiltersButton onClick={clearAllFilters} icon={<ClearIcon />} />
        )}
      </div>

      {isLoading && (
        <div className="loading-overlay">
          <Spinner size="lg" label="Loading..." />
        </div>
      )}

      {/* Main content area with table and detail panel */}
      <div className="main-content">
        {/* Table */}
        <div className="table-container" ref={tableContainerRef}>
          {stats.total === 0 && !isLoading ? (
            <EmptyState
              title="No test cases found"
              description="No lint test cases are available to display."
            />
          ) : filteredTestcases.length === 0 ? (
            <EmptyState
              title="No results match your filters"
              description="Try adjusting your filter criteria to see more results."
              action={{ label: 'Clear filters', onClick: clearAllFilters }}
            />
          ) : groupBy !== 'none' ? (
            <GroupedView
              testcases={filteredTestcases}
              groupBy={groupBy}
              selectedIssues={selectedIssues}
              selectedRowId={selectedRowIndex >= 0 ? filteredTestcases[selectedRowIndex]?.id : null}
              onOpenDocument={handleOpenDocument}
              onToggleSelection={toggleIssueSelection}
              onSelectRow={handleSelectRowById}
            />
          ) : (
            <table className="lint-table">
              <thead>
                <tr>
                  <th className="col-checkbox">
                    <SelectAllCheckbox
                      checked={isAllSelected}
                      indeterminate={isSomeSelected}
                      onChange={checked => checked ? selectAllVisible() : clearSelection()}
                      title={isAllSelected ? 'Deselect all' : 'Select all visible'}
                    />
                  </th>
                  <th className="col-bookmark"></th>
                  <SortableHeader column="severity" title="Severity" className="col-severity" sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
                  <SortableHeader column="document" title="Document" className="col-document" sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
                  <SortableHeader column="module" title="Module" className="col-module" sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
                  <SortableHeader column="doctype" title="Type" className="col-doctype" sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
                  <SortableHeader column="rule" title="Rule" className="col-rule" sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
                  <SortableHeader column="category" title="Category" className="col-category" sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
                  <SortableHeader column="status" title="Status" className="col-status" sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
                </tr>
              </thead>
              <tbody style={{ position: 'relative' }}>
                {offsetY > 0 && (
                  <tr style={{ height: offsetY }} aria-hidden="true"><td colSpan={9}></td></tr>
                )}
                {visibleItems.map(({ item, index }) => (
                  <VirtualRow key={item.id} testcase={item} index={index}
                    isBookmarked={bookmarkedIds.has(item.id)}
                    isSelected={selectedRowIndex === index}
                    isChecked={selectedIssues.has(item.id)}
                    onOpenDocument={handleOpenDocument}
                    onToggleBookmark={toggleBookmark}
                    onToggleSelection={toggleIssueSelection}
                    onSelectRow={handleSelectRow} />
                ))}
                {totalHeight - offsetY - (visibleItems.length * ROW_HEIGHT) > 0 && (
                  <tr style={{ height: totalHeight - offsetY - (visibleItems.length * ROW_HEIGHT) }} aria-hidden="true"><td colSpan={9}></td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Detail Panel */}
        {selectedRowIndex >= 0 && filteredTestcases[selectedRowIndex] &&
          filteredTestcases[selectedRowIndex].id !== closedPanelForId && (
            <DetailPanel
              testcase={filteredTestcases[selectedRowIndex]}
              onClose={() => setClosedPanelForId(filteredTestcases[selectedRowIndex].id)}
              onOpenDocument={handleOpenDocument}
            />
          )}
      </div>

      {/* Modals */}
      {showKeyboardShortcuts && <KeyboardShortcutsModal onClose={() => setShowKeyboardShortcuts(false)} />}

      <Dialog
        isOpen={showIssueModal}
        onClose={() => setShowIssueModal(false)}
        title={<><IssueIcon /> Create Issue</>}
        size="lg"
        id="issue-dialog"
        className="issue-modal"
      >
        <div className="issue-format-selector">
          <label className="format-label">Format:</label>
          <div className="format-options">
            <Button
              variant={issueFormat === 'markdown' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => handleFormatChange('markdown')}
              title="GitHub, GitLab, Azure DevOps"
            >
              Markdown
            </Button>
            <Button
              variant={issueFormat === 'jira' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => handleFormatChange('jira')}
              title="Jira, Confluence"
            >
              Jira
            </Button>
            <Button
              variant={issueFormat === 'plain' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => handleFormatChange('plain')}
              title="Plain text for any system"
            >
              Plain Text
            </Button>
          </div>
        </div>
        <div className="format-hint">
          {issueFormat === 'markdown' && 'Works with: GitHub, GitLab, Azure DevOps, Bitbucket'}
          {issueFormat === 'jira' && 'Works with: Jira, Confluence'}
          {issueFormat === 'plain' && 'Works with: Any issue tracker, email, documents'}
        </div>
        <div className="issue-actions">
          <Button variant="primary" icon={<ClipboardIcon />} onClick={copyToClipboard}>
            Copy to Clipboard
          </Button>
        </div>
        <IssueContentOutput value={issueContent} />
      </Dialog>
    </div>
  );
};

export default App;

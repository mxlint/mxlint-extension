# MxLint Extension

A React + TypeScript web application for viewing, filtering, and managing lint test results. Designed to integrate with VSCode via Chrome WebView API, providing an interactive interface to browse linting failures, warnings, and passed tests.

## Features

- **Virtual Scrolling** - Efficiently handles large datasets with only visible rows rendered
- **Advanced Filtering** - Filter by severity, status, module, category, and document type
- **Full-Text Search** - Search across documents, rules, modules, categories, and titles
- **Grouping** - Organize results by module, category, rule, or severity
- **Bookmarking** - Mark important items for quick access
- **Multi-Select** - Select multiple issues for batch operations
- **Issue Export** - Generate formatted issue reports (Markdown, Jira, Plain Text)
- **CSV Export** - Export filtered results to CSV
- **Keyboard Shortcuts** - Full keyboard navigation support
- **Mendix Studio Pro Integration** - Seamless integration via Chrome WebView API

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
mxlint-extension/
├── src/
│   ├── components/           # React components
│   │   ├── detail/          # Detail panel for test case info
│   │   ├── grouped/         # Grouped view components
│   │   ├── icons/           # SVG icon components
│   │   ├── table/           # Table row components
│   │   └── ui/              # UI utility components
│   ├── constants/           # Application constants
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Main application component
│   ├── App.css              # Application styles
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
│   └── lint-results.json    # Sample lint results data
├── dist/                    # Build output
└── index.html               # HTML template
```

## Architecture

### Component Hierarchy

```
App (Main orchestrator)
├── Toolbar
│   ├── Status badges (fail/skip/pass counts)
│   ├── Search input
│   └── Action buttons (refresh, export, issue, shortcuts)
├── Summary Section
│   ├── Statistics display
│   └── Progress bar
├── Filter Panel (collapsible)
│   ├── Severity filters (HIGH/MEDIUM/LOW)
│   ├── Status filters (pass/skip/fail)
│   ├── Module multi-select
│   ├── Category multi-select
│   ├── DocType multi-select
│   └── Grouping options
├── Main Content Area
│   ├── Table View (default)
│   │   └── VirtualRow[] (virtualized rows)
│   └── Grouped View (when grouping enabled)
│       └── GroupSection[]
│           └── LightRow[]
├── Detail Panel (side panel)
└── Modals
    ├── KeyboardShortcutsModal
    └── IssueModal
```

### Data Flow

```
Data Fetch (API/JSON)
       ↓
Raw Data Storage (state)
       ↓
Process Test Cases (useMemo)
       ↓
Apply Filters & Search (useMemo)
       ↓
Sort Results (useMemo)
       ↓
Virtual Scroll (useVirtualList)
       ↓
Render Components
```

## Components

### Core Components

#### `App.tsx`
The main application component containing all state management and UI orchestration.

**Responsibilities:**
- Central state management for all application data
- Filter and search functionality
- Sorting and grouping of test cases
- Bookmarking and issue selection
- Data fetching and WebView messaging
- Keyboard shortcuts handling
- CSV/Issue export functionality

#### `VirtualRow.tsx`
Renders individual table rows with full functionality.

**Features:**
- Severity indicator with color coding
- Document link (clickable)
- Module, type, rule, and category display
- Status badge
- Bookmark toggle
- Selection checkbox

#### `LightRow.tsx`
Simplified row component used within grouped view sections.

#### `DetailPanel.tsx`
Side panel showing detailed information for the selected test case.

**Displays:**
- Severity and status badges
- Rule name and title
- Document path
- Module and type information
- Category
- Description and remediation text
- Error messages (parsed and formatted)

#### `GroupedView.tsx` & `GroupSection.tsx`
Components for organizing test cases by grouping key (module, category, rule, or severity).

**Features:**
- Collapsible groups
- Lazy loading with "Show more" pagination
- Per-group statistics (fail/skip/pass counts)

### UI Components

#### `MultiSelect.tsx`
Dropdown component for multi-value filtering.

**Features:**
- "All" and "Clear" quick actions
- Checkbox list of options
- Click-outside to close

#### `KeyboardShortcutsModal.tsx`
Modal displaying all available keyboard shortcuts in a two-column layout.

#### `SortableHeader.tsx`
Table header component with sorting capability.

**Features:**
- Sort indicator (ascending/descending arrows)
- Toggle direction on repeated clicks

### Icon Components

Located in `src/components/icons/`:

| File | Icons |
|------|-------|
| `StatusIcons.tsx` | ErrorIcon, CheckIcon, SkipIcon |
| `ActionIcons.tsx` | RefreshIcon, FilterIcon, ExportIcon, SearchIcon, ClearIcon |
| `UIIcons.tsx` | SortAscIcon, SortDescIcon, GroupIcon, KeyboardIcon, PresetIcon |
| `IssueIcons.tsx` | IssueIcon, ClipboardIcon, BookmarkIcon |

All icons are memoized SVG React components.

## Hooks

### `useVirtualList.ts`

Custom hook implementing virtual scrolling for large lists.

```typescript
const { visibleItems, totalHeight, offsetY, startIndex, endIndex } = useVirtualList({
  items: testCases,
  containerRef: scrollContainerRef,
  rowHeight: 36,
  overscan: 5
});
```

**Parameters:**
- `items` - Array of items to virtualize
- `containerRef` - Reference to scrollable container
- `rowHeight` - Height of each row (default: 36px)
- `overscan` - Buffer rows above/below viewport (default: 5)

**Returns:**
- `visibleItems` - Items currently in view
- `totalHeight` - Total scrollable height
- `offsetY` - Vertical offset for positioning
- `startIndex` / `endIndex` - Range of visible indices

## Utilities

### `messaging.ts`
```typescript
postMessage(message: string, data?: unknown): void
```
Sends messages to Chrome WebView API for the Mendix Studio Pro integration.

**Messages:**
- `"MessageListenerRegistered"` - Initial handshake
- `"refreshData"` - Request data refresh
- `"openDocument"` - Open document in editor

### `hashing.ts`
```typescript
djb2Hash(str: string): number
```
DJB2 hash algorithm for generating data checksums. Used to detect if lint results have changed.

### `testCaseProcessor.ts`
```typescript
processTestCase(testsuiteName: string, testcase: RawTestCase, ruleMap: Map<string, Rule>): ProcessedTestCaseWithId
```
Transforms raw test case data into a structured format for display.

**Processing:**
- Determines status (fail/skip/pass) from test case properties
- Extracts module, document name, and document type from test name
- Generates unique ID
- Maps severity to numeric code for sorting
- Associates rule metadata

### `errorMessages.ts`
```typescript
splitErrorMessages(message: string): string[]
getErrorMessages(testcase: ProcessedTestCaseWithId): string[]
```
Parses error messages from failure data, splitting by severity markers (`[HIGH,`, `[MEDIUM,`, `[LOW,`).

## Constants

### `table.ts`
```typescript
ROW_HEIGHT = 36    // Height of each table row in pixels
OVERSCAN = 5       // Number of buffer rows for virtual scrolling
```

### `severity.ts`
```typescript
SEVERITY_CODE = {
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3
}
```

### `filterPresets.ts`
Predefined filter combinations:
- **Critical Issues** - HIGH severity failures only
- **All Failures** - All severity failures
- **Warnings Only** - MEDIUM/LOW failures
- **Skipped Tests** - Skipped tests only
- **All Passing** - Passed tests only

## Types

### Core Types (`global.d.ts`)

```typescript
// Raw API response types
interface RawTestCase {
  name: string
  time: number
  failure?: { message: string }
  skipped?: boolean
}

interface TestSuite {
  name: string
  tests: number
  failures: number
  skipped: number
  time: number
  testcases: RawTestCase[]
}

interface Rule {
  title: string
  description: string
  category: string
  severity: Severity
  ruleNumber: string
  remediation: string
  ruleName: string
  path: string
  pattern: string
  packageName?: string
  language: string
}

interface LintResultsData {
  testsuites: TestSuite[]
  rules: Rule[]
}

// Processed types
type Severity = 'HIGH' | 'MEDIUM' | 'LOW'
type Status = 'pass' | 'skip' | 'fail'

interface ProcessedTestCase extends RawTestCase {
  rule?: Rule
  status: Status
  statusCode: number
  severityCode: number
  module: string
  docname: string
  doctype: string
}
```

### App Types (`app.types.ts`)

```typescript
type SortColumn = 'severity' | 'document' | 'module' | 'doctype' | 'rule' | 'category' | 'status'
type SortDirection = 'asc' | 'desc'
type GroupBy = 'none' | 'module' | 'category' | 'rule' | 'severity'
type IssueFormat = 'markdown' | 'jira' | 'plain'

interface Stats {
  pass: number
  skip: number
  fail: number
  total: number
  rules: number
}

interface ProcessedTestCaseWithId extends ProcessedTestCase {
  id: string
}
```

## Keyboard Shortcuts

### Navigation
| Key | Action |
|-----|--------|
| `↑` / `↓` | Navigate rows |
| `Enter` | Open selected document |

### Filtering
| Key | Action |
|-----|--------|
| `Ctrl+F` | Focus search input |
| `Escape` | Clear search / close modals |
| `1` | Show failures only |
| `2` | Show skipped only |
| `3` | Show passed only |

### Selection
| Key | Action |
|-----|--------|
| `Space` / `X` | Toggle row selection |
| `Ctrl+A` | Select all visible |
| `Ctrl+D` | Deselect all |

### Actions
| Key | Action |
|-----|--------|
| `B` | Toggle bookmark |
| `R` | Refresh data |
| `E` | Export to CSV |
| `I` | Create issue |
| `?` | Show shortcuts modal |

## Mendix Studio Pro Integration

The application communicates with MxLint extension via Chrome WebView API:

```typescript
// Check if running in WebView
if (window.chrome?.webview) {
  // Send message
  window.chrome.webview.postMessage({ type: 'openDocument', path: docPath });

  // Receive messages
  window.chrome.webview.addEventListener('message', (event) => {
    if (event.data === 'refreshData') {
      fetchData();
    }
  });
}
```

### Message Types

**Outbound (to MxLint extension):**
- `MessageListenerRegistered` - Initial handshake
- `refreshData` - Request data refresh
- `openDocument` - Open document in editor

**Inbound (from MxLint extension):**
- `refreshData` - Trigger data refresh
- `start` - Show loading overlay
- `end` - Hide loading overlay

## Styling

The application uses a dark theme matching Mendix Studio Pro's default appearance:

- **Background:** `#1e1e1e`
- **Text:** `#cccccc`
- **Selected:** `#094771`
- **Error/Fail:** `#f14c4c`
- **Success/Pass:** `#4ec9b0`
- **Warning/Skip:** `#cca700`

All styles are defined in `App.css` using CSS custom properties for consistency.

## Performance Optimizations

1. **Virtual Scrolling** - Only renders visible rows (36px height)
2. **React.memo** - All row components are memoized
3. **useMemo** - Expensive calculations (filtering, sorting, stats) are cached
4. **Lazy Filter Values** - Unique values only calculated when filter panel opens
5. **WeakMap Caching** - Error messages cached per test case
6. **DJB2 Hashing** - Quick data change detection before re-parsing
7. **ResizeObserver** - Efficient container resize tracking

## Data Sources

The application supports two data source modes:

1. **WebView Mode** - Fetches from `./api` endpoint when running in Mendix Studio Pro
2. **Standalone Mode** - Fetches from `/lint-results.json` for development

Auto-refresh polls every 1 second when in WebView mode.

## Development

### Prerequisites
- Node.js 24+
- npm 9+

### Tech Stack
- React 19.2
- TypeScript 5.9
- Vite 7.2
- ESLint with TypeScript support

### Building

```bash
# Development with hot reload
npm run dev

# Production build
npm run build

# Type checking only
npx tsc --noEmit
```

### Code Quality

```bash
# Run ESLint with auto-fix
npm run lint
```
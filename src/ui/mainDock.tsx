import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { useSettings, SettingsProvider } from "./settingsContext";

// Define types for our data model
interface Rule {
    title: string;
    description: string;
    category: string;
    severity: string;
    ruleNumber: string;
    remediation: string;
    path: string;
}

interface Failure {
    message: string;
    type: string;
}

interface Skipped {
    message: string;
}

interface TestCase {
    name: string;
    time: number;
    failure?: Failure;
    skipped?: Skipped;
}

interface TestSuite {
    name: string;
    tests: number;
    failures: number;
    skipped: number;
    time: number;
    testcases: TestCase[];
}

interface LintResults {
    testsuites: TestSuite[];
    rules: Rule[];
}

interface LintResult {
    timestamp: string;
    results: LintResults;
    error?: string;
}

function ViolationsOverview() {
    const { settings } = useSettings();
    const [lintResult, setLintResult] = useState<LintResult | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filterType, setFilterType] = useState<'all' | 'failures' | 'skipped'>('failures');
    const [autoRefresh, setAutoRefresh] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:${settings.serverPort}/`, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            
            const data = await response.json();
            setLintResult(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching lint results:', err);
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        
        // Set up auto-refresh
        let interval: number | undefined;
        if (autoRefresh) {
            interval = window.setInterval(() => {
                fetchData();
            }, 10000); // 10 seconds
        }
        
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [autoRefresh]);

    // Calculate totals
    const getTotalTests = () => {
        if (!lintResult?.results?.testsuites) return 0;
        return lintResult.results.testsuites.reduce((acc, suite) => acc + suite.tests, 0);
    };

    const getTotalFailures = () => {
        if (!lintResult?.results?.testsuites) return 0;
        return lintResult.results.testsuites.reduce((acc, suite) => acc + suite.failures, 0);
    };

    const getTotalSkipped = () => {
        if (!lintResult?.results?.testsuites) return 0;
        return lintResult.results.testsuites.reduce((acc, suite) => acc + suite.skipped, 0);
    };

    // Filter test cases based on current filter
    const filterTestCases = (testcases: TestCase[]) => {
        if (filterType === 'all') return testcases;
        if (filterType === 'failures') return testcases.filter(tc => tc.failure);
        if (filterType === 'skipped') return testcases.filter(tc => tc.skipped);
        return testcases;
    };

    // CSS styles
    const styles = {
        container: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
            lineHeight: '1.6',
            color: '#333',
            padding: '10px',
            maxWidth: '100%',
            boxSizing: 'border-box' as const
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            paddingBottom: '2px',
            borderBottom: '1px solid #eee'
        },
        timestamp: {
            fontSize: '0.9em',
            color: '#666',
            clear: 'both' as const
        },
        summary: {
            display: 'flex',
            gap: '20px',
            marginBottom: '20px'
        },
        summaryItem: {
            padding: '10px 15px',
            borderRadius: '5px',
            textAlign: 'center' as const,
            cursor: 'pointer',
            transition: 'transform 0.1s ease',
            userSelect: 'none' as const
        },
        summaryTotal: {
            backgroundColor: '#f0f7ff',
            border: '1px solid #cce5ff'
        },
        summaryFailures: {
            backgroundColor: '#fff5f5',
            border: '1px solid #ffdce0'
        },
        summarySkipped: {
            backgroundColor: '#f8f8f8',
            border: '1px solid #e1e4e8'
        },
        summaryActive: {
            boxShadow: '0 0 0 2px #0066cc'
        },
        summaryNumber: {
            fontSize: '1.5em',
            fontWeight: 'bold'
        },
        rule: {
            backgroundColor: '#f9f9f9',
            borderRadius: '5px',
            padding: '15px',
            marginBottom: '20px',
            borderLeft: '4px solid #0066cc'
        },
        ruleHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px'
        },
        ruleTitle: {
            fontWeight: 'bold',
            margin: '0'
        },
        ruleMeta: {
            display: 'flex',
            gap: '15px',
            fontSize: '0.9em'
        },
        severityHigh: {
            color: '#d73a49',
            fontWeight: 'bold'
        },
        severityMedium: {
            color: '#e36209',
            fontWeight: 'bold'
        },
        severityLow: {
            color: '#6a737d',
            fontWeight: 'bold'
        },
        testcase: {
            padding: '10px',
            margin: '5px 0',
            borderRadius: '3px'
        },
        testcasePass: {
            backgroundColor: '#f0fff4',
            borderLeft: '3px solid #22863a'
        },
        testcaseFail: {
            backgroundColor: '#fff5f5',
            borderLeft: '3px solid #d73a49'
        },
        testcaseSkip: {
            backgroundColor: '#f8f8f8',
            borderLeft: '3px solid #6a737d'
        },
        testcaseHeader: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        failureMessage: {
            backgroundColor: '#fff5f5',
            borderRadius: '3px',
            padding: '10px',
            marginTop: '5px',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap' as const
        },
        refreshButton: {
            backgroundColor: '#0066cc',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
        },
        autoRefresh: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.9em'
        },
        loading: {
            textAlign: 'center' as const,
            padding: '20px',
            color: '#666'
        },
        error: {
            backgroundColor: '#fff5f5',
            borderRadius: '5px',
            padding: '15px',
            color: '#d73a49',
            marginBottom: '20px'
        },
        hidden: {
            display: 'none'
        }
    };

    if (loading && !lintResult) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>Loading lint results...</div>
            </div>
        );
    }

    if (error && !lintResult) {
        return (
            <div style={styles.container}>
                <div style={styles.error}>
                    <h3>Error loading lint results</h3>
                    <p>{error}</p>
                    <p>Make sure mxlint-cli serve is running on port {settings.serverPort}.</p>
                    <button style={styles.refreshButton} onClick={fetchData}>
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!lintResult) {
        return (
            <div style={styles.container}>
                <div style={styles.error}>
                    <h3>No lint results available</h3>
                    <p>Please run the linter first.</p>
                    <button style={styles.refreshButton} onClick={fetchData}>
                        Refresh
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1>MxLint</h1>
                <div>
                    <div style={styles.timestamp}>
                        Last updated: {new Date(lintResult.timestamp).toLocaleString()}
                    </div>
                    <div style={styles.autoRefresh}>
                        <input 
                            type="checkbox" 
                            id="auto-refresh" 
                            checked={autoRefresh}
                            onChange={() => setAutoRefresh(!autoRefresh)}
                        />
                        <label htmlFor="auto-refresh">Auto-refresh (10s)</label>
                        <button style={styles.refreshButton} onClick={fetchData}>
                            Refresh Now
                        </button>
                    </div>
                </div>
            </div>

            {lintResult.error ? (
                <div style={styles.error}>{lintResult.error}</div>
            ) : (
                <>
                    <div style={styles.summary}>
                        <div 
                            style={{
                                ...styles.summaryItem, 
                                ...styles.summaryTotal,
                                ...(filterType === 'all' ? styles.summaryActive : {})
                            }}
                            onClick={() => setFilterType('all')}
                        >
                            <div style={styles.summaryNumber}>{getTotalTests()}</div>
                            <div>Total Tests</div>
                        </div>
                        <div 
                            style={{
                                ...styles.summaryItem, 
                                ...styles.summaryFailures,
                                ...(filterType === 'failures' ? styles.summaryActive : {})
                            }}
                            onClick={() => setFilterType('failures')}
                        >
                            <div style={styles.summaryNumber}>{getTotalFailures()}</div>
                            <div>Failures</div>
                        </div>
                        <div 
                            style={{
                                ...styles.summaryItem, 
                                ...styles.summarySkipped,
                                ...(filterType === 'skipped' ? styles.summaryActive : {})
                            }}
                            onClick={() => setFilterType('skipped')}
                        >
                            <div style={styles.summaryNumber}>{getTotalSkipped()}</div>
                            <div>Skipped</div>
                        </div>
                    </div>

                    {lintResult.results.rules.map((rule, index) => {
                        // Find matching test suite
                        const testSuite = lintResult.results.testsuites.find(
                            suite => suite.name === rule.path
                        );
                        
                        if (!testSuite) return null;
                        
                        // Filter test cases based on current filter
                        const filteredTestCases = filterTestCases(testSuite.testcases);
                        
                        // Skip rendering this rule if there are no test cases to show based on filter
                        if (filteredTestCases.length === 0 && filterType !== 'all') return null;
                        
                        return (
                            <div key={index} style={styles.rule}>
                                <div style={styles.ruleHeader}>
                                    <h3 style={styles.ruleTitle}>{rule.title}</h3>
                                    <div style={styles.ruleMeta}>
                                        <div>
                                            <span 
                                                style={
                                                    rule.severity === 'HIGH' ? styles.severityHigh : 
                                                    rule.severity === 'MEDIUM' ? styles.severityMedium : 
                                                    styles.severityLow
                                                }
                                            >
                                                {rule.severity}
                                            </span>
                                        </div>
                                        <div>{rule.category}</div>
                                        <div>Rule #{rule.ruleNumber}</div>
                                    </div>
                                </div>
                                <p>{rule.description}</p>
                                <p><strong>Remediation:</strong> {rule.remediation}</p>
                                
                                <h4>Test Results</h4>
                                {filteredTestCases.map((testCase, tcIndex) => (
                                    <div 
                                        key={tcIndex} 
                                        style={{
                                            ...styles.testcase,
                                            ...(testCase.failure ? styles.testcaseFail : 
                                               testCase.skipped ? styles.testcaseSkip : 
                                               styles.testcasePass)
                                        }}
                                    >
                                        <div style={styles.testcaseHeader}>
                                            <div>
                                                {testCase.failure ? '❌ ' : 
                                                 testCase.skipped ? '⏭️ ' : 
                                                 '✅ '}
                                                {testCase.name}
                                            </div>
                                            <div>{testCase.time.toFixed(3)}s</div>
                                        </div>
                                        {testCase.failure && (
                                            <div style={styles.failureMessage}>
                                                {testCase.failure.message}
                                            </div>
                                        )}
                                        {testCase.skipped && (
                                            <div>Skipped: {testCase.skipped.message}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SettingsProvider>
            <ViolationsOverview />
        </SettingsProvider>
    </StrictMode>
);

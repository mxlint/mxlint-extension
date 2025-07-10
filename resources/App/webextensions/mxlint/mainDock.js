import { c as T, j as e, r as d, S as R, u as C } from "./settingsContext-B_l6geO3.js";
function B() {
  const { settings: p } = C(), [t, y] = d.useState(null), [g, f] = d.useState(!0), [x, m] = d.useState(null), [l, u] = d.useState("failures"), [c, j] = d.useState(!0), a = async () => {
    try {
      f(!0);
      const s = await fetch(`http://localhost:${p.serverPort}/`, {
        headers: {
          Accept: "application/json"
        }
      });
      if (!s.ok)
        throw new Error(`Server responded with status: ${s.status}`);
      const i = await s.json();
      y(i), m(null);
    } catch (s) {
      console.error("Error fetching lint results:", s), m(s instanceof Error ? s.message : "Unknown error occurred");
    } finally {
      f(!1);
    }
  };
  d.useEffect(() => {
    a();
    let s;
    return c && (s = window.setInterval(() => {
      a();
    }, 1e4)), () => {
      s && clearInterval(s);
    };
  }, [c]);
  const v = () => {
    var s;
    return (s = t == null ? void 0 : t.results) != null && s.testsuites ? t.results.testsuites.reduce((i, o) => i + o.tests, 0) : 0;
  }, b = () => {
    var s;
    return (s = t == null ? void 0 : t.results) != null && s.testsuites ? t.results.testsuites.reduce((i, o) => i + o.failures, 0) : 0;
  }, k = () => {
    var s;
    return (s = t == null ? void 0 : t.results) != null && s.testsuites ? t.results.testsuites.reduce((i, o) => i + o.skipped, 0) : 0;
  }, S = (s) => l === "all" ? s : l === "failures" ? s.filter((i) => i.failure) : l === "skipped" ? s.filter((i) => i.skipped) : s, r = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      lineHeight: "1.6",
      color: "#333",
      padding: "10px",
      maxWidth: "100%",
      boxSizing: "border-box"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      paddingBottom: "2px",
      borderBottom: "1px solid #eee"
    },
    timestamp: {
      fontSize: "0.9em",
      color: "#666",
      clear: "both"
    },
    summary: {
      display: "flex",
      gap: "20px",
      marginBottom: "20px"
    },
    summaryItem: {
      padding: "10px 15px",
      borderRadius: "5px",
      textAlign: "center",
      cursor: "pointer",
      transition: "transform 0.1s ease",
      userSelect: "none"
    },
    summaryTotal: {
      backgroundColor: "#f0f7ff",
      border: "1px solid #cce5ff"
    },
    summaryFailures: {
      backgroundColor: "#fff5f5",
      border: "1px solid #ffdce0"
    },
    summarySkipped: {
      backgroundColor: "#f8f8f8",
      border: "1px solid #e1e4e8"
    },
    summaryActive: {
      boxShadow: "0 0 0 2px #0066cc"
    },
    summaryNumber: {
      fontSize: "1.5em",
      fontWeight: "bold"
    },
    rule: {
      backgroundColor: "#f9f9f9",
      borderRadius: "5px",
      padding: "15px",
      marginBottom: "20px",
      borderLeft: "4px solid #0066cc"
    },
    ruleHeader: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px"
    },
    ruleTitle: {
      fontWeight: "bold",
      margin: "0"
    },
    ruleMeta: {
      display: "flex",
      gap: "15px",
      fontSize: "0.9em"
    },
    severityHigh: {
      color: "#d73a49",
      fontWeight: "bold"
    },
    severityMedium: {
      color: "#e36209",
      fontWeight: "bold"
    },
    severityLow: {
      color: "#6a737d",
      fontWeight: "bold"
    },
    testcase: {
      padding: "10px",
      margin: "5px 0",
      borderRadius: "3px"
    },
    testcasePass: {
      backgroundColor: "#f0fff4",
      borderLeft: "3px solid #22863a"
    },
    testcaseFail: {
      backgroundColor: "#fff5f5",
      borderLeft: "3px solid #d73a49"
    },
    testcaseSkip: {
      backgroundColor: "#f8f8f8",
      borderLeft: "3px solid #6a737d"
    },
    testcaseHeader: {
      display: "flex",
      justifyContent: "space-between"
    },
    failureMessage: {
      backgroundColor: "#fff5f5",
      borderRadius: "3px",
      padding: "10px",
      marginTop: "5px",
      fontFamily: "monospace",
      whiteSpace: "pre-wrap"
    },
    refreshButton: {
      backgroundColor: "#0066cc",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px"
    },
    autoRefresh: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontSize: "0.9em"
    },
    loading: {
      textAlign: "center",
      padding: "20px",
      color: "#666"
    },
    error: {
      backgroundColor: "#fff5f5",
      borderRadius: "5px",
      padding: "15px",
      color: "#d73a49",
      marginBottom: "20px"
    }
  };
  return g && !t ? /* @__PURE__ */ e.jsx("div", { style: r.container, children: /* @__PURE__ */ e.jsx("div", { style: r.loading, children: "Loading lint results..." }) }) : x && !t ? /* @__PURE__ */ e.jsx("div", { style: r.container, children: /* @__PURE__ */ e.jsxs("div", { style: r.error, children: [
    /* @__PURE__ */ e.jsx("h3", { children: "Error loading lint results" }),
    /* @__PURE__ */ e.jsx("p", { children: x }),
    /* @__PURE__ */ e.jsxs("p", { children: [
      "Make sure mxlint-cli serve is running on port ",
      p.serverPort,
      "."
    ] }),
    /* @__PURE__ */ e.jsx("button", { style: r.refreshButton, onClick: a, children: "Retry" })
  ] }) }) : t ? /* @__PURE__ */ e.jsxs("div", { style: r.container, children: [
    /* @__PURE__ */ e.jsxs("div", { style: r.header, children: [
      /* @__PURE__ */ e.jsx("h1", { children: "MxLint" }),
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsxs("div", { style: r.timestamp, children: [
          "Last updated: ",
          new Date(t.timestamp).toLocaleString()
        ] }),
        /* @__PURE__ */ e.jsxs("div", { style: r.autoRefresh, children: [
          /* @__PURE__ */ e.jsx(
            "input",
            {
              type: "checkbox",
              id: "auto-refresh",
              checked: c,
              onChange: () => j(!c)
            }
          ),
          /* @__PURE__ */ e.jsx("label", { htmlFor: "auto-refresh", children: "Auto-refresh (10s)" }),
          /* @__PURE__ */ e.jsx("button", { style: r.refreshButton, onClick: a, children: "Refresh Now" })
        ] })
      ] })
    ] }),
    t.error ? /* @__PURE__ */ e.jsx("div", { style: r.error, children: t.error }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsxs("div", { style: r.summary, children: [
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            style: {
              ...r.summaryItem,
              ...r.summaryTotal,
              ...l === "all" ? r.summaryActive : {}
            },
            onClick: () => u("all"),
            children: [
              /* @__PURE__ */ e.jsx("div", { style: r.summaryNumber, children: v() }),
              /* @__PURE__ */ e.jsx("div", { children: "Total Tests" })
            ]
          }
        ),
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            style: {
              ...r.summaryItem,
              ...r.summaryFailures,
              ...l === "failures" ? r.summaryActive : {}
            },
            onClick: () => u("failures"),
            children: [
              /* @__PURE__ */ e.jsx("div", { style: r.summaryNumber, children: b() }),
              /* @__PURE__ */ e.jsx("div", { children: "Failures" })
            ]
          }
        ),
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            style: {
              ...r.summaryItem,
              ...r.summarySkipped,
              ...l === "skipped" ? r.summaryActive : {}
            },
            onClick: () => u("skipped"),
            children: [
              /* @__PURE__ */ e.jsx("div", { style: r.summaryNumber, children: k() }),
              /* @__PURE__ */ e.jsx("div", { children: "Skipped" })
            ]
          }
        )
      ] }),
      t.results.rules.map((s, i) => {
        const o = t.results.testsuites.find(
          (n) => n.name === s.path
        );
        if (!o) return null;
        const h = S(o.testcases);
        return h.length === 0 && l !== "all" ? null : /* @__PURE__ */ e.jsxs("div", { style: r.rule, children: [
          /* @__PURE__ */ e.jsxs("div", { style: r.ruleHeader, children: [
            /* @__PURE__ */ e.jsx("h3", { style: r.ruleTitle, children: s.title }),
            /* @__PURE__ */ e.jsxs("div", { style: r.ruleMeta, children: [
              /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx(
                "span",
                {
                  style: s.severity === "HIGH" ? r.severityHigh : s.severity === "MEDIUM" ? r.severityMedium : r.severityLow,
                  children: s.severity
                }
              ) }),
              /* @__PURE__ */ e.jsx("div", { children: s.category }),
              /* @__PURE__ */ e.jsxs("div", { children: [
                "Rule #",
                s.ruleNumber
              ] })
            ] })
          ] }),
          /* @__PURE__ */ e.jsx("p", { children: s.description }),
          /* @__PURE__ */ e.jsxs("p", { children: [
            /* @__PURE__ */ e.jsx("strong", { children: "Remediation:" }),
            " ",
            s.remediation
          ] }),
          /* @__PURE__ */ e.jsx("h4", { children: "Test Results" }),
          h.map((n, w) => /* @__PURE__ */ e.jsxs(
            "div",
            {
              style: {
                ...r.testcase,
                ...n.failure ? r.testcaseFail : n.skipped ? r.testcaseSkip : r.testcasePass
              },
              children: [
                /* @__PURE__ */ e.jsxs("div", { style: r.testcaseHeader, children: [
                  /* @__PURE__ */ e.jsxs("div", { children: [
                    n.failure ? "❌ " : n.skipped ? "⏭️ " : "✅ ",
                    n.name
                  ] }),
                  /* @__PURE__ */ e.jsxs("div", { children: [
                    n.time.toFixed(3),
                    "s"
                  ] })
                ] }),
                n.failure && /* @__PURE__ */ e.jsx("div", { style: r.failureMessage, children: n.failure.message }),
                n.skipped && /* @__PURE__ */ e.jsxs("div", { children: [
                  "Skipped: ",
                  n.skipped.message
                ] })
              ]
            },
            w
          ))
        ] }, i);
      })
    ] })
  ] }) : /* @__PURE__ */ e.jsx("div", { style: r.container, children: /* @__PURE__ */ e.jsxs("div", { style: r.error, children: [
    /* @__PURE__ */ e.jsx("h3", { children: "No lint results available" }),
    /* @__PURE__ */ e.jsx("p", { children: "Please run the linter first." }),
    /* @__PURE__ */ e.jsx("button", { style: r.refreshButton, onClick: a, children: "Refresh" })
  ] }) });
}
T.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ e.jsx(d.StrictMode, { children: /* @__PURE__ */ e.jsx(R, { children: /* @__PURE__ */ e.jsx(B, {}) }) })
);

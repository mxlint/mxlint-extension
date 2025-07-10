import { c as a, j as e, r as o, S as c, u as x } from "./settingsContext-B_l6geO3.js";
function p() {
  const { settings: n, updateSettings: i } = x(), [r, s] = o.useState(n.serverPort), l = () => {
    i({ serverPort: r }), console.log("Saving settings:", {
      serverPort: r
    }), alert("Settings saved!");
  }, t = {
    container: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: "16px",
      maxWidth: "100%",
      boxSizing: "border-box"
    },
    header: {
      marginBottom: "16px"
    },
    section: {
      marginBottom: "24px"
    },
    formGroup: {
      marginBottom: "16px"
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "bold"
    },
    input: {
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      width: "100%",
      boxSizing: "border-box"
    },
    button: {
      padding: "8px 16px",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#1976d2",
      color: "white",
      cursor: "pointer",
      marginRight: "8px"
    }
  };
  return /* @__PURE__ */ e.jsxs("div", { style: t.container, children: [
    /* @__PURE__ */ e.jsxs("div", { style: t.header, children: [
      /* @__PURE__ */ e.jsx("h1", { children: "MxLint Settings" }),
      /* @__PURE__ */ e.jsx("p", { children: "Configure linting rules and execution settings" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { style: t.section, children: [
      /* @__PURE__ */ e.jsx("h2", { children: "System Configuration" }),
      /* @__PURE__ */ e.jsxs("div", { style: t.formGroup, children: [
        /* @__PURE__ */ e.jsx("label", { style: t.label, htmlFor: "serverPort", children: "Server Port" }),
        /* @__PURE__ */ e.jsx(
          "input",
          {
            id: "serverPort",
            type: "text",
            style: t.input,
            value: r,
            onChange: (d) => s(d.target.value),
            placeholder: "Port for mxlint-cli serve (default: 8084)"
          }
        ),
        /* @__PURE__ */ e.jsx("div", { style: { fontSize: "14px", color: "#666", marginTop: "4px" }, children: "The port that the extension will use to connect to the mxlint-cli serve API" })
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("div", { style: { marginTop: "24px" }, children: /* @__PURE__ */ e.jsx("button", { style: t.button, onClick: l, children: "Save Settings" }) })
  ] });
}
a.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ e.jsx(o.StrictMode, { children: /* @__PURE__ */ e.jsx(c, { children: /* @__PURE__ */ e.jsx(p, {}) }) })
);

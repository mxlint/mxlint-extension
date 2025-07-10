import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { useSettings } from "./settingsContext";

function SettingsTab() {
    const { settings, updateSettings } = useSettings();
    const [serverPort, setServerPort] = useState<string>(settings.serverPort);

    const saveSettings = () => {
        // Save to context
        updateSettings({ serverPort });
        
        // This would save the rule settings to the extension's storage
        console.log("Saving settings:", {
            serverPort
        });
        alert("Settings saved!");
    };

    // CSS styles
    const styles = {
        container: {
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            padding: '16px',
            maxWidth: '100%',
            boxSizing: 'border-box' as const
        },
        header: {
            marginBottom: '16px'
        },
        section: {
            marginBottom: '24px'
        },
        formGroup: {
            marginBottom: '16px'
        },
        label: {
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold' as const
        },
        input: {
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '100%',
            boxSizing: 'border-box' as const
        },
        categoryHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            marginBottom: '8px'
        },
        checkbox: {
            marginRight: '8px'
        },
        rule: {
            display: 'flex',
            alignItems: 'center',
            padding: '8px 12px',
            borderBottom: '1px solid #eee',
            marginLeft: '24px'
        },
        ruleDetails: {
            flex: 1,
            marginLeft: '8px'
        },
        ruleTitle: {
            fontWeight: 'bold' as const
        },
        ruleDescription: {
            fontSize: '14px',
            color: '#666',
            marginTop: '4px'
        },
        severitySelect: {
            padding: '6px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginLeft: '8px'
        },
        button: {
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#1976d2',
            color: 'white',
            cursor: 'pointer',
            marginRight: '8px'
        },
        buttonSecondary: {
            backgroundColor: '#f5f5f5',
            color: '#333',
            border: '1px solid #ddd'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1>MxLint Settings</h1>
                <p>Configure linting rules and execution settings</p>
            </div>

            <div style={styles.section}>
                <h2>System Configuration</h2>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="serverPort">Server Port</label>
                    <input
                        id="serverPort"
                        type="text"
                        style={styles.input}
                        value={serverPort}
                        onChange={(e) => setServerPort(e.target.value)}
                        placeholder="Port for mxlint-cli serve (default: 8084)"
                    />
                    <div style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
                        The port that the extension will use to connect to the mxlint-cli serve API
                    </div>
                </div>
            </div>

            <div style={{marginTop: '24px'}}>
                <button style={styles.button} onClick={saveSettings}>
                    Save Settings
                </button>
            </div>
        </div>
    );
}

import { SettingsProvider } from "./settingsContext";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SettingsProvider>
            <SettingsTab />
        </SettingsProvider>
    </StrictMode>
);

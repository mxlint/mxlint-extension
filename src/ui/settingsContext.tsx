import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Settings {
    serverPort: string;
}

interface SettingsContextType {
    settings: Settings;
    updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
    serverPort: '8082',
};

const SettingsContext = createContext<SettingsContextType>({
    settings: defaultSettings,
    updateSettings: () => {},
});

export const useSettings = () => useContext(SettingsContext);

interface SettingsProviderProps {
    children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
    const [settings, setSettings] = useState<Settings>(() => {
        // Try to load settings from localStorage if available
        try {
            const storedSettings = localStorage.getItem('mxlint-settings');
            return storedSettings ? { ...defaultSettings, ...JSON.parse(storedSettings) } : defaultSettings;
        } catch (error) {
            console.error('Failed to load settings from localStorage:', error);
            return defaultSettings;
        }
    });

    const updateSettings = (newSettings: Partial<Settings>) => {
        const updatedSettings = { ...settings, ...newSettings };
        setSettings(updatedSettings);
        
        // Save to localStorage if available
        try {
            localStorage.setItem('mxlint-settings', JSON.stringify(updatedSettings));
        } catch (error) {
            console.error('Failed to save settings to localStorage:', error);
        }
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}; 
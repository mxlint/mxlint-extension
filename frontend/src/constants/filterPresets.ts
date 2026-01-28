import type { Status, Severity } from '@/types';

export interface FilterPreset {
  id: string;
  name: string;
  filters: {
    statuses: Status[];
    severities: Severity[];
  };
}

export const FILTER_PRESETS: FilterPreset[] = [
  { id: 'critical', name: 'Critical Issues', filters: { statuses: ['fail'], severities: ['HIGH'] } },
  { id: 'all-failures', name: 'All Failures', filters: { statuses: ['fail'], severities: ['HIGH', 'MEDIUM', 'LOW'] } },
  { id: 'warnings', name: 'Warnings Only', filters: { statuses: ['fail'], severities: ['MEDIUM', 'LOW'] } },
  { id: 'skipped', name: 'Skipped Tests', filters: { statuses: ['skip'], severities: ['HIGH', 'MEDIUM', 'LOW'] } },
  { id: 'all-passing', name: 'All Passing', filters: { statuses: ['pass'], severities: ['HIGH', 'MEDIUM', 'LOW'] } },
];

const NON_OPENABLE_DOCUMENTS = new Set([
  'Metadata',
  'Security$ProjectSecurity',
  'Settings$ProjectSettings',
  'app',
]);

export const isOpenableDocument = (docname: string) => !NON_OPENABLE_DOCUMENTS.has(docname);

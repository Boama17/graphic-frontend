# ESLint Configuration Changes

## Overview
This document describes the changes made to disable ESLint rules in the project.

## Changes Made
We modified the ESLint configuration file (`eslint.config.mjs`) to disable various ESLint rules, including:

1. TypeScript-specific rules:
   - `@typescript-eslint/no-unused-vars`
   - `@typescript-eslint/no-explicit-any`

2. React hooks rules:
   - `react-hooks/rules-of-hooks`
   - `react-hooks/exhaustive-deps`

3. React-specific rules:
   - `react/no-unescaped-entities`
   - `react/display-name`

4. Import rules:
   - `import/no-anonymous-default-export`

5. Accessibility rules:
   - `jsx-a11y/alt-text`
   - `jsx-a11y/anchor-is-valid`

6. Next.js-specific rules:
   - `@next/next/no-img-element`
   - `@next/next/no-html-link-for-pages`

## How to Modify
If you need to re-enable specific rules or disable additional rules, you can modify the `rules` object in `eslint.config.mjs`:

```javascript
rules: {
  // Set to 'off' to disable a rule
  // Set to 'warn' to show warnings but not fail
  // Set to 'error' to fail on violations
  'rule-name': 'off',
}
```

## Alternative Approaches

### Disable ESLint for Specific Files
Add a comment at the top of the file:
```javascript
/* eslint-disable */
```

### Disable Specific Rules for a File
Add a comment at the top of the file:
```javascript
/* eslint-disable rule-name, another-rule-name */
```

### Disable ESLint for a Specific Line
Add a comment at the end of the line:
```javascript
const someVar = 'value'; // eslint-disable-line
```
or before the line:
```javascript
// eslint-disable-next-line
const someVar = 'value';
```

## Testing
We verified that ESLint rules are disabled by running:
```
npm run lint
```
The command now reports "No ESLint warnings or errors".
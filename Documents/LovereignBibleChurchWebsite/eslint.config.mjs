import {dirname} from "path";
import {fileURLToPath} from "url";
import {FlatCompat} from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable all rules
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/rules-of-hooks': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/no-unescaped-entities': 'off',
      'react/display-name': 'off',
      'import/no-anonymous-default-export': 'off',
      'jsx-a11y/alt-text': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      // Next.js specific rules
      '@next/next/no-img-element': 'off',
      '@next/next/no-html-link-for-pages': 'off',
      // Add any other specific rules you want to disable
      // Or use this to disable all rules:
      // ...Object.keys(require('eslint/lib/rules')).reduce((acc, rule) => {
      //   acc[rule] = 'off';
      //   return acc;
      // }, {})
    }
  }
];

export default eslintConfig;

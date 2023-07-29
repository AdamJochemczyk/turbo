module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'next',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:vitest-globals/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import'],
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['apps/*/tsconfig.json'],
      },
    },
  },
  rules: {
    // react
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
    // next
    '@next/next/no-html-link-for-pages': 'off',
  },
 "overrides": [
    {
      "files": ["**/__tests__/*.{j,t}s?(x)", "**/*.spec.{j,t}s?(x)"],
      "env": {
        "vitest-globals/env": true
      }
    }
  ],
  ignorePatterns: [
    '**/*.js',
    '**/*.json',
    'node_modules',
    'public',
    'styles',
    '.next',
    'coverage',
    'dist',
    '.turbo',
  ],
}
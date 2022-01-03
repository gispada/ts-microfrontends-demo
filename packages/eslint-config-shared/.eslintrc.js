module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'spaced-comment': 1,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-unused-vars': [
      1,
      { ignoreRestSiblings: true, argsIgnorePattern: '^_' }
    ],
    '@typescript-eslint/no-explicit-any': 0
    // 'react/prop-types': 0,
    // 'react/react-in-jsx-scope': 0
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 0
      }
    }
  ],
  ignorePatterns: ['**/build/*']
}

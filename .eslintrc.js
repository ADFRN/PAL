module.exports = {
    env: {
        browser: true,
        es2021: true,
        'react-native/react-native': true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-native/all',
        'plugin:prettier/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        'react-native',
        '@typescript-eslint',
        'import',
        'jsx-a11y',
        'prettier',
    ],
    rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'react/react-in-jsx-scope': 'off', // Pas nécessaire avec React 17+
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'react-native/no-inline-styles': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};

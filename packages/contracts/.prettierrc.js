module.exports = {
  singleQuote: true,
  bracketSpacing: false,
  overrides: [
    {
      files: '*.sol',
      options: {
        printWidth: 90,
        tabWidth: 4,
        singleQuote: false,
        explicitTypes: 'always',
        trailingComma: 'all',
        semi: false,
      },
    },
  ],
};

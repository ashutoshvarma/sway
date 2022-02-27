module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
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
}

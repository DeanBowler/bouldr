const { resolve } = require('path');

module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  setupFilesAfterEnv: ['./setupTests.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  moduleNameMapper: {
    '^@/lib/(.*)$': resolve(__dirname, './lib/$1'),
    '^@/hooks/(.*)$': resolve(__dirname, './hooks/$1'),
    '^@/styled/(.*)$': resolve(__dirname, './styled/$1'),
    '^@/components/(.*)$': resolve(__dirname, './components/$1'),
  },
};

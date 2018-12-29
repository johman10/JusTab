const path = require('path');

module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'vue'],
  moduleDirectories: ['node_modules'],
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).js'],
  testPathIgnorePatterns: ['./node_modules'],
  transformIgnorePatterns: ['./node_modules'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest'
  },
  moduleNameMapper: {
    '^store(.*)$': path.join(__dirname, '/store$1'),
    '^modules(.*)$': path.join(__dirname, '/js/modules$1'),
    '^img(.*)$': path.join(__dirname, '/img$1'),
    '^js(.*)$': path.join(__dirname, '/js$1'),
    '^css(.*)$': path.join(__dirname, '/style/sass$1'),
    '^components(.*)$': path.join(__dirname, '/components$1'),
    '^test(.*)$': path.join(__dirname, '/__tests__$1'),
  }
};


const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  workerThreads: true,
  testTimeout: 10000,
  // Other Jest configurations...

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};


//* Manually copy paths prefixes from ts-config
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   // Your Jest configurations here...
//   moduleNameMapper: {
//     '^@/functions/(.*)$': '<rootDir>/functions/$1',
//     '^@/api/(.*)$': '<rootDir>/api/$1',
//     '^@/config/(.*)$': '<rootDir>/config/$1',
//     // Add more mappings as needed
//   },
// };

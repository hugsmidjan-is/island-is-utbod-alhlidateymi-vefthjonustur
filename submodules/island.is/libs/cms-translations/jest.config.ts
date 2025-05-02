/* eslint-disable */
export default {
  preset: './jest.preset.js',
  rootDir: '../..',
  roots: [__dirname],
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      { tsconfig: `${__dirname}/tsconfig.spec.json` },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '<rootDir>/coverage/libs/cms-translations',
  globals: {},
  displayName: 'cms-translations',
}

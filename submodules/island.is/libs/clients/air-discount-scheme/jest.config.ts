/* eslint-disable */
export default {
  displayName: 'clients-air-discount-scheme',
  preset: './jest.preset.js',
  rootDir: '../../..',
  roots: [__dirname],
  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      { tsconfig: `${__dirname}/tsconfig.spec.json` },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '<rootDir>/coverage/libs/clients/air-discount-scheme',
}

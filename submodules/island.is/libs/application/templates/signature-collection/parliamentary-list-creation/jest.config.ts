/* eslint-disable */
export default {
  displayName: 'application-templates-parliamentary-list-creation',
  preset: './jest.preset.js',
  rootDir: '../../../../..',
  roots: [__dirname],
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '<rootDir>/coverage/libs/application/templates/signature-collection/parliamentary-list-creation',
}

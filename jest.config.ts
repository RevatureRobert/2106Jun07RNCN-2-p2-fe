import { withEnzyme } from 'jest-expo-enzyme';

//see https://github.com/expo/expo/issues/10211#issuecomment-699967834
type configObj = {
  setupFiles: any;
  setupFilesAfterEnv: any,
  testMatch: any,
  testPathIgnorePatterns: any,
  moduleNameMapper: any;
}
function withExtras(config: configObj){
  config.setupFilesAfterEnv.push('<rootDir>/__tests__/test-setup.js');
  // config.testMatch = ['<rootDir>/__tests__/_components/semantic/ImageViewModal.test.js'];
  return config;
}

module.exports = {
  projects: [
    withExtras(withEnzyme(require('jest-expo/ios/jest-preset')) as configObj),
    withExtras(withEnzyme(require('jest-expo/android/jest-preset')) as configObj),
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.{ts, tsx}',
    '!./src/redux/axiosConfig.ts',
    '!./src/redux/**/*.{ts, tsx}',
    '!./src/components/semantic/ImageForWeb/types.ts',
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      statements: 30,
    }
  },
};

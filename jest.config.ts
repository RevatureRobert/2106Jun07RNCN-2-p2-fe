import { withEnzyme } from 'jest-expo-enzyme';

//see https://github.com/expo/expo/issues/10211#issuecomment-699967834
type configObj = {
  setupFilesAfterEnv: any;
}
function withExtras(config: configObj){
  config.setupFilesAfterEnv.push('<rootDir>/__tests__/test-setup.js');
  return config;
}

module.exports = {
    //==========================================================================
    // Configure Enzyme (see https://npm.io/package/jest-expo-enzyme)
    // see link in comment before configObj declaration as well
    //==========================================================================
    projects: [
      withExtras(withEnzyme(require('jest-expo/ios/jest-preset')) as configObj),
      withExtras(withEnzyme(require('jest-expo/android/jest-preset')) as configObj),
    ],

    //==========================================================================
    // configure Jest coverage report
    //==========================================================================
    collectCoverage: true,
    collectCoverageFrom: [
        "./src/**/*.{ts, tsx}",
    ],
    coverageDirectory: 'coverage',
    coverageThreshold: {
      global: {
        statements: 30,
      }
    },
};

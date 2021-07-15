import { withEnzyme } from 'jest-expo-enzyme';

module.exports = {
    //==========================================================================
    //Configure Enzyme (see https://npm.io/package/jest-expo-enzyme)
    //==========================================================================
    projects: [
      withEnzyme(require('jest-expo/ios/jest-preset')),
      withEnzyme(require('jest-expo/android/jest-preset')),
      withEnzyme(require('jest-expo/web/jest-preset')),
    ],
    preset: "jest-expo-enzyme",
    // setupFiles: ['<rootDir>/__tests__/test-setup.js'],

    //==========================================================================
    //configure Jest coverage report
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
    
    //==========================================================================
    //miscellaneous 
    //==========================================================================
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },

    /*//if you include next line, add import { defaults } from 'jest-config';
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],*/

    //see https://docs.expo.io/guides/testing-with-jest/#jest-configuration
    transformIgnorePatterns: [
      "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)"
    ],
};

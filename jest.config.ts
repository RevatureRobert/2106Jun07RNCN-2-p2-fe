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
    // see link before configObj declaration as well
    //==========================================================================
    projects: [
      withExtras(withEnzyme(require('jest-expo/ios/jest-preset')) as configObj),
      withExtras(withEnzyme(require('jest-expo/android/jest-preset')) as configObj),
      // withExtras(withEnzyme(require('jest-expo/web/jest-preset')) as configObj),
    ],

    //==========================================================================
    // configure Jest coverage report
    //==========================================================================
    // collectCoverage: true,
    // collectCoverageFrom: [
    //     "./src/**/*.{ts, tsx}",
    // ],
    // coverageDirectory: 'coverage',
    // coverageThreshold: {
    //   global: {
    //     statements: 30,
    //   }
    // },
    
    //==========================================================================
    // miscellaneous jest configuration
    // !!!unnecessary when using withEnzyme(). Will be deprecated soon
    //==========================================================================
    // transform: {
    //   "^.+\\.(ts|tsx)$": "ts-jest",
    //   "\\.js$": "<rootDir>/node_modules/babel-jest",
    // },

    // /*//if you include next line, add import { defaults } from 'jest-config';
    // moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],*/

    // //see https://jestjs.io/docs/webpack#handling-static-assets
    // moduleNameMapper: {
    //   "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__tests__/mocksfileMock.js",
    //   "\\.(css|less)$": "<rootDir>/__tests__/mocks/styleMock.js"
    // },

    // //see https://docs.expo.io/guides/testing-with-jest/#jest-configuration
    // transformIgnorePatterns: [
    //   "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)"
    // ],
};

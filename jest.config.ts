import { withEnzyme } from 'jest-expo-enzyme';

//see https://github.com/expo/expo/issues/10211#issuecomment-699967834
type configObj = {
  setupFilesAfterEnv: any,
  testMatch: any,
  testPathIgnorePatterns: any,
}
function withExtras(config: configObj){
  config.setupFilesAfterEnv.push('<rootDir>/__tests__/test-setup.js');
  if ( config.hasOwnProperty('testPathIgnorePatterns') ) {
    config.testPathIgnorePatterns.push('<rootDir>/__tests__/_componentTests/App.test.js');
  } else {
    config.testPathIgnorePatterns = ['<rootDir>/__tests__/_componentTests/App.test.js'];
  }

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
      // withExtras(withEnzyme(require('jest-expo/web/jest-preset')) as configObj),
      // {
      //   transform: {
      //     '^.+\\.(js|ts|tsx)$': 'babel-jest',
      //     '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp|ttf|otf|m4v|mov|mp4|mpeg|mpg|webm|aac|aiff|caf|m4a|mp3|wav|html|pdf|obj)$': 'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-expo\\src\\preset\\assetFileTransformer.js'
      //   },
      //   transformIgnorePatterns: [
      //     'node_modules/(?!(jest-)?react-native|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'  
      //   ],
      //   displayName: { name: 'redux', color: 'yellow' },
      //   testMatch: [
      //     '**/__tests__/**/*test_.[jt]s?(x)',
      //   ],
      //   moduleFileExtensions: [
      //     'ts',             'tsx',
      //     'js',             'jsx',
      //   ],
      // },
    ],

    //==========================================================================
    // configure Jest coverage report
    //==========================================================================
    collectCoverage: true,
    collectCoverageFrom: [
      './src/**/*.{ts, tsx}',
      '!./src/redux/axiosConfig.ts',
      '!./src/redux/store/store.ts',
    ],
    coveragePathIgnorePatterns: [
      'axiosConfig',
      'redux/store',
    ],
    coverageDirectory: 'coverage',
    coverageThreshold: {
      global: {
        statements: 30,
      }
    },
};

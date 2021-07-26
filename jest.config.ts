import { withEnzyme } from 'jest-expo-enzyme';

//see https://github.com/expo/expo/issues/10211#issuecomment-699967834
type configObj = {
  setupFilesAfterEnv: any,
  testMatch: any,
  testPathIgnorePatterns: any,
}
function withExtras(config: configObj){
  config.setupFilesAfterEnv.push('<rootDir>/__tests__/test-setup.js');
  config.testPathIgnorePatterns = [
      '<rootDir>/__tests__/_components/App.test.js',
      '<rootDir>/__tests__/_redux/*',
  ];
  return config;
}


//configure redux tests
const reduxConfig = {
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
    '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp|ttf|otf|m4v|mov|mp4|mpeg|mpg|webm|aac|aiff|caf|m4a|mp3|wav|html|pdf|obj)$': 'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-expo\\src\\preset\\assetFileTransformer.js'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'  
  ],
  displayName: { name: 'redux', color: 'yellow' },
  testMatch: [
    '**/__tests__/**/*test.[jt]s?(x)',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/_componentTests/App.test.js',
    '<rootDir>/__tests__/_components/*'
  ],
  moduleFileExtensions: [
    'ts',             'tsx',
    'js',             'jsx',
  ],
}


module.exports = {
  projects: [
    withExtras(withEnzyme(require('jest-expo/ios/jest-preset')) as configObj),
    withExtras(withEnzyme(require('jest-expo/android/jest-preset')) as configObj),
    // withExtras(withEnzyme(require('jest-expo/web/jest-preset')) as configObj),
    // reduxConfig,
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

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
  config.testPathIgnorePatterns = ['<rootDir>/__tests__/_shared/functions.test.js',];
  return config;
}

const testFunctions = {
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
    '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp|ttf|otf|m4v|mov|mp4|mpeg|mpg|webm|aac|aiff|caf|m4a|mp3|wav|html|pdf|obj)$': 'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-expo\\src\\preset\\assetFileTransformer.js'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'  
  ],
  displayName: { name: 'functions', color: 'yellow' },
  testMatch: [
    '<rootDir>/__tests__/_shared/functions.test.js',
  ],
  moduleFileExtensions: [
    'ts',             'tsx',
    'js',             'jsx',
  ],
};

module.exports = {
  projects: [
    withExtras(withEnzyme(require('jest-expo/ios/jest-preset')) as configObj),
    withExtras(withEnzyme(require('jest-expo/android/jest-preset')) as configObj),
    testFunctions,
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/components/*',
    '<rootDir>/src/components/addchirp/*',
    '!<rootDir>/src/components/addchirp/addchirpstyles.ts',
    '<rootDir>/src/components/chirps/*',
    '!<rootDir>/src/components/chirps/chirpstyles.ts',
    '<rootDir>/src/components/navigation/*',
    '<rootDir>/src/components/replies/*',
    '!<rootDir>/src/components/replies/repliesstyles.tsx',
    '<rootDir>/src/components/search/*',
    '<rootDir>/src/components/semantic/*',
    '!<rootDir>/src/components/semantic/semanticstyles.ts',
    '<rootDir>/src/components/user/*',
    '!<rootDir>/src/components/user/userstyles.ts',
    '<rootDir>/src/shared/*',
    '!<rootDir>/src/shared/constants.ts',
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      statements: 30,
    }
  },
};

import { withEnzyme } from 'jest-expo-enzyme';
import {defaults} from 'jest-config';

module.exports = {
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    projects: [
      // Skipping Node because we want to test DOM presets only
      withEnzyme(require('jest-expo/ios/jest-preset')),
      withEnzyme(require('jest-expo/android/jest-preset')),
      // The Enzyme support added to web is different from that added to native, which `withEnzyme` handles
      // Luckily you won't have to do anything special because it reads the platform from
      // `haste.defaultPlatform` of the provided Jest config
      withEnzyme(require('jest-expo/web/jest-preset')),
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        "./src/**/*.{ts, tsx}",
    ],
    coverageDirectory: 'coverage',
    preset: "jest-expo-enzyme",
    // setupFiles: ['<rootDir>/__tests__/test-setup.js'],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
};


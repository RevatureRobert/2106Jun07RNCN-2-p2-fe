import 'react-native';
import 'jest-enzyme';
import 'react-native-gesture-handler/jestSetup';

//==============================================================================
// Mock native modules
// see https://reactnavigation.org/docs/testing/
//==============================================================================
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
//Some documentation online has the following two mocks instead, but these throw
//  errors for me. I'm keeping them just in case
// jest.mock('NativeAnimatedHelp');
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {/*no-op*/};
  return Reanimated;
});


//==============================================================================
// Normally, you need to ensure a dom environment is loaded for enzyme
//    (see https://stackoverflow.com/a/46897553)
// But the use of withEnzyme() in jest.config.ts does this for us
//==============================================================================

//==============================================================================
// Almost certainly unncecessary, but mock fetch requests
//    (see https://www.leighhalliday.com/mock-fetch-jest)
//==============================================================================
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
  })
);

//==============================================================================
// Normally, you need to configure an Enzyme adapter, but withEnzyme does that 
// for us
//==============================================================================
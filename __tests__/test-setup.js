import 'react-native';
import 'jest-enzyme';
import 'react-native-gesture-handler/jestSetup';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

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
  Reanimated.default.call = () => {
    /* you get warnings with an empty function unless you write a comment */
  };
  return Reanimated;
});


//==============================================================================
// Ensure a dom environment is loaded for enzyme
// see https://stackoverflow.com/a/46897553
//==============================================================================
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM(
  '<!doctype html><html><body></body></html>',
  {url: 'http://localhost/'}
);
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);


//==============================================================================
// Mock AWS Cognito CognitoIdentityServiceProvider with Jest
// see https://stackoverflow.com/a/65823015
//==============================================================================
// jest.mock('aws-sdk', () => {
//   return {
//     CognitoIdentityServiceProvider: class {
//       adminInitiateAuth() {
//         return this;
//       }

//       promise() {
//         return Promise.resolve(mockResponse);
//       }
//     }
//   }
// });

//mock fetch requests (see https://www.leighhalliday.com/mock-fetch-jest)
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
  })
);

// import ConsoleLogger from 'node_modules/@aws-amplify/core/src/Logger/ConsoleLogger';
// ConsoleLogger._log() = jest.fn().mockImplementation(
//    () => {/*no-op*/}
// );

 Enzyme.configure({ adapter: new Adapter() });
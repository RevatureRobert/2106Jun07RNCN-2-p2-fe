import 'react-native';
import 'jest-enzyme';
import 'react-native-gesture-handler/jestSetup';

//==============================================================================
// Mock native modules
//    see https://reactnavigation.org/docs/testing/
// This actually isn't necessary, but it removes an annoying warning that would 
//    otherwise show for every test
//==============================================================================
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
//Some documentation online has the following two mocks instead, but these throw
//  errors for me. I'm keeping them just in case
// jest.mock('NativeAnimatedHelp');
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
// jest.mock('react-native-reanimated', () => {
//   const Reanimated = require('react-native-reanimated/mock');
//   Reanimated.default.call = () => {/*no-op*/};
//   return Reanimated;
// });


//==============================================================================
// Normally, you need to ensure a dom environment is loaded for enzyme
//    (see https://stackoverflow.com/a/46897553)
// But the use of withEnzyme() in jest.config.ts does this for us
//==============================================================================


//==============================================================================
// Almost certainly unncecessary
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


//==============================================================================
// !!!
// MIGHT BE ABLE TO TEST ON WEB NOW!!!
//    SEE https://github.com/expo/expo/issues/9004
//==============================================================================
jest.mock('../src/assets/adaptive-icon.png', () => 'adaptive-icon.png');
jest.mock('../src/assets/chirperIcon.png', () => 'chirperIcon.png');
jest.mock('../src/assets/chirperIcon2-large.png', () => 'chirperIcon2-large.png');
jest.mock('../src/assets/chirperIcon2-large.png', () => 'chirperIcon2-large.png');
jest.mock('../src/assets/chirperLogo.png', () => 'chirperLogo.png');
jest.mock('../src/assets/deadbird.png', () => 'deadbird.png');
jest.mock('../src/assets/defaultUserImage.jpeg', () => 'defaultUserImage.jpeg');
jest.mock('../src/assets/favicon.png', () => 'favicon.png');
jest.mock('../src/assets/icon.png', () => 'icon.png');
jest.mock('../src/assets/preloader.gif', () => 'preloader.gif');
jest.mock('../src/assets/splash.png', () => 'splash.png');
jest.mock('../src/assets/splash.xcf', () => 'splash.xcf');
// import { Image } from 'react-native';
// jest.mock('Image', () => {
//   const RealComponent = jest.requireActual('Image');
//   const React = require('react');
//   class Image extends React.Component {
//     render() {
//       return React.createElement('Image', this.props, this.props.children);
//     }
//   }
//   Image.propTypes = RealComponent.propTypes;
//   return Image;
// });

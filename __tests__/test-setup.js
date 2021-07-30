import 'react-native-gesture-handler/jestSetup';

//==============================================================================
// Mock native modules
//    see https://reactnavigation.org/docs/testing/
// This actually isn't necessary, but it removes an annoying warning that would 
//    otherwise show for every test
//==============================================================================
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');


//==============================================================================
// Normally, you need to ensure a dom environment is loaded for enzyme
//    (see https://stackoverflow.com/a/46897553)
// But the use of withEnzyme() in jest.config.ts does this for us
//==============================================================================


//==============================================================================
// Normally, you need to configure an Enzyme adapter, but withEnzyme does that 
// for us
//==============================================================================

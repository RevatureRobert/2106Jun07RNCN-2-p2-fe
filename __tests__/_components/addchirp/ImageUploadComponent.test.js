import React from 'react';
import { TouchableOpacity } from 'react-native';
import { mount } from 'enzyme';
import { testState } from '../../../src/shared/constants';
import { nestedHell } from '../../testFunctions';

import { Storage } from 'aws-amplify';
import * as ImagePicker from 'expo-image-picker';

import { ImageUploadComponent } from '../../../src/components/addchirp/ImageUploadComponent';

const component = () => {
  return (
    <ImageUploadComponent
      setImageURL={() => {
        /*no-op*/
      }}
    />
  );
};

it('displays icon that responds to press event', async () => {
  //mock libraries used by eventHandler
  jest.spyOn(Storage, 'get').mockImplementation(() => {
    return Promise.resolve({});
  });
  jest.spyOn(Storage, 'put').mockImplementation(() => {
    return Promise.resolve({ uri: '' });
  });
  jest.spyOn(ImagePicker, 'launchImageLibraryAsync').mockImplementation(() => {
    return { uri: '' };
  });
  jest.spyOn(global, 'fetch').mockImplementation(() => {
    const func = () => {
      return {};
    };
    return Promise.resolve({ blob: func });
  });

  const wrapper = mount(nestedHell(testState, component));
  let wrap = wrapper.find(TouchableOpacity);
  if (wrap.length > 1) {
    wrap = wrap.last();
  }

  const eventHandler = jest.spyOn(wrap.props(), 'onPress');
  wrap.props().onPress();
  expect(eventHandler).toHaveBeenCalled();
});

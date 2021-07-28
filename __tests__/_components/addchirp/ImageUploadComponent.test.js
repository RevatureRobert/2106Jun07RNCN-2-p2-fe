import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { mount } from 'enzyme';
import { testState } from '../../../src/shared/constants';
import { nestedHell, findAndShallowRender } from '../../testFunctions';
import { mockEvent } from '../../mocks';

import { ImageUploadComponent } from '../../../src/components/addchirp/ImageUploadComponent';

const component = () => {
    return (<ImageUploadComponent/>);
}

it('displays icon that responds to press event', () => {
    const wrapper = mount(nestedHell(testState, component));
    const wrap = findAndShallowRender(wrapper, TouchableOpacity);
    const containsIcon = wrap.find(MaterialCommunityIcons).length === 1;
    if( wrap.props().hasOwnProperty('onPress') && containsIcon){
        wrap.setProps( {onPress: mockEvent} );
        wrap.simulate('press');
    }
    expect(mockEvent).toHaveBeenCalled();
});

it('displays icon that responds to press event, but better', () => {
    const wrapper = mount(nestedHell(testState, component));
    const wrap = findAndShallowRender(wrapper, TouchableOpacity);
    const containsIcon = wrap.find(MaterialCommunityIcons).length === 1;
    if( wrap.props().hasOwnProperty('onPress') && containsIcon){
        wrap.setProps( {onPress: mockEvent} );
        wrap.simulate('press');
    }
    expect(mockEvent).toHaveBeenCalled();
});
import React from 'react';
import  { View, TouchableHighlight } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { mount } from 'enzyme';
import { testState } from '../../../src/shared/constants';
import { nestedHell } from '../../testFunctions';
import { mockEvent } from '../../mocks';

import AddChirpBtnComponent from '../../../src/components/addchirp/AddChirpBtnComponent';

let wrapper;

const component = () => {
    return (<AddChirpBtnComponent/>);
}

describe('Testing UserChirpsComponent when chirps are loading', () => {
    beforeEach( () => {
        wrapper = mount(nestedHell(testState, component));
    });

    it('renders MaterialCommunityIcons in TouchableHighlight in View', () => {
        const wrap = wrapper
            .find(View)
            .find(TouchableHighlight)
            .find(MaterialCommunityIcons);
        expect(wrap.length).toBeGreaterThan(0);
    });

    it('button can be pressed', () => {
        const wrap = wrapper.find(View).find(TouchableHighlight);
        const w = shallow(wrap.getElement());
        if( w.props().hasOwnProperty('onPress') ){
            w.setProps( {onPress: mockEvent} );
            w.simulate('press');
        }
        expect(mockEvent).toHaveBeenCalled();
    });
});
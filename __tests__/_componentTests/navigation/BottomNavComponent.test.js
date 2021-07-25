import React from 'react';
import  { Text, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { mount } from 'enzyme';
import { testState } from '../../../src/shared/constants';
import { nestedHell, findAndShallowRender } from '../../testFunctions';
import { mockEvent } from '../../mocks';

import BottomNavComponent from '../../../src/components/navigation/BottomNavComponent';
import HeaderComponent from '../../../src/components/semantic/HeaderComponent';
import AddChirpBtnComponent from '../../../src/components/addchirp/AddChirpBtnComponent';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


let wrapper;

const component = () => {
    return (<BottomNavComponent/>);
}

describe('Testing BottomNavComponent', () => {
    beforeEach( () => {
        wrapper = mount(nestedHell(testState, component));
    });

    it('Has a tab navigator initialized to some screen', () => {
        const wrap = wrapper.findWhere((node) => node.prop('initialRouteName') !== undefined);
        expect(wrapper
            .findWhere((node) => node.prop('name') === wrap.prop('initialRouteName'))
            .length
        ).toBeGreaterThan(0);
    });
});
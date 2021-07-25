import React from 'react';
import { StatusBar } from 'react-native';
import { mount } from 'enzyme';
import { testState } from '../../src/shared/constants';
import { nestedHell } from '../testFunctions';

import BottomNavComponent from '../../src/components/navigation/BottomNavComponent';

import MainView from '../../src/components/MainView';

let wrapper;

const component = () => {
    return <MainView/>
}

describe('Testing MainView', () => {
    beforeEach( () => {
        wrapper = mount( nestedHell(testState, component) );
    });

    it('renders status bar', () => {
        expect(wrapper.find(StatusBar).length).toBe(1);
    });

    it('renders BottomNavComponent', () => {
        expect(wrapper.find(BottomNavComponent).length).toBe(1);
    });
});

import React from 'react';
import { mount } from 'enzyme';
import { testState } from '../../../src/shared/constants';
import { nestedHell } from '../../testFunctions';

import BottomNavComponent from '../../../src/components/navigation/BottomNavComponent';


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
import React from 'react';
import { mount } from 'enzyme';
import { testState, testStateNotLoggedIn } from '../../../src/shared/constants';
import { nestedHell } from '../../testFunctions';

import MainNavComponent from '../../../src/components/navigation/MainNavComponent';

let wrapper;
let wrap;

const component = () => {
    return (<MainNavComponent/>);
}

it('MainNavComponent has a tab navigator initialized to some screen', () => {
    wrapper = mount(nestedHell(testState, component));
    wrap = wrapper.findWhere((node) => node.prop('initialRouteName') !== undefined);
    expect(wrapper
        .findWhere((node) => node.prop('name') === wrap.prop('initialRouteName'))
        .length
    ).toBe(1);
});

it('renders conditionally based on whether user is logged in', () => {
    wrapper = mount(nestedHell(testState, component));
    wrap = wrapper.findWhere((node) => 
        node.prop('initialRouteName') !== undefined
    );
    const loggedInName = wrapper
        .findWhere((node) => 
            node.prop('name') === wrap.prop('initialRouteName')
        )
        .prop('name');

    wrapper = mount(nestedHell(testStateNotLoggedIn, component));
    wrap = wrapper.findWhere((node) => 
        node.prop('name') !== undefined
    );
    const notLoggedInName = wrapper.prop('name');
    expect(loggedInName).not.toEqual(notLoggedInName);
});
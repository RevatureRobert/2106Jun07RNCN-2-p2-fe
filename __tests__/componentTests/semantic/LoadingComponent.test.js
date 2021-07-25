import React from 'react';
import  { Image } from 'react-native';
import { mount } from 'enzyme';

import LoadingComponent from '../../../src/components/semantic/LoadingComponent';

preloader = require('../../../src/assets/preloader.gif');

it('renders preloader.gif', () => {
    const wrapper = mount(<LoadingComponent/>);
    expect(
        wrapper.find(Image).someWhere( node => 
            node.props()['source'] === preloader 
        )
    ).toBe(true);
});
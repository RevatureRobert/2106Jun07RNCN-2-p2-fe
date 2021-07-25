import React from 'react';
import { mount } from 'enzyme';

import MainNavComponent from '../../src/components/navigation/MainNavComponent';

import App from '../../src/App';

let wrapper;

describe('Testing MainView', () => {
    beforeEach( () => {
        wrapper = mount(<App/>);
    });

    it('renders MainNavComponent', () => {
        expect(wrapper.find(MainNavComponent).length).toBe(1);
    });
});

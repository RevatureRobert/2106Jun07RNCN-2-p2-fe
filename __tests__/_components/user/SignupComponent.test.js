import React from 'react';
import { mount } from 'enzyme';
import { testState } from '../../../src/shared/constants';
import { nestedHell } from '../../testFunctions';

import SignupComponent from '../../../src/components/user/SignupComponent';

let wrapper;

const component = () => {
        return <SignupComponent/>
}

/*
TO-DO: does not render LoadingComponent if state.loading is true
TO-DO: renders LoadingComponent if state.loading is true
To-DO: does not render {any node tested below} if state.loading is false
*/

describe('Testing SignupComponent', () => {
    beforeEach( () => {
        wrapper = mount( nestedHell(testState, component) );
    });

    it('displays text box to register username that listens for changeText', () => {
        expect(
            wrapper.findWhere( node => 
                node.prop('onChangeText') !== undefined
            )
            .findWhere( node => 
                node.prop('placeholder').toLowerCase() === 'username'
            ).length
        ).toBeGreaterThan(0);
    });

    it('displays text box to register password that listens for changeText', () => {
        expect(
            wrapper.findWhere( node => 
                node.prop('onChangeText') !== undefined
            )
            .findWhere( node => 
                node.prop('placeholder').toLowerCase() === 'password'
            ).length
        ).toBeGreaterThan(0);
    });

    it('displays text box to register email that listens for changeText', () => {
        expect(
            wrapper.findWhere( node => 
                node.prop('onChangeText') !== undefined
            )
            .findWhere( node => 
                node.prop('placeholder').toLowerCase() === 'email'
            ).length
        ).toBeGreaterThan(0);
    });

    it('displays text that links to login page that listens for press', () => {
        expect(
            wrapper.findWhere( node => 
                node.prop('onPress') !== undefined
            )
            .findWhere( node => 
                node.text().toLowerCase().includes('log in') ||
                node.text().toLowerCase().includes('login')
            ).length
        ).toBeGreaterThan(0);
    });

    it('displays sign up button that listens for press', () => {
        expect(
            wrapper.findWhere( node => 
                node.prop('onPress') !== undefined
            )
            .findWhere( node => 
                node.text().toLowerCase().includes('sign up') ||
                node.text().toLowerCase().includes('signup')
            ).length
        ).toBeGreaterThan(0);
    });
});

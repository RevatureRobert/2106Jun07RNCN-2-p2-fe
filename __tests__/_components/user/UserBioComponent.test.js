import React from 'react';
import { TextInput } from 'react-native';
import { mount } from 'enzyme';
import { testState } from '../../../src/shared/constants';
import { nestedHell } from '../../testFunctions';

import { UserBioComponent } from '../../../src/components/user/UserBioComponent';

let wrapper;

const component = () => {
    return <UserBioComponent/>
}

/*
TO-DO: test the counter
*/

describe('Testing UserBioComponent', () => {
    beforeEach( () => {
        wrapper = mount( nestedHell(testState, component) );
    });

    it('renders text box that listens for changeText', () => {
        expect(
            wrapper.findWhere( node =>
                node.prop('onChangeText') !== undefined
            )
            .find(TextInput)
            .length
        ).toBeGreaterThan(0);
    });

    it('renders button to update bio that listens for press', () => {
        expect(
            wrapper.findWhere( node =>
                node.prop('onPress') !== undefined
            )
            .findWhere( node => 
                node.text().toLowerCase().includes('update')
            )
            .length
        ).toBeGreaterThan(0);
    });
});

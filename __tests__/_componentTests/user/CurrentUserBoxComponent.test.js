import React from 'react';
import  { Image } from 'react-native';
import { mount } from 'enzyme';
import { testState } from '../../../src/shared/constants';
import { nestedHell } from '../../testFunctions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CurrentUserBoxComponent from '../../../src/components/user/CurrentUserBoxComponent';

let wrapper;

const loggedInUser = testState.auth.user;
const someOtherUser = 'someotheruser';

const component = (username) => {
    return () => { 
        return (
            <CurrentUserBoxComponent
                username={username}
            />
        )
    };
}

describe('If user is viewing their profile', () => {
    beforeEach( () => {
        wrapper = mount( nestedHell(testState, component(loggedInUser.username)) );
    });

    it('displays pfp', () => {
        expect(wrapper.find(Image).length).toBeGreaterThan(0);
    });

    it('displays username', () => {
        expect(
            wrapper.findWhere(node => 
                node.text().includes(loggedInUser.username)
            ).length
        ).toBeGreaterThan(0);
    });

    it('displays bio', () => {
        expect(
            wrapper.findWhere(node => 
                node.prop('testID') === 'bio'
            ).length
        ).toBeGreaterThan(0);
    });

    it('displays logout button that listens for press', () => {
        expect(
            wrapper.findWhere( node => 
                node.prop('onPress') !== undefined
            )
            .someWhere(node =>
                node.text().toLowerCase().includes('log out') ||
                node.text().toLowerCase().includes('logout')
            )
        ).toBe(true)
    });
});

describe('If user is viewing some other user\'s profile', () => {
    beforeEach( () => {
        wrapper = mount( nestedHell(testState, component(someOtherUser)) );
    });

    it('displays pfp', () => {
        expect(wrapper.find(Image).length).toBeGreaterThan(0);
    });

    it('displays username', () => {
        expect(
            wrapper.findWhere(node => 
                node.text().includes(someOtherUser)
            ).length
        ).toBeGreaterThan(0);
    });
    
    it('displays user\'s bio', () => {
        const expectedValue = 'bio'
        expect(
            wrapper.findWhere(node => 
                node.prop('testID') === expectedValue
            ).length
        ).toBeGreaterThan(0);
    });

    it('does not render logout button', () => {
        expect(
            wrapper.findWhere( node => 
                node.prop('onPress') !== undefined
            )
            .someWhere(node =>
                node.text().toLowerCase().includes('log out') ||
                node.text().toLowerCase().includes('logout')
            )
        ).toBe(false)
    });
});
import React from 'react';
import  { TouchableOpacity } from 'react-native';
import { mount } from 'enzyme';
import { testState } from '../../../src/shared/constants';
import { nestedHell } from '../../testFunctions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HeaderComponent from '../../../src/components/semantic/HeaderComponent';

chirperLogo = require('../../../src/assets/chirperLogo.png');

let wrapper;

const newChirp = {
    userImg: testState.auth.user.picture,
    username: testState.chirps.chirps[0].username,
    body: testState.chirps.chirps[0].body,
    timestamp: testState.chirps.chirps[0].timestamp,
    media: testState.chirps.chirps[0].media,
};

const component = (currentView = 'default') => {
    return () => { return (
        <HeaderComponent
            currentView={currentView}
            newChirp={newChirp}
        />
    )};
}

describe('Testing default Header', () => {
    beforeEach( () => {
        wrapper = mount( nestedHell(testState, component()) );
    });

    it('displays pfp', () => {
        expect(
            wrapper.findWhere( node =>
                node.prop('testID') === 'pfp'
            )
        .length).toBe(2);
    });

    it('displays chirper logo', () => {
        expect(wrapper.findWhere( node =>
            node.prop('source') === chirperLogo
        ).length).toBeGreaterThan(0);
    });

    it('displays username as text', () => {
        expect(wrapper.findWhere( node =>
            node.text().includes(newChirp.username)
        ).length).toBeGreaterThan(0);
    });
});

describe('Testing addChirp Header', () => {
    beforeEach( () => {
        wrapper = mount( nestedHell(testState, component('addChirp')) );
    });

    it('displays back button that listens for press', () => {
        expect(
            wrapper.findWhere( node => 
                node.prop('onPress') !== undefined
            )
            .find(MaterialCommunityIcons)
            .length
        ).toBe(1);
    });
});

describe('Testing singleChirp Header', () => {
    beforeEach( () => {
        wrapper = mount( nestedHell(testState, component('singleChirp')) );
    });

        it('displays back button that listens for press', () => {
            expect(
                wrapper.findWhere( node => 
                    node.prop('onPress') !== undefined
                )
                .find(MaterialCommunityIcons)
                .length
            ).toBe(1);
        });
});

describe('Testing settings Header', () => {
    beforeEach( () => {
        wrapper = mount( nestedHell(testState, component('settings')) );
    });

    it('displays back button that listens for press', () => {
        expect(
            wrapper.findWhere( node => 
                node.prop('onPress') !== undefined
            )
            .find(MaterialCommunityIcons)
            .length
        ).toBe(1);
    });

    it('displays text that says \'Settings\'', () => {
        expect(wrapper.findWhere( node =>
            node.text() === 'Settings'
        ).length).toBeGreaterThan(0);
    });
});
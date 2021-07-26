import React from 'react';
import  { Image, Pressable } from 'react-native';
import { mount } from 'enzyme'
import RepliesItemComponent from '../../../src/components/replies/RepliesItemComponent'; 
import { testState } from '../../../src/shared/constants';
import { nestedHell } from '../../testFunctions';
import { formatTimestamp } from '../../../src/shared/functions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ModalComponent from '../../../src/components/semantic/ModalComponent';

let wrapper;

const component = () => {
    return (
        <RepliesItemComponent
            userImg={testState.auth.user.picture}
            username={testState.chirps.chirps[0].username}
            body={testState.replies.replies[0].body}
            timestamp={testState.replies.replies.timestamp}
            chirpTimestamp={testState.chirps.chirps[0].timestamp}
            currentUser={testState.auth.user}
        />
    );
}

describe('Testing RepliesItemComponent', () => {
    beforeEach( () => {
        wrapper = mount(nestedHell(testState, component));
    });

    it('renders a ModalComponent', () => {
        expect(wrapper.find(ModalComponent).length).toBeGreaterThan(0)
    });

    it('displays the pfp of the loggedIn user', () => {
        const wrap = wrapper.find({
            style: { width: 40, height: 40, borderRadius: 40 / 2 }
        });
        expect(wrap.length).toBeGreaterThan(0);
    });

    it('pfp is pressable', () => {
        wrap = wrapper
        .findWhere( node => 
            node.prop('onPress') !== undefined
        )
        .find(Image)
        .find({
            style: { width: 40, height: 40, borderRadius: 40 / 2 }
        });
        expect(wrap.length).toBeGreaterThan(0);
    });

    it('displays the username as text', () => {
        expect(
            wrapper.someWhere( node => 
                node.text().includes(testState.chirps.chirps[0].username)
            )
        ).toBe(true);
    });

    it('displays the chirp body as text', () => {
        expect(
                wrapper.someWhere( node => 
                    node.text().includes(testState.chirps.chirps[0].username)
                )
        ).toBe(true);
    });

    it('displays the reply timestamp as text', () => {
        expect(
            wrapper.someWhere( node => 
                node.text().includes(formatTimestamp(new Date(Number(testState.replies.replies.timestamp))))
            )
        ).toBe(true);
    });

    it('displays a pressable icon', () => {
        expect(
            wrapper.find(Pressable).find(MaterialCommunityIcons).length
        ).toBeGreaterThan(0);
    });
});
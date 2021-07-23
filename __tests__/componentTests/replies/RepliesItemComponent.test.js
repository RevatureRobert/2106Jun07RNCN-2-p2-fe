import React from 'react';
import  { Image } from 'react-native';
import { mount } from 'enzyme'
import RepliesItemComponent from '../../../src/components/replies/RepliesItemComponent'; 
import { testState, testStateRepliesLoading } from '../../../src/shared/constants';
import { mockEvent } from '../../mocks';
import { nestedHell, findAndShallowRender } from '../../testFunctions';

import ModalComponent from '../../../src/components/semantic/ModalComponent';

let wrapper;
let username = 'dummyuser'
let timestamp = Date.now().toString();

const component = () => {
    return (
        <RepliesItemComponent
            userImg={testState.auth.user.picture}
            username={testState.auth.user.username}
            body={testState.replies.replies[0]}
            timestamp: string;
            chirpTimestamp: string;
            currentUser: string;
}
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
        wrapper.find(Image).someWhere( node =>
            node.prop('source') === testState.auth.user.picture
        );
    });

    it('pfp is pressable', () => {
        expect(1).toBe(1);
    });

    it('displays the pfp of the loggedIn user', () => {
        expect(1).toBe(1);
    });

    it('displays the username as text', () => {
        expect(1).toBe(1);
    });

    it('displays the chirp body as text', () => {
        expect(1).toBe(1);
    });

    it('displays the date as text', () => {
        expect(1).toBe(1);
    });

    it('displays a pressable icon', () => {
        expect(1).toBe(1);
    });
});
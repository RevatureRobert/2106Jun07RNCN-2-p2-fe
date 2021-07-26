import React from 'react';
import  { Text } from 'react-native';
import { mount } from 'enzyme';
import { testState } from '../../../src/shared/constants';
import { nestedHell } from '../../testFunctions';

import ModalComponent from '../../../src/components/semantic/ModalComponent';

let wrapper;
let wrap;

const isModalVisible = true;
const setModalVisible = () => {/*no-op*/};
const chirpUser = 'theywhochirped'
const chirpTimestamp = Date.now().toString();
const cmtTimestamp = Date.now().toString()

const component = (modalType, currentUser = chirpUser) => {
    return () => { return (
        <ModalComponent
            modalType={modalType}
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
            chirpUser={chirpUser}
            chirpTimestamp={chirpTimestamp}
            cmtTimestamp={cmtTimestamp}
            currentUser={currentUser}
        />
    )};
}

describe('Testing ModalComponent when user can delete chirp/comment', () => {
    beforeEach( () => {
        wrapper = mount( nestedHell(testState, component('chirp')) );
    });

    it('displays a message asking the user if they wish to delete the chirp/comment', () => {
        expect(
            wrapper.findWhere( node => 
                node.prop('onPress') === undefined
            ).find(Text).length
        ).toBeGreaterThan(0);
    });

    it('has two text boxes listening for press that represent delete and cancel options', () => {
        expect(
            wrapper.findWhere( node => 
                node.prop('onPress') !== undefined
            ).find(Text).length
        ).toBeGreaterThan(1);
    });
});

describe('Testing ModalComponent when user cannnot delete chirp/comment', () => {
    beforeEach( () => {
        wrapper = mount( 
            nestedHell(testState, component('comment', 'dummyUser')) 
        );
    });

    it('displays message telling user chirp/comment cannot be deleted', () => {
        wrap = wrapper.findWhere( node => 
            node.prop('onPress') === undefined
        ).find(Text);
        expect(wrap.length).toBeGreaterThan(0);
    });

    it('has a text box that listens for press that allows user to escape modal view', () => {
        expect(
            wrapper.findWhere( node => 
                node.prop('onPress') !== undefined
            ).find(Text).length
        ).toBeGreaterThan(0);
    });
});
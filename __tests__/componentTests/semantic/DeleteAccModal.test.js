import React from 'react';
import  { Text, TouchableOpacity } from 'react-native';
import { mount } from 'enzyme';
import { testState } from '../../../src/shared/constants';
import { nestedHell } from '../../testFunctions';
import Modal from 'react-native-modal';

import DeleteAccModal from '../../../src/components/semantic/DeleteAccModal';

let wrapper;

const isModalVisible = true;
const setModalVisible = () => {/*no-op*/}

const component = () => {
    return (
        <DeleteAccModal
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
        />
    );
}

describe('Testing DeleteAccModal', () => {
    beforeEach( () => {
        wrapper = mount(nestedHell(testState, component));
    });

    it('renders a Modal that listens for onBackdropPress', () => {
        expect(
            wrapper.find(Modal).findWhere(
                node => node.prop('onBackdropPress') !== undefined
            ).length
        ).toBeGreaterThan(1);
    });

    describe('all components must have Modal as ancestor', () => {
        beforeEach( () => {
            wrapper = wrapper.find(Modal);
        })

        it('displays at least 3 messages (i.e., are you sure?, delete, cancel)', () => {
            expect(wrapper.find(Text).length).toBeGreaterThan(2);
        });

        it('two messages listen for press (delete, cancel)', () => {
            expect(
                wrapper.find(TouchableOpacity).findWhere( node => 
                    node.prop('onPress') !== undefined
                ).find(Text).length
            ).toBe(2);
        });
    });
});
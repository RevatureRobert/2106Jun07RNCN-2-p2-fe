import React from 'react';
import  { Text, TouchableOpacity } from 'react-native';
import { mount, shallow } from 'enzyme';
import { testState } from '../../../src/shared/constants';
import { nestedHell } from '../../testFunctions';
import Modal from 'react-native-modal';
import { Auth } from 'aws-amplify';

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
        ).toBeGreaterThan(0);
    });

    describe('all components must have Modal as ancestor', () => {
        beforeEach( () => {
            wrapper = wrapper.find(Modal);
        });

        it('displays at least 3 messages (i.e., are you sure?, delete, cancel)', () => {
            expect(wrapper.find(Text).length).toBeGreaterThan(2);
        });

        it('two messages listen for press (delete, cancel)', () => {
            expect(
                wrapper.find(TouchableOpacity).findWhere( node => 
                    node.prop('onPress') !== undefined
                ).find(Text).length
            ).toBeGreaterThan(1);
        });

        it('the first pressable message can execute its event handler', () => {
            let wrap = wrapper.find(TouchableOpacity);
            wrap = wrap.first();
            
            const event = 'onPress';
            const eventHandler = jest.spyOn(wrap.props(), event);
            wrap.props()[event]();
            expect(eventHandler).toHaveBeenCalled();
        });

        it('the second pressable message can execute its event handler', async () => {
            let wrap = wrapper.find(TouchableOpacity);
            wrap = wrap.last();

            jest.spyOn(Auth, 'currentAuthenticatedUser').mockImplementation( () => {
                return Promise.resolve({ 
                    deleteUser: (callback) => {
                        callback(undefined, 'user delete successfully mocked');
                        callback('user delete error successfully mocked', undefined);
                    }
                });
            })
            
            const event = 'onPress';
            const eventHandler = jest.spyOn(wrap.props(), event);
            await wrap.props()[event]();
            expect(eventHandler).toHaveBeenCalled();
        });

        it('the backdrop, when pressed, makes the modal component invisible', () => {
            wrap = shallow(wrapper.getElement());
            const event = 'onBackdropPress';
            wrap.props()[event]();
            wrap.update();
            expect(wrap.props().isVisible).toBeFalsy();
        });
    });
});
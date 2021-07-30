import React from 'react';
import  { Text, TouchableOpacity } from 'react-native';
import { mount } from 'enzyme';
import { testState } from '../../../src/shared/constants';
import { nestedHell } from '../../testFunctions';
import Modal from 'react-native-modal';

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

describe('Modal component backdrop', () => {

    beforeEach( () => {
        wrapper = mount( nestedHell(testState, component()) );
    });

    it('backdrop can be pressed and has functional event handler', async () => {
        wrap = wrapper.find(Modal);
        const event = 'onBackdropPress';
        const mockEventHandler = jest.spyOn(wrap.props(), event);
        await wrap.props()[event]();
        expect(mockEventHandler).toHaveBeenCalled();
    });
});

describe('Testing ModalComponent when user can delete chirp', () => {
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

    it('the first text box has a functional press event handler', async () => {        
        wrap = wrapper.find(TouchableOpacity).first();
        const event = 'onPress';
        const mockEventHandler = jest.spyOn(wrap.props(), event);
        await wrap.props()[event]();
        expect(mockEventHandler).toHaveBeenCalled();
    });

    it('the second box has a functional press event handler', () => {        
        wrap = wrapper.find(TouchableOpacity).last();
        const event = 'onPress';
        const mockEventHandler = jest.spyOn(wrap.props(), event);

        jest.mock('react-native-toast-notifications', () => ({
            useToast: () => {
                return ({ 
                    show: (del) => {
                        console.log(
                            'Mocked useToast.show() called with: \n', 
                            del
                        );
                    } 
                });
            }
        }));

        wrap.props()[event]();
        expect(mockEventHandler).toHaveBeenCalled();
    });
});

describe('Testing ModalComponent when user can delete comment', () => {
    beforeEach( () => {
        wrapper = mount( nestedHell(testState, component('comment')) );
    });

    it('displays a message asking the user if they wish to delete the chirp/comment', () => {
        const length = wrapper.findWhere( node => 
            node.prop('onPress') === undefined
        ).find(Text).length
        expect(length).toBeGreaterThan(0);
    });

    it('has two text boxes listening for press that represent delete and cancel options', () => {
        let numOfNodes = wrapper.findWhere( node => 
            node.prop('onPress') !== undefined
        ).find(Text).length;
        expect(numOfNodes).toBeGreaterThan(1);
    });

    it('the first text box has a functional press event handler', () => {        
        wrap = wrapper.find(TouchableOpacity).first();
        const event = 'onPress';
        const mockEventHandler = jest.spyOn(wrap.props(), event);
        wrap.props()[event]();
        expect(mockEventHandler).toHaveBeenCalled();
    });

    it('the second box has a functional press event handler', async () => {        
        wrap = wrapper.find(TouchableOpacity).last();
        const event = 'onPress';
        const mockEventHandler = jest.spyOn(wrap.props(), event);
        wrap.props()[event]();
        expect(mockEventHandler).toHaveBeenCalled();
    });
});

describe('Testing ModalComponent when user cannnot delete chirp', () => {
    beforeEach( () => {
        wrapper = mount( 
            nestedHell(testState, component('chirp', 'dummyUser')) 
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

    it('the first text box has a functional press event handler', () => {        
        let myWrap = wrapper.find(TouchableOpacity).first();
        const event = 'onPress';
        const mockEventHandler = jest.spyOn(myWrap.props(), event);
        myWrap.props()[event]();
        expect(mockEventHandler).toHaveBeenCalled();
    });

    it('the second box has a functional press event handler', () => {        
        let thisWrap = wrapper.find(TouchableOpacity).last();
        const event = 'onPress';
        const mockEventHandler = jest.spyOn(thisWrap.props(), event);
        thisWrap.props()[event]();
        expect(mockEventHandler).toHaveBeenCalled();
    });
});

describe('Testing ModalComponent when user cannnot delete comment', () => {
    beforeEach( () => {
        wrapper = mount( 
            nestedHell(testState, component('comment', 'dummyUser')) 
        );
    });

    it('displays message telling user chirp/comment cannot be deleted', () => {
        let thisWrap = wrapper.findWhere( node => 
            node.prop('onPress') === undefined
        ).find(Text);
        expect(thisWrap.length).toBeGreaterThan(0);
    });

    it('has a text box that listens for press that allows user to escape modal view', () => {
        let lengthOfNode = wrapper.findWhere( node => 
            node.prop('onPress') !== undefined
        ).find(Text).length;
        expect(lengthOfNode).toBeGreaterThan(0);
    });

    it('the first text box has a functional press event handler', () => {        
        let thisIsAWrap = wrapper.find(TouchableOpacity).first();
        const event = 'onPress';
        const mockEventHandler = jest.spyOn(thisIsAWrap.props(), event);
        thisIsAWrap.props()[event]();
        expect(mockEventHandler).toHaveBeenCalled();
    });

    it('the second box has a functional press event handler', () => {        
        let thisIsTheWrap = wrapper.find(TouchableOpacity).last();
        const event = 'onPress';
        const mockEventHandler = jest.spyOn(thisIsTheWrap.props(), event);
        thisIsTheWrap.props()[event]();
        expect(mockEventHandler).toHaveBeenCalled();
    });
});
import React from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { mount } from 'enzyme';
import { testState } from '../../../src/shared/constants';
import { nestedHell } from '../../testFunctions';
import { Auth, Storage } from 'aws-amplify';

import { UserBioComponent } from '../../../src/components/user/UserBioComponent';

let wrapper;

const component = (bioTextInit = '') => {
    return ( () => {
        return <UserBioComponent bioTextInit={bioTextInit}/>
    });
}

describe('Testing UserBioComponent', () => {
    beforeEach( () => {
        wrapper = mount( nestedHell(testState, component()) );
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

    it('update bio button has functional press event handler', async () => {
        let wrap = wrapper.find(TouchableOpacity);
        const event = 'onPress';
        jest.spyOn(Auth, 'currentCredentials').mockImplementation( () => {
            /*no-op*/
        });
        jest.spyOn(Storage, 'put').mockImplementation( () => {
            return Promise.resolve({
                key: "key",
            });
        });
        jest.spyOn(global, 'fetch').mockImplementation( () => {
            const func = () => { return Promise.resolve('string') };
            return Promise.resolve( {text: func} );
        });
        jest.spyOn(Storage, 'get').mockResolvedValue( {key: "key"} );
        const mockEventHandler = jest.spyOn(wrap.props(), event);
        await wrap.prop(event)();
        expect(mockEventHandler).toHaveBeenCalled();
    });

    it('text box has functional changeText event handler', async () => {
        jest.spyOn(Auth, 'currentCredentials').mockImplementation( () => {
            /*no-op*/
        });
        jest.spyOn(Storage, 'put').mockImplementation( () => {
            return Promise.resolve({
                key: "someKey",
            });
        });
        jest.spyOn(global, 'fetch').mockImplementation( () => {
            const func = () => { return Promise.resolve('string') };
            return Promise.resolve( {text: func} );
        });
        jest.spyOn(Storage, 'get').mockImplementation( () => {
            return Promise.resolve({
                key: "aKey",
            });
        });
        let wrap = wrapper.find(TextInput);
        const event = 'onChangeText';
        const mockEventHandler = jest.spyOn(wrap.props(), event);
        await wrap.prop(event)('f'); //type the letter f in the text box
        expect(mockEventHandler).toHaveBeenCalled();
    });
});

it('Users cannot post bio if it is too long', () => {
    let str = '';
    for(let i=0; i<200; i++){
        str += 'a';
    }
    wrapper = mount( nestedHell(testState, component(str)) );
    const wrap = wrapper.find(TouchableOpacity);
    expect(wrap.prop('disabled')).toBeTruthy();
});

it('Users cannot post bio if it is an empty string', () => {
    wrapper = mount( nestedHell(testState, component('')) );
    const wrap = wrapper.find(TouchableOpacity);
    expect(wrap.prop('disabled')).toBeTruthy();
});

it('Users can post if bio is of the proper length', () => {
    const str = 'string of acceptable length'
    wrapper = mount( nestedHell(testState, component(str)) );
    const wrap = wrapper.find(TouchableOpacity);
    expect(wrap.prop('disabled')).toBeFalsy();
});
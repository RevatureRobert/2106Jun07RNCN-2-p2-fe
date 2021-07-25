import React from 'react';
import  { Text, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { mount } from 'enzyme';
import { testState } from '../../../src/shared/constants';
import { nestedHell, findAndShallowRender } from '../../testFunctions';
import { mockEvent } from '../../mocks';

import AddChirpView from '../../../src/components/addchirp/AddChirpView';
import HeaderComponent from '../../../src/components/semantic/HeaderComponent';

let wrapper;

const component = () => {
    return (<AddChirpView/>);
}

describe('Testing UserChirpsComponent when chirps are loading', () => {
    beforeEach( () => {
        wrapper = mount(nestedHell(testState, component));
    });

    it('renders HeaderComponent safely', () => {
        const wrap = wrapper
            .find(SafeAreaView)
            .find(KeyboardAvoidingView)
            .find(HeaderComponent);
        expect(wrap.length).toBeGreaterThan(0);
    });

    it('shows pfp of loggedin user', () => {
        const wrap = wrapper
            .find( { source: {uri: testState.auth.user.picture} } )
            .last();
        expect(wrap.length).toBeGreaterThan(0);
    })

    it('renders text box that responds to input', () => {
        const wrap = findAndShallowRender(wrapper, TextInput);
        if( wrap.props().hasOwnProperty('onChangeText') ){
            wrap.setProps( {onChangeText: mockEvent} );
            wrap.simulate('changeText');
        }
        expect(mockEvent).toHaveBeenCalled();
    });

    it('Displays counter correctly', () => {
        const wrap = wrapper.find(Text);        
        const displaysCounterCorrectly = wrap.someWhere( w => 
            w.text() === '0/281'
        );
        expect(displaysCounterCorrectly).toBe(true);
    });
});
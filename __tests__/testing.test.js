import React from 'react';
import { mount, shallow } from 'enzyme'
import { alert } from '../src/shared/functions';
import { View, Text } from 'react-native';

describe('Experimenting with Ezynme in ReactNative', () => {
    
    let wrapper

    beforeEach( () => {
        wrapper = mount((
            <>
                <Text testID='fuck-you'>fuck you</Text>
                <Text testID='fuck-you-too'>fuck you too</Text>
            </>
        ));
        alert('wrapper looks like: \n', wrapper.debug());
    });

    it('it should be defined', () => {
        expect(wrapper).toBeDefined();
    });

    /*
    bizarrely, find() tends to return duplicates. See following for similar 
    issue: https://github.com/enzymejs/enzyme/issues/1253. So, to remove the 
    duplicate find, we just take the last() one. first() also works
    */
    it('should find the text by testID', () => {
        const thing = wrapper.find( { testID: 'fuck-you' } ).last();
        alert('thing.debug() looks like: \n', thing.debug());
        alert('thing.text() looks like: ', thing.text());
        expect(thing.text()).toBe('fuck you');
    });

    it('should find the text by testID', () => {
        const thing = wrapper.find( { testID: 'fuck-you-too' } ).last();
        alert('thing.debug() looks like: \n', thing.debug());
        alert('thing.text() looks like: ', thing.text());
        expect(thing.text()).toBe('fuck you too');
    });

});
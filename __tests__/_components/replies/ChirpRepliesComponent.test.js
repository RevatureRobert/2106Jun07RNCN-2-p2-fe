import React from 'react';
import  { FlatList } from 'react-native';
import { mount } from 'enzyme'
import ChirpRepliesComponent from '../../../src/components/replies/ChirpRepliesComponent'; 
import { testState, testStateRepliesLoading } from '../../../src/shared/constants';
import { mockEvent } from '../../mocks';
import { nestedHell, findAndShallowRender } from '../../testFunctions';

import LoadingComponent from '../../../src/components/semantic/LoadingComponent';

let wrapper;
let username = 'dummyuser'
let timestamp = Date.now().toString();

const component = () => {
    return (
        <ChirpRepliesComponent 
            username = {username}
            timestamp = {timestamp}
        />
    );
}

describe('Testing ChirpRepliesComponent when replies are loading', () => {
    beforeEach( () => {
        wrapper = mount(nestedHell(testStateRepliesLoading, component));
    });

    it('renders a loading screen', () => {
        const wrap = wrapper.find(LoadingComponent);
        expect(wrap.length).toBeGreaterThan(0);
    });

    it('does not render FlatList', () => {
        const wrap = wrapper.find(FlatList);
        expect(wrap.length).toBe(0);
    });

});

describe('Testing ChirpRepliesComponent when replies have loaded', () => {
    beforeEach( () => {
        wrapper = mount(nestedHell(testState, component));
    });

    it('does not render loading screen', () => {
        const wrap = wrapper.find(LoadingComponent);
        expect(wrap.length).toBe(0);
    });

    it('renders a FlatList', () => {
        const wrap = wrapper.find(FlatList);
        expect(wrap.length).toBeGreaterThan(0);
    });

    it('FlatList contains replies from store', () => {
        const wrap = wrapper.find(FlatList);

        const arrOfTestChirps = testState.replies.replies;
        const byTimestamp = (a, b) => 
            Number(a.timestamp) < Number(b.timestamp) ? 1 : -1
        
        const expectedArr = [...arrOfTestChirps].sort(byTimestamp);
        expect(wrap.props().data).toStrictEqual(expectedArr);
    });

    it('Flatlist responds to onRefresh event', () => {
        const wrap = findAndShallowRender(wrapper, FlatList);
        if( wrap.props().hasOwnProperty('onRefresh')){
            wrap.setProps( {onRefresh: mockEvent} );
            wrap.simulate('refresh');
        }
        expect(mockEvent).toHaveBeenCalled();
    });

});
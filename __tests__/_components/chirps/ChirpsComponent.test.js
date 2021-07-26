import React from 'react';
import  { FlatList } from 'react-native';
import { mount } from 'enzyme'
import { testState, testStateChirpsLoading } from '../../../src/shared/constants';
import { nestedHell, findAndShallowRender } from '../../testFunctions';
import ChirpsComponent from '../../../src/components/chirps/ChirpsComponent';
import LoadingComponent from '../../../src/components/semantic/LoadingComponent';
import { mockEvent } from '../../mocks'
import AddChirpBtnComponent from '../../../src/components/addchirp/AddChirpBtnComponent';

let wrapper;

const component = () => {
    return <ChirpsComponent/>
};

describe('If chirps are loading', () => {
    beforeEach( () => {
        wrapper = mount(nestedHell(testStateChirpsLoading, component));
    });

    it('does not render FlatList', () => {
        const wrap = wrapper.find(FlatList);
        expect(wrap.length).toBe(0);
    });

    it('renders LoadingComponent', () => {
        const wrap = wrapper.find(LoadingComponent);
        expect(wrap.length).toBe(1);
    });
});

describe('If chirps have loaded', () => {
    beforeEach( () => {
        wrapper = mount(nestedHell(testState, component));
    });

    it('renders FlatList', () => {
        const wrap = wrapper.find(FlatList);
        expect(wrap.length).toBeGreaterThan(0);
    });

    it('does not render LoadingComponent', () => {
        const wrap = wrapper.find(LoadingComponent);
        expect(wrap.length).toBe(0);
    })

    it('renders AddChirpBtnComponent', () => {
        const wrap = wrapper.find(AddChirpBtnComponent);
        expect(wrap.length).toBeGreaterThan(0);
    })

    it('FlatList contains chirps from store', () => {
        const wrap = wrapper.find(FlatList);

        const arrOfTestChirps = testState.chirps.chirps;
        const byTimestamp = (a, b) => 
            Number(a.timestamp) < Number(b.timestamp) ? 1 : -1
        
        const expectedArr = arrOfTestChirps.sort(byTimestamp);
        expect(wrap.props().data).toBe(expectedArr);
    });

    it('Flatlist responds to onRefresh event', () => {
        const wrap = findAndShallowRender(wrapper, FlatList);
        wrap.setProps( {onRefresh: mockEvent} );
        wrap.simulate('refresh');
        expect(mockEvent).toHaveBeenCalled();
    });
});
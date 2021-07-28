import React from 'react';
import { FlatList } from 'react-native';
import { mount } from 'enzyme';
import { testState, testStateChirpsLoading } from '../../../src/shared/constants';
import { nestedHell } from '../../testFunctions';

import HeaderComponent from '../../../src/components/semantic/HeaderComponent';
import LoadingComponent from '../../../src/components/semantic/LoadingComponent';

import SearchView from '../../../src/components/search/SearchView';

const component = (testValue = '') => {
    return (
        () => {return (<SearchView testValue={testValue} />);}
    )
        
}

let wrapper;

describe('If chirps are loading', () => {
    beforeEach( () => {
        wrapper = mount(nestedHell(testStateChirpsLoading, component()));
    });

    it('does not render FlatList', () => {
        const wrap = wrapper.find(FlatList);
        expect(wrap.length).toBe(0);
    });

    it('renders HeaderComponent', () => {
        const wrap = wrapper.find(HeaderComponent);
        expect(wrap.length).toBe(1);
    })
;
    it('renders LoadingComponent', () => {
        const wrap = wrapper.find(LoadingComponent);
        expect(wrap.length).toBe(1);
    });
});

describe('If chirps have loaded', () => {
    let searchValue;
    beforeEach( () => {
        searchValue = 'dummyuser'
        wrapper = mount(nestedHell(testState, component(searchValue)));
    });

    it('renders HeaderComponent', () => {
        const wrap = wrapper.find(HeaderComponent);
        expect(wrap.length).toBeGreaterThan(0);
    })

    it('renders FlatList', () => {
        const wrap = wrapper.find(FlatList);
        expect(wrap.length).toBeGreaterThan(0);
    });

    it('does not render LoadingComponent', () => {
        const wrap = wrapper.find(LoadingComponent);
        expect(wrap.length).toBeLessThan(1);
    })

    it('FlatList contains chirps from query', () => {
        const wrap = wrapper.find(FlatList);

        const arrOfTestChirps = testState.chirps.chirps;

        const byTimestamp = (a, b) => 
            Number(a.timestamp) < Number(b.timestamp) ? 1 : -1
        
        const byUser = (user) =>
              user.body
                .toLocaleLowerCase()
                .includes(searchValue.toLocaleLowerCase()) ||
              user.username
                .toLowerCase()
                .includes(searchValue.toLocaleLowerCase())

        const expectedArr = [...arrOfTestChirps].sort(byTimestamp).filter(byUser);
        expect(wrap.props().data).toStrictEqual(expectedArr);
    });

    it('Flatlist responds to onRefresh event', () => {
        let wrap = wrapper.find(FlatList);
        if (wrap.length > 1) {
            wrap = wrap.last();
        }

        const eventHandler = jest.spyOn(wrap.props(), 'onRefresh');
        wrap.props().onRefresh();
        expect(eventHandler).toHaveBeenCalled();
    });
});
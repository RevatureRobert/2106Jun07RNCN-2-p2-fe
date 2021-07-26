import React from 'react';
import  { SafeAreaView, View, FlatList } from 'react-native';
import { mount } from 'enzyme';
import { testState, testStateChirpsLoading } from '../../../src/shared/constants';
import { nestedHell, findAndShallowRender } from '../../testFunctions';
import { mockEvent } from '../../mocks';

import UserChirpsComponent from '../../../src/components/chirps/UserChirpsComponent';
import HeaderComponent from '../../../src/components/semantic/HeaderComponent';
import AddChirpBtnComponent from '../../../src/components/addchirp/AddChirpBtnComponent';
import LoadingComponent from '../../../src/components/semantic/LoadingComponent';
import CurrentUserBoxComponent from '../../../src/components/user/CurrentUserBoxComponent';

let wrapper;

const route = { 
    params: {
        userImg: '',
        username: 'dummyUser',
        body: 'chirpBody',
        comments: [],
        likes: [''],
        media: '',
        timestamp: Date.now().toString(),
    },
};
const component = () => {
    return <UserChirpsComponent route={route}/>
};

describe('Testing UserChirpsComponent when chirps are loading', () => {
    beforeEach( () => {
        wrapper = mount(nestedHell(testStateChirpsLoading, component));
    });

    it('renders HeaderComponent in View', () => {
        const wrap = wrapper.find(View).find(HeaderComponent);
        expect(wrap.length).toBeGreaterThan(0);
    });

    it('renders View to make a colored box', () => {
        const wrap = wrapper.findWhere(node => node.prop('testID') === 'box')
        expect(wrap.length).toBeGreaterThan(0);
    });

    it('renders CurrentUserBoxComponent', () => {
        const wrap = wrapper = wrapper.find(CurrentUserBoxComponent);
        expect(wrap.length).toBeGreaterThan(0);
    });

    it('renders LoadingComponent in View', () => {
        const wrap = wrapper.find(View).find(LoadingComponent)
        expect(wrap.length).toBeGreaterThan(0);
    });

    it('does not render FlatList', () => {
        const wrap = wrapper = wrapper.find(FlatList);
        expect(wrap.length).toBe(0);
    });
});

describe('Testing UserChirpsComponent after chirps have loaded', () => {
    beforeEach( () => {
        wrapper = mount(nestedHell(testState, component)).find(SafeAreaView);
    });

    it('renders HeaderComponent in SafeAreaView', () => {
        const wrap = wrapper.find(HeaderComponent)
        expect(wrap.length).toBeGreaterThan(0);
    });

    it('renders View as colored box in SafeAreaView', () => {
        const wrap = wrapper.findWhere(node => node.prop('testID') === 'box')
        expect(wrap.length).toBeGreaterThan(0);
    });

    it('renders AddChirpBtnComponent in SafeAreaView', () => {
        const wrap = wrapper.find(AddChirpBtnComponent)
        expect(wrap.length).toBeGreaterThan(0);
    });

    it('renders FlatList in SafeAreaView', () => {
        const wrap = wrapper.find(FlatList)
        expect(wrap.length).toBeGreaterThan(0);
    });

    it('does not render LoadingComponent', () => {
        const wrap = wrapper = wrapper.find(LoadingComponent);
        expect(wrap.length).toBe(0);
    });

    it('FlatList contains chirps from store', () => {
        const wrap = wrapper.find(FlatList);

        const sortAndFilter = (arr) => {
            const byTimestamp = (a, b) => 
                Number(a.timestamp) < Number(b.timestamp) ? 1 : -1
            const byUser = (user) => 
                user.username === route.params.username
            return arr.sort(byTimestamp).filter(byUser);
        }

        const arrOfTestChirps = testState.chirps.chirps;
        expect(wrap.props().data).toStrictEqual(sortAndFilter(arrOfTestChirps));
    });

    it('Flatlist responds to onRefresh event', () => {
        const wrap = findAndShallowRender(wrapper, FlatList);
        wrap.setProps( {onRefresh: mockEvent} );
        wrap.simulate('refresh');
        expect(mockEvent).toHaveBeenCalled();
    });
});
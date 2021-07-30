import React from 'react';
import  { SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { mount } from 'enzyme';
import { testState } from '../../../src/shared/constants';
import { nestedHell } from '../../testFunctions';

import SingleChirpView from '../../../src/components/chirps/SingleChirpView';
import PostReplyComponent from '../../../src/components/replies/PostReplyComponent';
import ChirpRepliesComponent from '../../../src/components/replies/ChirpRepliesComponent';
import HeaderComponent from '../../../src/components/semantic/HeaderComponent';

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
        likeState: {
            count: 1,
            isLiked: false,
            icon: 'heart-outline',
            color: 'blue',
        },
    },
};
const component = () => {
    return <SingleChirpView route={route}/>
};

describe('Testing SingleChirpView', () => {
    beforeEach( () => {
        wrapper = mount(nestedHell(testState, component));
    });

    it('renders a SafeAreaView', () => {
        const wrap = wrapper.find(SafeAreaView);
        expect(wrap.length).toBeGreaterThan(0);
    });

    it('renders a HeaderComponent in SafeAreaView', () => {
        const wrap = wrapper.find(SafeAreaView).find(HeaderComponent);
        expect(wrap.length).toBeGreaterThan(0);
    });

    it('renders a ChirpRepliesComponent in SafeAreaView', () => {
        const wrap = wrapper.find(SafeAreaView).find(ChirpRepliesComponent);
        expect(wrap.length).toBeGreaterThan(0);
    });

    it('renders a PostReplyComponent in KeyboardAvoidingView in SafeAreaView', () => {
        const wrap = wrapper
            .find(SafeAreaView)
            .find(KeyboardAvoidingView)
            .find(PostReplyComponent);
        expect(wrap.length).toBeGreaterThan(0);
    });
});
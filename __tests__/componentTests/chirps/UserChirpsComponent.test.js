import React from 'react';
import  { SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { mount } from 'enzyme';
import { testState } from '../../../src/shared/constants';
import { nestedHell } from '../../testFunctions';

import UserChirpsComponent from '../../../src/components/chirps/UserChirpsComponent';
import ChirpItemComponent from '../../../src/components/chirps/ChirpItemComponent';
import PostReplyComponent from '../../../src/components/replies/PostReplyComponent';
import ChirpRepliesComponent from '../../../src/components/replies/ChirpRepliesComponent';
import HeaderComponent from '../../../src/components/semantic/HeaderComponent';

let wrapper;

const component = () => {
    return <UserChirpsComponent/>
};

describe('Testing UserChirpsComponent', () => {
    beforeEach( () => {
        wrapper = mount(nestedHell(testState, component));
    });

    it('renders a component', () => {
        expect(wrapper).toBeDefined();
    });
});
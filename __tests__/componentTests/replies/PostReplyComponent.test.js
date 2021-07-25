import React from 'react';
import  { FlatList } from 'react-native';
import { mount } from 'enzyme'
import PostReplyComponent from '../../../src/components/replies/PostReplyComponent'; 
import { testState, testStateRepliesLoading } from '../../../src/shared/constants';
import { mockEvent } from '../../mocks';
import { nestedHell, findAndShallowRender } from '../../testFunctions';

import LoadingComponent from '../../../src/components/semantic/LoadingComponent';

let wrapper;
let username = 'dummyuser'
let timestamp = Date.now().toString();

const component = () => {
    return (
        <PostReplyComponent 
            username = {username}
            timestamp = {timestamp}
        />
    );
}

describe('Testing PostReplyComponent', () => {
    beforeEach( () => {
        wrapper = mount(nestedHell(testState, component));
    });

    it('displays a text input box that listens for textChange', () => {
        wrap = wrapper.findWhere( node => 
            node.prop('onChangeText') !== undefined
        );
        const wrap2 = shallow(wrap.at(0).getElement());
        wrap2.setProps({onChangeText: mockEvent});
        wrap2.simulate('changeText');
        expect(mockEvent).toHaveBeenCalled();
    });

    it('renders button with the word \'post\' that listens for press', () => {
        wrap = wrapper.findWhere( node => 
            node.prop('onPress') !== undefined
        ).findWhere( node =>
            node.children().someWhere( n => n.text().includes('Post'))
        );
        const wrap2 = shallow(wrap.at(0).getElement());
        wrap2.setProps({onPress: mockEvent});
        wrap2.simulate('press');
        expect(mockEvent).toHaveBeenCalled();
    });

    it('renders a counter based on component state', () => {
        expect( wrapper
            .someWhere( node =>
                node.text().includes('0')
            ) 
        ).toBe(true);
    });
});
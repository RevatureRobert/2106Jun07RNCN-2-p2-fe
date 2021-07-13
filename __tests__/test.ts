import configureStore from 'redux-mock-store';
import { shallow, mount } from './test-setup';
import React from 'react';
import { Provider } from 'react-redux';
import { View, StyleSheet, Platform } from 'react-native';

describe('>>>H O M E --- REACT-REDUX (Mount + wrapping in <Provider>)',()=>{
    const mockStore = configureStore();
    let wrapper: any

    beforeEach(()=>{
        wrapper = mount(
            <Provider store={mockStore()}>
			</Provider>
        );
    });


    it('+++ render the connected(SMART) component', () => {
       expect(wrapper.find(ConnectedHome).length).toEqual(1)
    });
});
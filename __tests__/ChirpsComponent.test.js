import React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import ChirpsComponent from '../src/components/ChirpsComponent'; 
import thunk from 'redux-thunk';
import { testState } from '../src/shared/constants';
import { alert } from '../src/shared/functions';

describe('Testing ChirpsComponent', () => {
    
    const mockStore = configureStore([thunk]);
    let wrapper

    beforeEach(async () => {
        const store = mockStore(testState);
        alert("What is store? ", store.getState());
        wrapper = mount(
            <Provider store={store}>
                <ChirpsComponent />
			</Provider>
        );
    });

    //dummy test
    it('guaranteed to succeed if beforeEach() doesn\'t throw errors', () => {
        expect(wrapper).toBe(wrapper)
    });
});
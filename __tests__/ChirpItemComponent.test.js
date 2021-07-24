import React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme'
import ChirpItemComponent from '../src/components/chirps/ChirpItemComponent'; 
import thunk from 'redux-thunk';
import { testState } from '../src/shared/constants';
import { alert } from '../src/shared/functions';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

describe('Testing ChirpsComponent', () => {
    
    const mockStore = configureStore([thunk]);
    const Stack = createStackNavigator();
    let wrapper

    beforeEach( () => {
        const store = mockStore(testState);
        alert("store.getState() looks like: \n", store.getState());
        wrapper = mount(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen 
                        name='chirp'
                        component={ChirpItemComponent}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
        
        alert('wrapper looks like: \n', wrapper.debug());
    });

    it('defines the component', () => {
        expect(wrapper).toBeDefined();
    });

});

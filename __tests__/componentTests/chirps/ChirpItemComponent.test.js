import React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import ChirpItemComponent from '../../../src/components/chirps/ChirpItemComponent'; 
import thunk from 'redux-thunk';
import { testState } from '../../../src/shared/constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../../mocks/styleMock';

describe('Testing ChirpItemComponent', () => {
    
    const mockStore = configureStore([thunk]);
    const Stack = createStackNavigator();
    const chirpBody = 'chirpBody';
    let wrapper

    beforeEach( () => {
        const store = mockStore(testState);

        wrapper = mount(
            <Provider store={store}>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen name='chirp'>
                    { () => {
                      return (
                        <ChirpItemComponent
                          likes={['']}
                          comments={[]}
                          username={testState.user.username}
                          chirpBody={chirpBody}
                        />)
                    }}
                  </Stack.Screen>
                </Stack.Navigator>
              </NavigationContainer>
            </Provider>
        );
    });

    it('defines the component', () => {
        expect(wrapper).toBeDefined();
    });

    it('should display the username of they who chirped', () => {
      const userWrapper = wrapper.findWhere( (w) => 
        w.text().includes(testState.user.username)
      );
      expect(userWrapper.exists()).toBe(true);
    });

    it('should display the body of the chirp', () => {
      const userWrapper = wrapper.findWhere( (w) => 
        w.text().includes(chirpBody)
      );
      expect(userWrapper.exists()).toBe(true);
    });

});
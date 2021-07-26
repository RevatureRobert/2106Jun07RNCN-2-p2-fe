import React from 'react';
import  { Pressable, TouchableOpacity } from 'react-native';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import ChirpItemComponent from '../../../src/components/chirps/ChirpItemComponent'; 
import thunk from 'redux-thunk';
import { testState } from '../../../src/shared/constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { mockEvent } from '../../mocks';
import { formatTimestamp } from '../../../src/shared/functions';

describe('Testing ChirpItemComponent', () => {
    
    const mockStore = configureStore([thunk]);
    const Stack = createStackNavigator();
    const chirpBody = 'chirpBody';
    const timestamp = Date.now;
    let wrapper
    //In the future, consider using the techniques in the final two tests to set 
    //props instead of defining them all here 
    const nestedHell = (store) => {
      return (
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name='chirp'>
                { () => {
                  return (
                    <ChirpItemComponent
                      likes={['']}
                      comments={[]}
                      username={testState.auth.user.username}
                      body={chirpBody}
                      timestamp={timestamp}
                    />)
                }}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      )
    } 

    beforeEach( () => {
        const store = mockStore(testState);
        wrapper = mount(nestedHell(store));
    });

    it('should display the username of they who chirped', () => {
      const userWrapper = wrapper.findWhere( w => 
        w.text().includes(testState.auth.user.username)
      );
      expect(userWrapper.length > 0).toBe(true);
    });

    it('should display the body of the chirp', () => {
      const userWrapper = wrapper.findWhere( w => 
        w.text().includes(chirpBody)
      );
      expect(userWrapper.length > 0).toBe(true);
    });

    it('should display the timestamp of the chirp', () => {
      const userWrapper = wrapper.findWhere( w => 
        w.text().includes(formatTimestamp(new Date(Number(timestamp))))
      );
      expect(userWrapper.length > 0).toBe(true);
    });

    it('user can press the chirp', () => {
      /*
      > setProps can only affect a root component, hence we rerender at 
          TouchableOpacity component
      > use shallow() because ReactWrapper.simulate('press') throws errors
          because Enzyme is fucking dogshit (shallow returns a ShallowWrapper 
          object, which is different from a ReactWrapper object (which is what 
          mount() returns))
      > If TouchableOpacity has TouchableOpacity children, then the find() will 
          return multiple nodes. Hence we assign use get(0) if we find multiple 
          nodes (0 will be the first one found when reading code top-down)
      */
      const temp = wrapper.find(TouchableOpacity);
      const wrap = shallow(temp.length < 2 ? temp.getElement() : temp.get(0));

      wrap.setProps( {onPress: mockEvent} );
      wrap.simulate('press');
      expect(mockEvent).toHaveBeenCalled();
    });

    it('user can press like button, comment button, and triple-dot button', (done) => {
      const wrap = wrapper.find(Pressable);
      wrap.forEach( w_ => {
        const w = shallow(w_.getElement());
        w.setProps( {onPress: mockEvent} );
        w.simulate('press');
        expect(mockEvent).toHaveBeenCalled();
      });
      done();
    });
});
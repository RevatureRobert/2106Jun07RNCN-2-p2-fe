import React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import ChirpItemComponent from '../src/components/chirps/ChirpItemComponent'; 
import thunk from 'redux-thunk';
import { testState } from '../src/shared/constants';
import { alert } from '../src/shared/functions';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from './mocks/styleMock';

describe('Testing ChirpsComponent', () => {
    
    const mockStore = configureStore([thunk]);
    const Stack = createStackNavigator();
    let wrapper
    alert("state looks like: \n", mockStore(testState).getState());

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
                        />)
                    }}
                  </Stack.Screen>
                </Stack.Navigator>
              </NavigationContainer>
            </Provider>
        );
    });

    it('defines the component', () => {
        alert('wrapper looks like: \n', wrapper.debug());
        expect(wrapper).toBeDefined();
    });

    it('should display the username of they who chirped', () => {
        // const usernameIsDisplayed = wrapper.contains(
        //   <Text style={styles.chirpUser}>@{testState.user.username}</Text>
        // );
        // expect(usernameIsDisplayed).toBe(true);
      const userWrapper = wrapper.find({style: styles.chirpUser}).last();
      alert('userWrapper.debug() looks like: \n', userWrapper.debug());
      expect(userWrapper.text()).toBe(testState.user.username);
    });

});

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      logErrorToMyService(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
  }
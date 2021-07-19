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

    it('should display the username of they who chirped', () => {
        // alert(wrapper.debug())
        // alert(testState.userChirp.username);
        // alert(
        //     wrapper.find(
        //         {testID: 'username-of-chirp'}
        //         // {children: '@dummyUser'}
        //     )
        // );
        // alert(wrapper.find({testID: 'username-of-chirp'}).text());
        // expect(
        //     wrapper.find({testID: 'username-of-chirp'}).text()
        // ).toBe(`@{testState.userChirp.username}`);
        // expect(wrapper.text()).toMatch(testState.userChirp.username);
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
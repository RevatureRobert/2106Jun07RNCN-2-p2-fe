import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { shallow } from 'Enzyme';

export const nestedHell = (state, callback, screenName = 'testScreen') => {
    const mockStore = configureStore([thunk]);
    const store = mockStore(state);
    const Stack = createStackNavigator();
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={screenName}>
                        {callback}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
};

export const findAndShallowRender = (wrapper, findQuery, i=0) => {
    const temp = wrapper.find(findQuery);
    return shallow(temp.length < 2 ? temp.getElement() : temp.get(i));
}

export const wrapInStoreProvider = (initialState, Component) => {
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);
    return (
        <Provider store={store}>
            <Component/>
        </Provider>
    )
}

/**
 * Takes an object representing the props to pass in a component, and it adds
 * a mock navigation prop to simulate being wrapped in Stack.Screen components.
 * 
 * @param props_ - object representing props you will pass to some component
 * @returns - new object with all properties of props_, plus a navigation key
 */
export const createTestProps = (props_) => ({
    navigation: {
      navigate: jest.fn()
    },
    ...props_
});
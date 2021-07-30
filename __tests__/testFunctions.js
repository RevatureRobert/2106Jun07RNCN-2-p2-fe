import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Text } from 'react-native';
import configureStore from 'redux-mock-store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { shallow } from 'enzyme';
import { ObjectFlags } from 'typescript';


/**
 * Wraps a component in the necessary wrappers to account for Redux and React 
 * Navigation.
 * 
 * Future implementation may use createTestProps() to give a navigate prop 
 * instead of wrapping the component in three extra screens
 * 
 * @param {*} state - an object representing the initial state store 
 * @param {*} component - The component to render, or a function that returns JSX
 * @param {*} screenName - (OPTIONAL) the name of Stack.Screen
 * @param {*} screenName2 - (OPTIONAL) the name of nearby Stack.Screen you can navigate to (mock navigate.navigate())
 * @returns a ReactWrapper containing the JSX returned by `component` wrapped in a store provider and the components needed for React Navigation
 */
export const nestedHell = (
    state, 
    component, 
    screenName = 'testScreen1', 
    screenName2 = 'testScreen2',
) => {
    const mockStore = configureStore([thunk]);
    const store = mockStore(state);
    const Stack = createStackNavigator();
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={screenName}>
                        {component}
                    </Stack.Screen>
                    <Stack.Screen name={screenName2}>
                        { () => {
                            return (
                                <>
                                    <Text>{screenName2}</Text>
                                </>
                            );
                        }}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
};

/**
 * Uses Enzyme's find() method to find a component and render the result.
 * 
 * @param {*} wrapper - a ReactWrapper or ShallowWrapper object
 * @param {*} findQuery - the argument to find()
 * @param {*} i - (OPTIONAL) if find returns multiple nodes, grab the nth node
 * @returns 
 */
export const findAndShallowRender = (wrapper, findQuery, i=0) => {
    const temp = wrapper.find(findQuery);
    return shallow(temp.length < 2 ? temp.getElement() : temp.get(i));
}

/**
 * Wrap component in a store provider with a mocked store.
 * 
 * @param {*} initialState - initial state store
 * @param {*} Component - component to wrap in store provider
 * @returns 
 */
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

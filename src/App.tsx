import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { Store } from './Redux/store/store';
import Amplify from 'aws-amplify';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { createStackNavigator } from '@react-navigation/stack';
import MainView from './components/MainView';
import AddChirpView from './components/AddChirpView';
import config from '../src/cognitoConfig.json';

Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
});

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home" headerMode="none">
          <Stack.Screen name="Home" component={MainView} />
          <Stack.Screen name="compose" component={AddChirpView} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111111',
    flex: 1,
    overflow: 'hidden'
  },

  webContainer: {
    flex: 1,
    flexDirection: 'row'
  }
});

export default registerRootComponent(App);

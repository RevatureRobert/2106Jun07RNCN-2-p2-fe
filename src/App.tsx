import React from 'react';
import { Provider } from 'react-redux';
import { Store } from './Redux/store/store';
import { View } from 'react-native';
import Amplify from 'aws-amplify';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { createStackNavigator } from '@react-navigation/stack';
import MainView from './components/MainView';
import AddChirpView from './components/AddChirpView';
import { ToastProvider } from 'react-native-toast-notifications';
import config from './cognitoConfig.json';
import SignupComponent from './components/SignupComponent';

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
      <NavigationContainer theme={DarkTheme}>
        <ToastProvider
          normalColor="white"
          textStyle={{ color: '#000' }}
          offset={50}
        >
          <View style={{ backgroundColor: '#111', flex: 1 }}>
            <Stack.Navigator
              initialRouteName="home"
              headerMode="none"
              screenOptions={{
                cardStyle: { backgroundColor: '#111' }
              }}
            >
              <Stack.Screen
                name="home"
                component={MainView}
                options={{
                  gestureDirection: 'horizontal'
                }}
              />
              <Stack.Screen
                name="compose"
                options={{
                  gestureDirection: 'horizontal'
                }}
                component={AddChirpView}
              />
              <Stack.Screen
                name="chirp"
                options={{
                  gestureDirection: 'horizontal'
                }}
                component={AddChirpView}
              />
            </Stack.Navigator>
          </View>
        </ToastProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default registerRootComponent(App);

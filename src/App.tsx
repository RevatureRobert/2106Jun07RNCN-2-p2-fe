import React from 'react';
import { Provider } from 'react-redux';
import { Store } from './redux/store/store';
import { View } from 'react-native';
import Amplify from 'aws-amplify';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { ToastProvider } from 'react-native-toast-notifications';
import config from './cognitoConfig.json';
import MainNavComponent from './components/navigation/MainNavComponent';

Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    bucketName: config.storage.BUCKET,
    identityPoolId: config.storage.IDENTITY_POOL_ID
  },
  Storage: {
    bucket: config.storage.BUCKET,
    // level: level,
    region: config.storage.REGION,
    identityPoolId: config.storage.IDENTITY_POOL_ID
  }
});

function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer theme={DarkTheme}>
        <ToastProvider
          normalColor='white'
          textStyle={{ color: '#000' }}
          offset={50}
        >
          <View style={{ backgroundColor: '#111', flex: 1 }}>
            <MainNavComponent />
          </View>
        </ToastProvider>
      </NavigationContainer>
    </Provider>
  );
}
export default registerRootComponent(App);

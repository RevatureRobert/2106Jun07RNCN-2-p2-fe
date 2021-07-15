import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupComponent from './SignupComponent';
import SigninComponent from './SigninComponent';
import MainView from './MainView';
import AddChirpView from './AddChirpView';
import { enableScreens } from 'react-native-screens';
import { useSelector } from 'react-redux';
import { RootStore } from '../Redux/store/store';

type RootStackParamList = {
  home: undefined;
  compose: undefined;
  chirp: undefined;
  login: undefined;
  signup: undefined;
};

const MainNavComponent: React.FC = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  const user = useSelector((state: RootStore) => state.auth);

  return (
    <Stack.Navigator
      headerMode='none'
      screenOptions={{
        cardStyle: { backgroundColor: '#111' },
      }}
    >
      {user.authenticated === true ? (
        <>
          <Stack.Screen
            name='home'
            component={MainView}
            options={{
              gestureDirection: 'horizontal',
            }}
          />
          <Stack.Screen
            name='compose'
            options={{
              gestureDirection: 'horizontal',
            }}
            component={AddChirpView}
          />
          <Stack.Screen
            name='chirp'
            options={{
              gestureDirection: 'horizontal',
            }}
            component={AddChirpView}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name='login'
            component={SigninComponent}
            options={{
              gestureDirection: 'horizontal',
            }}
          />

          <Stack.Screen
            name='signup'
            options={{
              gestureDirection: 'horizontal',
            }}
            component={SignupComponent}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavComponent;

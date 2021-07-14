import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupComponent from './SignupComponent';
import SigninComponent from './SigninComponent';
import MainView from './MainView';
import AddChirpView from './AddChirpView';
import { useSelector } from 'react-redux';
import { RootStore } from '../Redux/store/store';

const MainNavComponent: React.FC = () => {
  const Stack = createStackNavigator();

  const currentUser = useSelector((state: RootStore) => state.auth);

  if (currentUser.authenticated === true) {
    return (
      <Stack.Navigator
        initialRouteName='home'
        headerMode='none'
        screenOptions={{
          cardStyle: { backgroundColor: '#111' },
        }}
      >
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
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        initialRouteName='login'
        headerMode='none'
        screenOptions={{
          cardStyle: { backgroundColor: '#111' },
        }}
      >
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
      </Stack.Navigator>
    );
  }
};

export default MainNavComponent;

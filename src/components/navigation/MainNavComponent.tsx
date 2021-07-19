import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupComponent from '../user/SignupComponent';
import SigninComponent from '../user/SigninComponent';
import MainView from '../MainView';
import AddChirpView from '../addchirp/AddChirpView';
import { useSelector } from 'react-redux';
import { RootStore } from '../../redux/store/store';
import SingleChirpView from '../chirps/SingleChirpView';

// define stack screens
type RootStackParamList = {
  home: undefined;
  compose: undefined;
  chirp: undefined;
  login: undefined;
  signup: undefined;
};

const MainNavComponent: React.FC = () => {
  // creates stack navigator and gets current user
  const Stack = createStackNavigator<RootStackParamList>();
  const user = useSelector((state: RootStore) => state.auth);

  return (
    <Stack.Navigator
      headerMode='none'
      screenOptions={{
        cardStyle: { backgroundColor: '#111' },
      }}
    >
      {
        // checks if user is logged in, directs to the main page
        user.authenticated === true ? (
          <>
            {/* main page */}
            <Stack.Screen
              name='home'
              component={MainView}
              options={{
                gestureDirection: 'horizontal',
              }}
            />
            {/* post chirp */}
            <Stack.Screen
              name='compose'
              options={{
                gestureDirection: 'horizontal',
              }}
              component={AddChirpView}
            />
            {/* single chirp view */}
            <Stack.Screen
              name='chirp'
              options={{
                gestureDirection: 'horizontal',
              }}
              component={SingleChirpView}
            />
          </>
        ) : (
          // redirects to log in if not logged in
          <>
            {/* log in */}
            <Stack.Screen
              name='login'
              component={SigninComponent}
              options={{
                gestureDirection: 'horizontal',
              }}
            />
            {/* sign up */}
            <Stack.Screen
              name='signup'
              options={{
                gestureDirection: 'horizontal',
              }}
              component={SignupComponent}
            />
          </>
        )
      }
    </Stack.Navigator>
  );
};

export default MainNavComponent;

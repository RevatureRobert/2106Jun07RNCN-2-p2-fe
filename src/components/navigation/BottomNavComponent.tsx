import React from 'react';
import ChirpsComponent from '../chirps/ChirpsComponent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserChirpsComponent from '../chirps/UserChirpsComponent';
import { UserSettingComponent } from '../user/UserSettingComponent';
import { useSelector } from 'react-redux';
import { RootStore } from '../../redux/store/store';
import { Platform } from 'react-native';

// creates the tab navigator
const Tab = createBottomTabNavigator();

const BottomNavComponent = () => {
  // gets the current user
  const currentUser = useSelector((state: RootStore) => state.auth.user);

  return (
    <Tab.Navigator
      initialRouteName='Feed'
      tabBarOptions={{
        activeTintColor: '#fff',
        showLabel: false,
        style: {
          backgroundColor: '#1b1b1b',
          borderTopWidth: 0,
          borderBottomWidth: 0,
          marginBottom: 0,
          height: 64,
          ...Platform.select({
            ios: {
              padding: 10,
              height: 75
            }
          })
        }
      }}
    >
      {/* all chirps feed */}
      <Tab.Screen
        name='Feed'
        component={ChirpsComponent}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='home-outline'
              color={color}
              size={size}
            />
          )
        }}
      />
      {/* user profile */}
      <Tab.Screen
        name='Profile'
        children={() => (
          <UserChirpsComponent
            route={{
              params: {
                username: currentUser ? currentUser.username : '',
                currentUser: currentUser ? currentUser?.username : ''
              }
            }}
          />
        )}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='account-outline'
              color={color}
              size={size}
            />
          )
        }}
      />
      {/* user settings */}
      <Tab.Screen
        name='Settings'
        component={UserSettingComponent}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='account-cog-outline'
              color={color}
              size={size}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavComponent;

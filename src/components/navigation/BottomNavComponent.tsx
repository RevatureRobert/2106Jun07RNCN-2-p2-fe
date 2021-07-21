import React from 'react';
import ChirpsComponent from '../chirps/ChirpsComponent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserChirpsComponent from '../chirps/UserChirpsComponent';
import { UserSettingComponent } from '../user/UserSettingComponent';
import { UserBioComponent } from '../user/UserBioComponent';

// creates the tab navigator
const Tab = createBottomTabNavigator();

const BottomNavComponent = () => {
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
        },
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
          ),
        }}
      />
      {/* user profile */}
      <Tab.Screen
        name='Profile'
        component={UserChirpsComponent}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='account-outline'
              color={color}
              size={size}
            />
          ),
        }}
      />
      {/* user settings */}
      <Tab.Screen
        name='Settings'
        component={ChirpsComponent}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='account-cog-outline'
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavComponent;

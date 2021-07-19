import React from 'react';
import ChirpsComponent from '../chirps/ChirpsComponent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserChirpsComponent from '../chirps/UserChirpsComponent';
import { UserSettingComponent } from '../user/UserSettingComponent';

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
          height: 64
        }
      }}
    >
      {/* all chirps feed */}
      <Tab.Screen
        name='Feed'
        component={ChirpsComponent}
        options={{
          tabBarLabel: 'Feed',
          unmountOnBlur: true,
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
        component={UserChirpsComponent}
        options={{
          tabBarLabel: 'Profile',
          unmountOnBlur: true,
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
        component={ChirpsComponent}
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
      <Tab.Screen
        name='gg'
        component={UserSettingComponent}
        options={{
          tabBarLabel: 'gg',
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

<<<<<<< HEAD
const styles = StyleSheet.create({
  bottomNavigationContainer: {
    flex: 1
  }
});

=======
>>>>>>> 422c11c2294df6a34887c9e38b7a5b4c6fc6cbf5
export default BottomNavComponent;

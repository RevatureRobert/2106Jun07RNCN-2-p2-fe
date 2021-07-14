import React from 'react';
import { StyleSheet, View } from 'react-native'
import ChirpsComponent from './ChirpsComponent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BottomNavComponent = () => {
  return (
    <View style={styles.bottomNavigationContainer}>
       <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#fff',
        showLabel: false,
        style: {
          backgroundColor: '#111',
          borderTopWidth: 0,
          borderBottomWidth: 0,
          marginBottom: 0,
        }
      }}
    >
      <Tab.Screen
        name="Feed"
        component={ChirpsComponent}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ChirpsComponent}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={ChirpsComponent}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-cog-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomNavigationContainer: {
    flex: 1
  }
});

export default BottomNavComponent;
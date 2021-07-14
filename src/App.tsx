import React from 'react';
import { Provider } from 'react-redux';
<<<<<<< HEAD
import { Store } from './Redux/store/store';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo'; // import it explicitly
import BottomNavComponent from './components/BottomNavComponent';

function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#111111"
            barStyle="light-content" // Here is where you change the font-color
          />
          <HeaderComponent />
          <BottomNavComponent />
          <AddChirpBtnComponent />
        </View>
=======
import { Store } from './Redux/store/store'
import { View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { createStackNavigator } from '@react-navigation/stack';
import MainView from './components/MainView';
import AddChirpView from './components/AddChirpView';
import { ToastProvider } from 'react-native-toast-notifications';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer theme={DarkTheme}>
        <ToastProvider normalColor="white" textStyle={{color: '#000'}} offset={50}>
          <View style={{backgroundColor: '#111', flex: 1}}>
          <Stack.Navigator
          initialRouteName="home"
          headerMode="none"
          screenOptions={{
            cardStyle: {backgroundColor: '#111'}
          }}>
            <Stack.Screen
              name="home"
              component={MainView}
              options={{
                gestureDirection: 'horizontal',
              }}
            />
              <Stack.Screen
              name="compose"
              options={{
                gestureDirection: 'horizontal',
              }}
              component={AddChirpView}
            />
              <Stack.Screen
              name="chirp"
              options={{
                gestureDirection: 'horizontal',
              }}
              component={AddChirpView}
            />
          </Stack.Navigator>
          </View>
        </ToastProvider>
>>>>>>> b72ff3494844f02817bf60059341ba11cdca2e6e
      </NavigationContainer>
    </Provider>
  );
}

<<<<<<< HEAD
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
=======
export default registerRootComponent(App);
>>>>>>> b72ff3494844f02817bf60059341ba11cdca2e6e

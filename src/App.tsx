import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import ChirpsComponent from './components/ChirpsComponent';
import HeaderComponent from './components/HeaderComponent';
import AddChirpBtnComponent from './components/AddChirpBtnComponent';
import BottomNaComponent from './components/BottomNavComponent';
import { Provider } from 'react-redux';
import { Store } from './Redux/store/Store'
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
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111111',
    flex: 1,
    overflow: 'hidden'
  },

  webContainer: {
    flex: 1,
    flexDirection: 'row'
  },
});

export default registerRootComponent(App);
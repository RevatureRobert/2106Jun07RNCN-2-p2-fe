import React from 'react';
import { StyleSheet, StatusBar, View, Platform } from 'react-native';
import HeaderComponent from './HeaderComponent';
import AddChirpBtnComponent from './AddChirpBtnComponent';
import BottomNavComponent from './BottomNavComponent';

const MainView: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#111111' barStyle='light-content' />
      <HeaderComponent
        currentView='allChirps'
        newChirp={{ username: '', body: '', timestamp: '' }}
      />
      <BottomNavComponent />
      <AddChirpBtnComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111111',
    flex: 1,
    overflow: 'hidden',
    ...Platform.select({
      ios: { paddingTop: 50 },
      android: { paddingTop: 15 }
    })
  }
});

export default MainView;

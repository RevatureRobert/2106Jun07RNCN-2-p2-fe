import React from 'react';
import { StyleSheet, StatusBar, SafeAreaView, Platform } from 'react-native';
import AddChirpBtnComponent from './addchirp/AddChirpBtnComponent';
import BottomNavComponent from './navigation/BottomNavComponent';

const MainView: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#1b1b1b' barStyle='light-content' />
      <BottomNavComponent />
      <AddChirpBtnComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    flex: 1,
    overflow: 'hidden',
    ...Platform.select({
      android: { paddingTop: 0 },
    }),
  },
});

export default MainView;

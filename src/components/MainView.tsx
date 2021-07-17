import React from 'react';
import { StyleSheet, StatusBar, View, Platform } from 'react-native';
import AddChirpBtnComponent from './addchirp/AddChirpBtnComponent';
import BottomNavComponent from './navigation/BottomNavComponent';

const MainView: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#111111' barStyle='light-content' />
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
      android: { paddingTop: 15 },
    }),
  },
});

export default MainView;

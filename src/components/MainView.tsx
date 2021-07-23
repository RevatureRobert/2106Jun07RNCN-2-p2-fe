import React from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform,
  View
} from 'react-native';
import AddChirpBtnComponent from './addchirp/AddChirpBtnComponent';
import BottomNavComponent from './navigation/BottomNavComponent';

const MainView: React.FC = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar backgroundColor='#1b1b1b' barStyle='light-content' />
      </SafeAreaView>
      <BottomNavComponent />
      {/* <AddChirpBtnComponent /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    flex: 1,
    overflow: 'hidden',
    ...Platform.select({
      android: { paddingTop: 0 }
    })
  }
});

export default MainView;

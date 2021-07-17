import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const LoadingComponent: React.FC = () => {
  return (
    <View style={styles.loadingView}>
      <Image
        source={require('../../assets/preloader.gif')}
        style={styles.loadingImg}
        resizeMode='contain'
      ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },

  loadingImg: {
    height: 48,
    alignSelf: 'center',
  },
});

export default LoadingComponent;

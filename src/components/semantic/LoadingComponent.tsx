import React from 'react';
import { Image, View } from 'react-native';
import styles from './semanticstyles';

// loading component... for when things are... loading (displays a spinner)
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

export default LoadingComponent;

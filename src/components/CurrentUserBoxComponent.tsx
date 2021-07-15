import React from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootStore } from '../Redux/store/store';

const CurrentUserBoxComponent: React.FC = () => {
  const currentUser = useSelector((state: RootStore) => state.auth.user);

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <Image
        source={require('../assets/defaultUserImage.png')}
        style={styles.userImg}
        resizeMode='contain'
      ></Image>
      <Text style={styles.usernameText}>@{currentUser?.username}</Text>
      <Text style={styles.bioText}>This is a sample bio.</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  androidSafeArea: {
    height: 200,
    alignItems: 'center',
    backgroundColor: '#111',
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight,
      },
    }),
  },

  userImg: {
    height: 64,
    borderRadius: 64,
  },

  usernameText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },

  bioText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default CurrentUserBoxComponent;

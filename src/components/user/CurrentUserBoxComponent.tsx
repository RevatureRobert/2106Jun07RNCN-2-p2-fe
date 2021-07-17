import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../redux/store/store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { logout } from '../../redux/actions/AuthActions';

const CurrentUserBoxComponent: React.FC = () => {
  const currentUser = useSelector((state: RootStore) => state.auth.user);

  const dispatch = useDispatch();

  const logOutPress = () => {
    dispatch(logout);
  };

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <Image
        source={require('../../assets/defaultUserImage.png')}
        style={styles.userImg}
        resizeMode='contain'
      ></Image>
      <Text style={styles.usernameText}>@{currentUser?.username}</Text>
      <Text style={styles.bioText}>This is a sample bio.</Text>
      <TouchableHighlight style={styles.logOutBtn} onPress={logOutPress}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          <MaterialCommunityIcons name='logout' size={18} color='#fff' />
          <Text style={styles.logOutText}>Log out</Text>
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  androidSafeArea: {
    height: 225,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
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

  logOutBtn: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#ff4242',
    borderRadius: 15,
    width: 100,
  },

  logOutText: {
    fontWeight: '700',
    color: '#fff',
    alignSelf: 'center',
    paddingRight: 10,
  },
});

export default CurrentUserBoxComponent;

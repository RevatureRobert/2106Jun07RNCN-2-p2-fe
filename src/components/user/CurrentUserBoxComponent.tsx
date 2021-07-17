import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
  Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../redux/store/store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { logout } from '../../redux/actions/AuthActions';

const CurrentUserBoxComponent: React.FC = () => {
  const currentUser = useSelector((state: RootStore) => state.auth.user);
  const dispatch = useDispatch();

  const logOutPress = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <Image
        source={require('../../assets/defaultUserImage.png')}
        style={styles.userImg}
        resizeMode='contain'
      ></Image>
      <Text style={styles.usernameText}>@{currentUser?.username}</Text>
      <Text style={styles.bioText}>Paranormal Investigator at Chirper 👻</Text>
      <TouchableHighlight style={styles.logOutBtn} onPress={logOutPress}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          <MaterialCommunityIcons name='logout' size={18} color='#fff' />
          <Text style={styles.logOutText}> Log out</Text>
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  androidSafeArea: {
    minHeight: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 25,
    margin: 12,
    marginBottom: 0,
    marginTop: -64,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  userImg: {
    height: 72,
    borderRadius: 64,
  },

  usernameText: {
    color: '#fff',
    fontWeight: '700',
    marginTop: 12,
    fontSize: 18,
  },

  bioText: {
    color: '#fff',
    fontSize: 14,
    maxWidth: 200,
    textAlign: 'center',
  },

  logOutBtn: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#ff4242',
    borderRadius: 25,
    width: 124,
  },

  logOutText: {
    fontWeight: '700',
    color: '#fff',
    alignSelf: 'center',
    paddingRight: 10,
  },
});

export default CurrentUserBoxComponent;

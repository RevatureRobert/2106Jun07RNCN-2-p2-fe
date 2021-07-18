import React from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../redux/store/store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { logout } from '../../redux/actions/AuthActions';
import styles from './userstyles';

// current user box component, displays user info and log out button
const CurrentUserBoxComponent: React.FC = () => {
  // gets current logged in user from store
  const currentUser = useSelector((state: RootStore) => state.auth.user);
  const dispatch = useDispatch();

  // log out function
  const logOutPress = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      {/* user profile picture */}
      <Image
        source={require('../../assets/defaultUserImage.png')}
        style={styles.userImg}
        resizeMode='contain'
      ></Image>
      {/* username and bio */}
      <Text style={styles.usernameText}>@{currentUser?.username}</Text>
      <Text style={styles.bioText}>Paranormal Investigator at Chirper 👻</Text>
      {/* log out button */}
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

export default CurrentUserBoxComponent;

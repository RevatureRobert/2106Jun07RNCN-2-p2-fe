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
import Constants from 'expo-constants';
import { Storage } from 'aws-amplify';
import * as ImagePicker from 'expo-image-picker';
import styles from './userstyles';

interface Props {
  username: string;
  currentUser: string;
}

// current user box component, displays user info and log out button
const CurrentUserBoxComponent: React.FC<Props> = ({ username }) => {
  // gets current logged in user from store
  const currentUser = useSelector((state: RootStore) => state.auth.user);
  const [image, setImage] = React.useState(null);
  const [bio, setBio] = React.useState(' ');
  const dispatch = useDispatch();

  // gets the current user's profile picture
  React.useEffect(() => {
    fetchImage();
    (async () => {
      if (Constants.platform?.ios) {
        const cameraRollStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (
          cameraRollStatus.status !== 'granted' ||
          cameraStatus.status !== 'granted'
        ) {
          alert('Sorry, we need these permissions to make this work!');
        }
      }
    })();

    // cleanup function
    return () => {
      setImage(null);
    };
  }, []);

  const fetchImage = async () => {
    let filename = `${username}/myimages`;
    const signUrl: any = await Storage.get(filename);

    setImage(signUrl);
  };

  fetchImage()

  // log out function
  const logOutPress = () => {
    setImage(null);
    dispatch(logout());
  };

  const fetchText = () => {
    let mybio = `${username}/mybio`;

    return Storage.get(mybio)
      .then((data: any) => {
        fetch(data)
          .then((r) => r.text())
          .then((text) => {
            setBio(text);
          })
          .catch((e) => console.log('error fetching text: ', e));
      })
      .catch((err) => console.log('error fetching from S3', err));
  };
  fetchText();

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      {/* user profile picture */}
      <Image
        source={{ uri: image as any }}
        style={styles.userImg}
      // style={styles.userImg}
      // resizeMode='contain'
      ></Image>
      {/* username and bio */}
      <Text style={styles.usernameText}>@{username}</Text>
      <Text testID='bio' style={styles.bioText}>
        {bio}
      </Text>
      {/* log out button */}
      {currentUser?.username === username ? (
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
      ) : null}
    </SafeAreaView>
  );
};

export default CurrentUserBoxComponent;

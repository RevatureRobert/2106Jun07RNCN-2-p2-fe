import React from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../redux/store/store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { logout } from '../../redux/actions/AuthActions';
import Constants from 'expo-constants';
import { Auth, Storage } from 'aws-amplify';
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
  const [bio, setBio] = React.useState('null');
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetchImage();
    // fetchText();
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
  }, []);

  const fetchImage = async () => {
    let filename = `${username}/myimages`;
    const signUrl: any = await Storage.get(filename);
    // return signUrl;

    setImage(signUrl);
  };

  // log out function
  const logOutPress = () => {
    dispatch(logout());
  };

  const fetchText = () => {
    let bio = `${username}/mybio`;

    return Storage.get(bio)
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
        style={{ width: 72, height: 72, borderRadius: 72 / 2 }}
        // style={styles.userImg}
        // resizeMode='contain'
      ></Image>
      {/* username and bio */}
      <Text style={styles.usernameText}>@{username}</Text>
      <Text style={styles.bioText}>{bio}</Text>
      {/* log out button */}
      {currentUser?.username === username ? (
        <TouchableHighlight style={styles.logOutBtn} onPress={logOutPress}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center'
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

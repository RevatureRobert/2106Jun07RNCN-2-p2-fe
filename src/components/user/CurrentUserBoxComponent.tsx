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
<<<<<<< HEAD
  const [textBio, setTextBio] = React.useState('');
=======
  const [bio, setBio] = React.useState(null);
>>>>>>> 33152b5a8d36a55f6ec1254d95d0234e28995906
  const dispatch = useDispatch();

  // function to get updated bio
  const getBio = async () => {
    try {
      const currentUserInfo = await Auth.currentUserInfo();
      const currentBio = currentUserInfo.attributes['custom:bio'];
      console.log('MY BIO: ', currentBio);
      setBio(currentBio);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchImage();
    getBio();
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

<<<<<<< HEAD
  const pickImage = async (e: any) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1
    });

    handleImagePicked(result);
  };

=======
>>>>>>> 33152b5a8d36a55f6ec1254d95d0234e28995906
  const fetchImage = async () => {
    let filename = `${username}/myimages`;
    const signUrl: any = await Storage.get(filename);
    // return signUrl;

    setImage(signUrl);
  };

<<<<<<< HEAD
  const handleImagePicked = async (pickerResult: any) => {
    let user = currentUser?.username;
    try {
      if (pickerResult.cancelled) {
        alert('Upload cancelled');
        return;
      } else {
        const img = await fetchImageFromUri(pickerResult.uri);
        console.log('pickerResult:', pickerResult);
        let filename = `${user}/myimages`;

        const uploadUrl = await uploadImage(filename, img);
        downloadImage(uploadUrl);
        fetchImage();
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed');
    }
  };

  const uploadImage = (filename: any, img: any) => {
    Auth.currentCredentials();
    return Storage.put(filename, img, {
      level: 'public',
      contentType: 'image/jpeg'
      // progressCallback(progress: any) {
      //   setLoading(progress);
      // }
    })
      .then((response: any) => {
        return response.key;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
  };

  const downloadImage = (uri: any) => {
    Storage.get(uri)
      .then((result: any) => setImage(result))
      .catch((err) => console.log(err));
  };

  const fetchImageFromUri = async (uri: any) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

=======
>>>>>>> 33152b5a8d36a55f6ec1254d95d0234e28995906
  // log out function
  const logOutPress = () => {
    dispatch(logout());
  };

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
<<<<<<< HEAD
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
=======
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
>>>>>>> 33152b5a8d36a55f6ec1254d95d0234e28995906
    </SafeAreaView>
  );
};

export default CurrentUserBoxComponent;

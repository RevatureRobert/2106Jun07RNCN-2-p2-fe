import React from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
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
}

// current user box component, displays user info and log out button
const CurrentUserBoxComponent: React.FC<Props> = ({ username }) => {
  // gets current logged in user from store
  const currentUser = useSelector((state: RootStore) => state.auth.user);
  const [image, setImage] = React.useState(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetchImage();
  }, []);

  React.useEffect(() => {
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

  const pickImage = async (e: any) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    handleImagePicked(result);
  };

  const fetchImage = async () => {
    let filename = `${username}/myimages`;
    const signUrl: any = await Storage.get(filename);
    // return signUrl;

    setImage(signUrl);
  };

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
      contentType: 'image/jpeg',
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

  // log out function
  const logOutPress = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      {/* user profile picture */}
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={{ uri: image as any }}
          style={{ width: 72, height: 72, borderRadius: 72 / 2 }}
          // style={styles.userImg}
          // resizeMode='contain'
        ></Image>
      </TouchableOpacity>
      {/* username and bio */}
      <Text style={styles.usernameText}>@{username}</Text>
      <Text style={styles.bioText}>{currentUser?.bio}</Text>
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

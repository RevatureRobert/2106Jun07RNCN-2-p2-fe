import React, { useEffect } from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Image,
  GestureResponderEvent,
  Button,
  Platform
} from 'react-native';
import Constants from 'expo-constants';
import { Auth } from 'aws-amplify';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';
import { RootStore } from '../../redux/store/store';
import { Storage } from 'aws-amplify';
import { UserBioComponent } from './UserBioComponent';

export const UserSettingComponent: React.FC = () => {
  const [image, setImage] = React.useState(null);
  const currentUser = useSelector((state: RootStore) => state.auth.user);

  useEffect(() => {
    fetchImage();
  }, []);

  useEffect(() => {
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
      quality: 1
    });

    handleImagePicked(result);
  };

  const fetchImage = async () => {
    let filename = `${currentUser?.username}/myimages`;
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
      contentType: 'image/jpeg'
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

  return (
    <View>
      <View>
        {image && (
          <View>
            <Image
              source={{ uri: image as any }}
              style={{ width: 250, height: 250 }}
            />
          </View>
        )}

        <Button onPress={pickImage} title='Upload a profile picture' />
      </View>
      <View>
        <UserBioComponent />
      </View>
    </View>
  );
};

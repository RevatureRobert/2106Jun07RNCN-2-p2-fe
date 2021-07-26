import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Auth, Storage } from 'aws-amplify';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';
import { RootStore } from '../../redux/store/store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const ImageUploadComponent: React.FC<any> = (props) => {
  const [image, setImage] = React.useState(null);
  const currentUser = useSelector((state: RootStore) => state.auth.user);

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
      quality: 0.5
    });

    handleImagePicked(result);
  };

  const fetchImage = async (filename: string) => {
    const signUrl: any = await Storage.get(filename);

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
        let filename = `${user}/pics/${Date.now()}`;
        props.setImageURL(
          'https://chirps-bucket-for-pics.s3.us-east-2.amazonaws.com/public/default/paddedPreloader.gif'
        );

        const uploadUrl = await uploadImage(filename, img);
        downloadImage(uploadUrl);
        fetchImage(filename);
        props.setImageURL(
          'https://chirps-bucket-for-pics.s3.us-east-2.amazonaws.com/public/' +
            filename
        );
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
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 5
        }}
      >
        <TouchableOpacity onPress={pickImage}>
          <View>
            <MaterialCommunityIcons
              name='image-outline'
              size={30}
              color='#ccc'
              onPress={pickImage}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

import React, { useState, useEffect } from 'react';
import { View, Platform, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { config } from 'dotenv';
config();

const client = new S3Client({});

export const ImageUploader = () => {
  const [image, setImage] = useState('');
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      return uploadImage();
    }

    return 'Error';
  };

  const uploadImage = async () => {
    // https://github.com/expo/examples/blob/master/with-aws-storage-upload/App.js
    try {
      //upload code here
    } catch (e) {
      console.log(e);
      alert('Upload failed');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
      <TouchableOpacity onPress={pickImage}>
        <View>
          <MaterialCommunityIcons name='image-outline' size={30} color='#ccc' />
        </View>
      </TouchableOpacity>
    </View>
  );
};

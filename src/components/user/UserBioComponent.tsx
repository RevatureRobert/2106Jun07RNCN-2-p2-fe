import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';
import styles from './userstyles';

export const UserBioComponent: React.FC = () => {
  const [bioText, setBioText] = React.useState('');

  const updateUserBio = async () => {
    const user = await Auth.currentAuthenticatedUser();

    await Auth.updateUserAttributes(user, {
      'custom:bio': bioText
    });
    setBioText('');
  };
  // function to get updated bio
  const getBio = async () => {
    try {
      const currentUserInfo = await Auth.currentUserInfo();
      const currentBio = currentUserInfo.attributes['custom:bio'];
      return currentBio;
    } catch (error) {
      console.log(error);
    }
  };
  getBio();
  const changeBioHandler = (val: any) => {
    setBioText(val);
  };
  return (
    <View style={styles.updateBioView}>
      <View>
        <Text style={styles.updateBioText}>Update bio</Text>
        <TextInput
          multiline={false}
          // numberOfLines={6}
          onChangeText={changeBioHandler}
          value={bioText}
          style={styles.input}
          returnKeyType='done'
        />
      </View>
      <TouchableOpacity style={styles.updateBioBtn} onPress={updateUserBio}>
        <Text style={styles.updateBioBtnText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

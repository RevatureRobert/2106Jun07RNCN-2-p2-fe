import React from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';

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
      console.log('MY BIO: ', currentBio);
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
    <View>
      <View>
        <Text>Update your bio</Text>
        <TextInput
          multiline={true}
          // numberOfLines={6}
          onChangeText={changeBioHandler}
          value={bioText}
          style={styles.input}
        />
      </View>
      <Button title='Update ' onPress={updateUserBio} />
    </View>
  );
};

export const styles = StyleSheet.create({
  input: {
    color: '#f3f3f3',
    padding: 25,
    borderWidth: 1,
    backgroundColor: '#1b1b1b',
    marginLeft: 12,
    borderColor: '#1b1b1b',
    textAlign: 'left',
    borderRadius: 15,
    textAlignVertical: 'top',
    fontSize: 16,
    flex: 1,
    paddingTop: 25
  }
});

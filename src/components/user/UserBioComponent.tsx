import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';
import styles from './userstyles';
import { useSelector } from 'react-redux';
import { RootStore } from '../../redux/store/store';
import { Storage } from 'aws-amplify';

export const UserBioComponent: React.FC = () => {
  const [bioText, setBioText] = React.useState('');
  const currentUser = useSelector((state: RootStore) => state.auth.user);

  //   let dispatch = useDispatch();

  //   const updateUserBio = async () => {
  //     const user = await Auth.currentAuthenticatedUser();

  //     await Auth.updateUserAttributes(user, {
  //       'custom:bio': bioText
  //     });
  //     setBioText('');
  //   };

  const fetchText = async () => {
    let user = currentUser?.username;

    let bio = `${user}/mybio`;
    const signUrl: any = await Storage.get(bio);
    // return signUrl;

    setBioText(signUrl);
  };

  const updateUserBio = async () => {
    let user = currentUser?.username;

    try {
      let bio = `${user}/mybio`;

      await uploadBio(bio, bioText);
      setBioText('');
      //   downloadText(textUrl);
    } catch (error) {}
  };
  const uploadBio = (text: any, content: any) => {
    Auth.currentCredentials();
    return Storage.put(text, content, {
      level: 'public',
      contentType: 'text/plain'
    })
      .then((response: any) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
  };
  const downloadText = (text: any) => {
    Storage.get(text)
      .then((result: any) => setBioText(result))
      .catch((err) => console.log(err));
  };

  //   const updateUserBio = async () => {
  //     let user = currentUser?.username;

  //     try {
  //       const currentUserInfo = await Auth.currentUserInfo();
  //       const currentBio = currentUserInfo.attributes['custom:bio'];
  //       return currentBio;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const updateUserBio = async () => {
  //     const user = await Auth.currentAuthenticatedUser();

  //     await Auth.updateUserAttributes(user, {
  //       'custom:bio': bioText
  //     });
  //     setBioText('');
  //   };
  // function to get updated bio
  //   const getBio = async () => {
  //     try {
  //       const currentUserInfo = await Auth.currentUserInfo();
  //       const currentBio = currentUserInfo.attributes['custom:bio'];
  //       console.log('MY BIO: ', currentBio);
  //       return currentBio;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const getOtherUserAttr = async () => {
  //     const user = await Auth.Credentials;
  //     let userAttributes = await Auth.userAttributes(user);
  //     console.log('USER-ATTRIBUTES: ', userAttributes);
  //   };
  //   getOtherUserAttr();
  //   getBio();
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
      <View>
        <Text
          style={[
            styles.updateBioCount,
            bioText.length > 0 ? { color: '#B1D46A' } : null,
            bioText.length > 100 ? { color: '#D4B16A' } : null,
            bioText.length > 150 ? { color: '#D46A6A' } : null
          ]}
        >
          {bioText.length}/150
        </Text>
        <TouchableOpacity
          style={styles.updateBioBtn}
          onPress={updateUserBio}
          disabled={bioText.length > 150 || bioText.length < 1}
        >
          <Text style={styles.updateBioBtnText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

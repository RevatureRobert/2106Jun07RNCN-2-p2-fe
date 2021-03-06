import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { Auth, Storage } from 'aws-amplify';
import styles from './userstyles';
import { useSelector } from 'react-redux';
import { RootStore } from '../../redux/store/store';
import { useToast } from 'react-native-toast-notifications';

interface PropType {
  bioTextInit?: string;
}

const defaultProp = {
  bioTextInit: ''
};

export const UserBioComponent: React.FC<PropType> = (
  Props: PropType = defaultProp
) => {
  const [bioText, setBioText] = React.useState(Props.bioTextInit || '');
  const [currentBio, setCurrentBio] = React.useState('');
  const currentUser = useSelector((state: RootStore) => state.auth.user);
  const toast = useToast();

  const updateUserBio = async () => {
    let user = currentUser?.username;

    try {
      let bio = `${user}/mybio`;

      await uploadBio(bio, bioText);
      setBioText('');
      Keyboard.dismiss();
      toast.show('Bio has been updated.');
    } catch (error) {}
  };
  const uploadBio = (text: any, content: any) => {
    Auth.currentCredentials();
    return Storage.put(text, content, {
      level: 'public',
      contentType: 'text/plain'
    })
      .then((response: any) => {
        fetchText();
        return response.key;
      })
      .catch((error) => {
        return error.response;
      });
  };

  const changeBioHandler = (val: any) => {
    setBioText(val);
  };

  const fetchText = () => {
    let mybio = `${currentUser?.username}/mybio`;

    return Storage.get(mybio)
      .then((data: any) => {
        fetch(data)
          .then((r) => r.text())
          .then((text) => {
            setCurrentBio(text);
          })
          .catch((e) => console.log('error fetching text: ', e));
      })
      .catch((err) => console.log('error fetching from S3', err));
  };

  React.useEffect(() => {
    fetchText();
  }, []);

  return (
    <View style={styles.updateBioView}>
      <View>
        <Text style={styles.updateBioText}>Update bio</Text>
        <TextInput
          multiline={false}
          placeholder={currentBio}
          placeholderTextColor='#e1e1e1'
          onChangeText={changeBioHandler}
          value={bioText}
          style={styles.bioInput}
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

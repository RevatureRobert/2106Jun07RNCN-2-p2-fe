import React, { useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setError, signUp } from '../../redux/actions/AuthActions';
import { CreateUser } from '../../redux/actions/UserAPIActions';
import { RootStore } from '../../redux/store/store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';
import LoadingComponent from '../semantic/LoadingComponent';
import styles from './userstyles';
import { Storage, Auth } from 'aws-amplify';

// main sign out component that shows when user isnt logged in
const SignupComponent: React.FC = () => {
  // username, password, email, loading states
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const currentUser = useSelector((state: RootStore) => state.auth.user);

  // gets error from store
  const { error } = useSelector((state: RootStore) => state.auth);

  // init navigation and dispatch
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // checks if there is an error withauth
  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''));
      }
    };
  }, [error, dispatch]);

  // helper function called from uploadDefaultPicture()
  const fetchImageFromUri = async (uri: any) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  // upload default Profile picture on Signup
  const uploadDefaultPicture = async () => {
    try {
      let bioPicFile = `${username}/myimages`;
      let filename =
        'https://chirps-bucket-for-pics.s3.us-east-2.amazonaws.com/public/default/defaultUserImage.jpg';
      const img = await fetchImageFromUri(filename);
      await uploadPic(bioPicFile, img);
      console.log('bioPicF:', bioPicFile);
    } catch (error) {}
  };

  // helper function called from uploadDefaultPicture()
  const uploadPic = (file: any, content: any) => {
    Auth.currentCredentials();
    return Storage.put(file, content, {
      level: 'public',
      contentType: 'image/jpeg'
    })
      .then((response: any) => {
        return response.key;
      })

      .catch((error) => {
        return error.response;
      });
  };

  const uploadDefaultBio = async () => {
    // let user = currentUser?.username;

    try {
      let bioText = 'Please update your bio';
      let bio = `${username}/mybio`;

      await uploadBio(bio, bioText);
    } catch (error) {}
  };

  const uploadBio = (file: any, content: any) => {
    Auth.currentCredentials();
    return Storage.put(file, content)
      .then((response: any) => {
        return response.key;
      })

      .catch((error) => {
        return error.response;
      });
  };

  // sign up button listener
  const onSubmitData = (e: GestureResponderEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      signUp({ username, password, attributes: { email } }, () =>
        setLoading(false)
      )
    );

    dispatch(
      CreateUser({
        username: username,
        bio: 'bio.'
      })
    );
    uploadDefaultBio();
    uploadDefaultPicture();
    navigation.navigate('login');
  };

  // checks if component is loading, displays loadingcomponent
  if (loading === true) {
    return <LoadingComponent />;
  } else {
    // returns sign up form
    return (
      <KeyboardAvoidingView
        style={styles.signInView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar backgroundColor='#111111' barStyle='light-content' />
        {/* chirper logo and text */}
        <View
          style={{
            flexDirection: Platform.OS === 'web' ? null : 'row',
            alignItems: Platform.OS === 'web' ? null : 'center'
          }}
        >
          <Image
            source={require('../../assets/chirperIcon.png')}
            style={{
              height: 48,
              marginBottom: 10
            }}
            resizeMode='contain'
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 22,
              fontWeight: '700',
              textAlign: Platform.OS === 'web' ? 'center' : null
            }}
          >
            Sign up for chirper
          </Text>
        </View>
        {/* main form */}
        <TextInput
          placeholder='Username'
          placeholderTextColor='#dfdfdf'
          onChangeText={(inputName) => setUsername(inputName)}
          style={styles.input}
          autoCapitalize='none'
        />
        <TextInput
          placeholder='Email'
          placeholderTextColor='#dfdfdf'
          onChangeText={(inputEmail) => setEmail(inputEmail)}
          style={styles.input}
        />
        <TextInput
          placeholder='Password'
          placeholderTextColor='#dfdfdf'
          secureTextEntry={true}
          onChangeText={(inputPassword) => setPassword(inputPassword)}
          style={styles.input}
        />
        {/* sign up button and login text */}
        <TouchableOpacity onPress={onSubmitData} style={styles.loginBtn}>
          <Text style={styles.loginText}>Sign up</Text>
          <MaterialCommunityIcons name='chevron-right' size={18} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <Text style={styles.signInText}>
            Already have an account? Log in.
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
};

export default SignupComponent;

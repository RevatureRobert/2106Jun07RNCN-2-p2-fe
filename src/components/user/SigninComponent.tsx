import React, { useEffect } from 'react';
import {
  TextInput,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setError, signIn } from '../../redux/actions/AuthActions';
import { RootStore } from '../../redux/store/store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';
import LoadingComponent from '../semantic/LoadingComponent';
import styles from './userstyles';
import { Storage, Auth } from 'aws-amplify';

// main sign in component that shows when user isnt logged in
const SigninComponent: React.FC = () => {
  // defines username, password, and loading states for input
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const currentUser = useSelector((state: RootStore) => state.auth.user);

  // gets error from state
  const { error } = useSelector((state: RootStore) => state.auth);
  // init navigation and dispatch
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // checks if there is an error with auth
  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''));
      }
      // uploadDefaultPicture();
      setUsername('');
      setPassword('');
      setLoading(false);
    };
  }, [error, dispatch]);

  // const fetchImage = async () => {
  //   let filename = `${username}/myimages`;
  //   const signUrl: any = await Storage.get(filename);
  //   return signUrl;

  //   // setImage(signUrl);
  // };

  const fetchImage = () => {
    let img = '';

    return Storage.get(img)
      .then((data: any) => {
        fetch(data)
          .then((r) => r.blob())
          .then((image) => {
            return image;
          })
          .catch((e) => console.log('error fetching text: ', e));
      })
      .catch((err) => console.log('error fetching from S3', err));
  };

  const uploadDefaultPicture = async () => {
    // let user = currentUser?.username;

    try {
      let bioText = fetchImage();
      let bio = `${username}/myimages`;
      await uploadBio(bio, bioText);
    } catch (error) {}
  };

  const uploadDefaultBio = async () => {
    // let user = currentUser?.username;

    try {
      let bioText = 'Please update your bio';
      let bio = `${username}/mybio`;
      console.log('BIO TEXT: ', bio);
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

  // log in button listener
  const onSubmitData = (e: GestureResponderEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(signIn({ username, password }, () => setLoading(false)));
    uploadDefaultBio();
    uploadDefaultPicture();
  };

  // checks if component is loading, displays loadingcomponent
  if (loading === true) {
    return <LoadingComponent />;
  } else {
    // returns sign in form
    return (
      <KeyboardAvoidingView
        style={styles.signInView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar backgroundColor='#111111' barStyle='light-content' />
        {/* chirper logo */}
        <Image
          source={require('../../assets/chirperLogo.png')}
          style={{
            height: 48,
            alignSelf: 'center',
            marginBottom: 10
          }}
          resizeMode='contain'
        />
        {/* main form */}
        <TextInput
          placeholder='Username'
          placeholderTextColor='#dfdfdf'
          onChangeText={(inputName) => setUsername(inputName)}
          style={styles.input}
          autoCapitalize='none'
        />
        <TextInput
          placeholder='Password'
          placeholderTextColor='#dfdfdf'
          secureTextEntry={true}
          onChangeText={(inputPassword) => setPassword(inputPassword)}
          style={styles.input}
        />
        {/* log in button and sign up text */}
        <TouchableOpacity onPress={onSubmitData} style={styles.loginBtn}>
          <Text style={styles.loginText}>Log in</Text>
          <MaterialCommunityIcons name='chevron-right' size={18} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
          <Text style={styles.signInText}>No account? Sign up.</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
};

export default SigninComponent;

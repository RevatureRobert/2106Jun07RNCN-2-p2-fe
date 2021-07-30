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
import passwordValidator from 'password-validator';

// main sign in component that shows when user isnt logged in
const SigninComponent: React.FC = () => {
  // defines username, password, and loading states for input
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const [isPassValid, setIsPassValid] = React.useState(false);
  const [isUserValid, setIsUserValid] = React.useState(false);

  const checkPass = (attemptedPass: string) => {
    const schema = new passwordValidator();
    schema
      .is()
      .min(8)
      .is()
      .max(30)
      .has()
      .digits()
      .has()
      .lowercase()
      .has()
      .uppercase()
      .has()
      .symbols()
      .has()
      .not()
      .spaces();
    setIsPassValid(schema.validate(attemptedPass) as boolean);
  };

  const checkName = async (attemptedName: string) => {
    const schema = new passwordValidator();
    schema
      .is()
      .min(3)
      .is()
      .max(30)
      .has()
      .lowercase()
      .has()
      .not()
      .uppercase()
      .has()
      .not()
      .symbols()
      .has()
      .not()
      .spaces();
    setIsUserValid(schema.validate(attemptedName) as boolean);
  };

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
      setUsername('');
      setPassword('');
      setLoading(false);
    };
  }, [error, dispatch]);

  // log in button listener
  const onSubmitData = (e: GestureResponderEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(signIn({ username, password }, () => setLoading(false)));
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
            marginBottom: 10,
            ...Platform.select({
              ios: {
                alignSelf: 'center'
              },
              android: {
                alignSelf: 'center'
              }
            })
          }}
          resizeMode='contain'
        />
        {/* main form */}
        <TextInput
          placeholder='Username (lowercase, numbers only)'
          placeholderTextColor='#dfdfdf'
          onChangeText={(inputName) => {
            setUsername(inputName);
            checkName(inputName);
          }}
          style={{
            ...styles.input,
            color: isUserValid ? '#71FF97' : '#FF5555'
          }}
          autoCapitalize='none'
        />
        <TextInput
          placeholder='Password'
          placeholderTextColor='#dfdfdf'
          secureTextEntry={true}
          onChangeText={(inputPassword) => {
            setPassword(inputPassword);
            checkPass(inputPassword);
          }}
          style={{
            ...styles.input,
            color: isPassValid ? '#71FF97' : '#FF5555'
          }}
        />
        {/* log in button and sign up text */}
        <TouchableOpacity
          onPress={onSubmitData}
          style={styles.loginBtn}
          disabled={!isPassValid || !isUserValid}
        >
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

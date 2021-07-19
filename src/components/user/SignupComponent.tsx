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
<<<<<<< HEAD
  Platform
=======
  Platform,
  StatusBar,
>>>>>>> 422c11c2294df6a34887c9e38b7a5b4c6fc6cbf5
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setError, signUp } from '../../redux/actions/AuthActions';
import { CreateUser } from '../../redux/actions/UserAPIActions';
import { RootStore } from '../../redux/store/store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';
import LoadingComponent from '../semantic/LoadingComponent';
import styles from './userstyles';

// main sign out component that shows when user isnt logged in
const SignupComponent: React.FC = () => {
  // username, password, email, loading states
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../../assets/chirperIcon.png')}
            style={{
              height: 48,
              marginBottom: 10
            }}
            resizeMode='contain'
          />
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: '700' }}>
            Sign up for chirper
          </Text>
        </View>
        {/* main form */}
        <TextInput
          placeholder='Username'
          placeholderTextColor='#dfdfdf'
          onChangeText={(inputName) => setUsername(inputName)}
          style={styles.input}
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

<<<<<<< HEAD
const styles = StyleSheet.create({
  signInView: {
    backgroundColor: '#141414',
    padding: 15,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },

  input: {
    color: '#1b1b1b',
    backgroundColor: '#222',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 15,
    padding: 10
  },

  loginBtn: {
    padding: 15,
    marginTop: 22,
    borderRadius: 15,
    backgroundColor: '#f3f3f3',
    flexDirection: 'row',

    justifyContent: 'space-between'
  },

  loginText: {
    fontWeight: '700'
  },

  signInText: {
    alignSelf: 'center',
    color: '#dfdfdf',
    marginTop: 22
  }
});

=======
>>>>>>> 422c11c2294df6a34887c9e38b7a5b4c6fc6cbf5
export default SignupComponent;

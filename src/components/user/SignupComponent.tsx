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
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setError, signUp } from '../../redux/actions/AuthActions';
import { CreateUser } from '../../redux/actions/UserAPIActions';
import { RootStore } from '../../redux/store/store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoadingComponent from '../semantic/LoadingComponent';

type RootStackParamList = {
  home: undefined;
  compose: undefined;
  chirp: undefined;
  login: undefined;
  signup: undefined;
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'signup'>;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'signup'
>;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const SignupComponent: React.FC<Props> = ({ navigation, route }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { error } = useSelector((state: RootStore) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''));
      }
    };
  }, [error, dispatch]);
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
        bio: 'bio.',
      })
    );

    navigation.navigate('login');
  };

  if (loading === true) {
    return <LoadingComponent />;
  } else {
    return (
      <KeyboardAvoidingView
        style={styles.signInView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../../assets/chirperIcon.png')}
            style={{
              height: 48,
              marginBottom: 10,
            }}
            resizeMode='contain'
          />
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: '700' }}>
            Sign up for chirper
          </Text>
        </View>
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
        {/* </View> */}
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

const styles = StyleSheet.create({
  signInView: {
    backgroundColor: '#141414',
    padding: 15,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },

  input: {
    color: '#1b1b1b',
    backgroundColor: '#222',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 15,
    padding: 10,
  },

  loginBtn: {
    padding: 15,
    marginTop: 22,
    borderRadius: 15,
    backgroundColor: '#f3f3f3',
    flexDirection: 'row',

    justifyContent: 'space-between',
  },

  loginText: {
    fontWeight: '700',
  },

  signInText: {
    alignSelf: 'center',
    color: '#dfdfdf',
    marginTop: 22,
  },
});

export default SignupComponent;

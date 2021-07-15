import React, { FormEvent, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  StatusBar,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setError, signIn } from '../Redux/actions/AuthActions';
import { RootStore } from '../Redux/store/store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  home: undefined;
  compose: undefined;
  chirp: undefined;
  login: undefined;
  signup: undefined;
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'login'>;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'login'
>;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const SigninComponent: React.FC<Props> = ({ route, navigation }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
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
  const onSubmitData = async (e: GestureResponderEvent) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(signIn({ username, password }, () => setLoading(false)));
    console.log(username);
    console.log(password);
  };

  return (
    <SafeAreaView style={styles.signInView}>
      <StatusBar backgroundColor='#111111' barStyle='light-content' />
      <Image
        source={require('../assets/chirperLogo.png')}
        style={{
          height: 48,
          alignSelf: 'center',
          marginBottom: 10,
        }}
        resizeMode='contain'
      />
      <TextInput
        placeholder='Username'
        placeholderTextColor='#dfdfdf'
        onChangeText={(name) => setUsername(name)}
        style={styles.input}
      />
      <TextInput
        placeholder='Password'
        placeholderTextColor='#dfdfdf'
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        style={styles.input}
      />
      <TouchableOpacity onPress={onSubmitData} style={styles.loginBtn}>
        <Text style={styles.loginText}>Log in</Text>
        <MaterialCommunityIcons name='chevron-right' size={18} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('signup')}>
        <Text style={styles.signInText}>No account? Sign up.</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  signInView: {
    backgroundColor: '#111',
    padding: 15,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },

  input: {
    color: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 15,
    padding: 10,
  },

  loginBtn: {
    padding: 15,
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',

    justifyContent: 'space-between',
  },

  loginText: {
    fontWeight: '700',
  },

  signInText: {
    alignSelf: 'center',
    color: '#dfdfdf',
    marginTop: 10,
  },
});

export default SigninComponent;

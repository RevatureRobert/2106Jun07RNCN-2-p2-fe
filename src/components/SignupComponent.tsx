import React, { FormEvent, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setError, signUp } from '../Redux/actions/AuthActions';
import { CreateUser } from '../Redux/actions/UserAPIActions';
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
  const onSubmitData = async (e: GestureResponderEvent) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(
      signUp({ username, password, attributes: { email } }, () =>
        setLoading(false)
      )
    );

    await dispatch(
      CreateUser({
        username: username,
        bio: 'bio.',
      })
    );
  };

  return (
    <SafeAreaView style={styles.signInView}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('../assets/chirperIcon.png')}
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
        onChangeText={(name) => setUsername(name)}
        style={styles.input}
      />
      <TextInput
        placeholder='Email'
        placeholderTextColor='#dfdfdf'
        onChangeText={(email) => setEmail(email)}
        style={styles.input}
      />
      <TextInput
        placeholder='Password'
        placeholderTextColor='#dfdfdf'
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        style={styles.input}
      />
      {/* </View> */}
      <TouchableOpacity onPress={onSubmitData} style={styles.loginBtn}>
        <Text style={styles.loginText}>Sign up</Text>
        <MaterialCommunityIcons name='chevron-right' size={18} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('signup')}>
        <Text style={styles.signInText}>Already have an account? Log in.</Text>
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

export default SignupComponent;

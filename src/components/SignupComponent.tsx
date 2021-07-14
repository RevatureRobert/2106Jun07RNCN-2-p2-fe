import React, { FormEvent, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  GestureResponderEvent
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setError, signUp } from '../Redux/actions/AuthActions';
import { CreateUser } from '../Redux/actions/UserAPIActions';
import { RootStore } from '../Redux/store/store';

const SignupComponent: React.FC = () => {
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
  const onSubmtData = async (e: GestureResponderEvent) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(
      signUp({ username, password, attributes: { email } }, () =>
        setLoading(false)
      )
    );
    console.log(email);
    console.log(username);
    console.log(password);

    await dispatch(
      CreateUser({
        username: username,
        bio: 'bio.'
      })
    );
  };

  return (
    <View>
      <TextInput
        placeholder="Username."
        placeholderTextColor="#003f5c"
        onChangeText={(name) => setUsername(name)}
      />
      <TextInput
        placeholder="Email."
        placeholderTextColor="#003f5c"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="Password."
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      {/* </View> */}
      <Button title="Sign up" onPress={onSubmtData} />
    </View>
  );
};

const styles = StyleSheet.create({
  style: {
    backgroundColor: '#111'
  }
});

export default SignupComponent;

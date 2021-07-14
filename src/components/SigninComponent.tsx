import React, { FormEvent, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  GestureResponderEvent
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setError, signIn } from '../Redux/actions/AuthActions';
import { RootStore } from '../Redux/store/store';

const SigninComponent: React.FC = () => {
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
  const onSubmtData = async (e: GestureResponderEvent) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(signIn({ username, password }, () => setLoading(false)));
    console.log(username);
    console.log(password);
  };

  return (
    <View>
      {/* <View> */}
      <TextInput
        placeholder="Username."
        placeholderTextColor="#003f5c"
        onChangeText={(name) => setUsername(name)}
      />

      <TextInput
        placeholder="Password."
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button title="Sign in" onPress={onSubmtData} />
    </View>
  );
};

const styles = StyleSheet.create({
  style: {
    backgroundColor: '#111'
  }
});

export default SigninComponent;

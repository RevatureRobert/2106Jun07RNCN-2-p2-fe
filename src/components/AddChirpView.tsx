import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootStore } from '../Redux/store/store';
import HeaderComponent from './HeaderComponent';
import { ImageUploader } from './ImageUploader';

const AddChirpView: React.FC = () => {
  const [inputState, setInputState] = React.useState('');
  const currentUser = useSelector((state: RootStore) => state.auth);
  const placeholder = `Posting as @${currentUser.user?.username}`;

  return (
    <KeyboardAvoidingView
      style={styles.MainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.AddChirpViewContainer}>
        <HeaderComponent
          currentView='addChirp'
          newChirp={{
            username: currentUser.user ? currentUser.user?.username : '',
            body: inputState,
            timestamp: Date.now().toString()
          }}
        />
        <View style={styles.AddChirpContent}>
          <Image
            source={require('../assets/defaultUserImage.png')}
            style={{ width: 48, height: 48, borderRadius: 72 / 2 }}
          ></Image>
          <TextInput
            multiline={true}
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor='#dfdfdf'
            // inputState has to be redeclared as a prop for some reason.
            // eslint-disable-next-line
            onChangeText={(inputState) => {
              setInputState(inputState);
            }}
            value={inputState}
          />
        </View>
        <View style={styles.BottomLine}>
          <Text
            style={[
              styles.Count,
              inputState.length > 225 ? { color: '#D4B16A' } : null,
              inputState.length > 281 ? { color: '#D46A6A' } : null
            ]}
          >
            {inputState.length}/281
          </Text>
          <ImageUploader />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  AddChirpViewContainer: {
    color: '#fff',
    flex: 1,
    flexDirection: 'column'
  },

  AddChirpContent: {
    backgroundColor: '#080808',
    color: '#fff',
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 25
  },

  input: {
    color: '#fff',
    padding: 25,
    borderWidth: 1,
    marginLeft: 12,
    borderColor: '#333',
    textAlign: 'left',
    borderRadius: 15,
    textAlignVertical: 'top',
    flex: 1,
    paddingTop: 25
  },

  BottomLine: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 90,
    marginRight: 30,
    marginTop: -10
  },

  Button: {},

  Count: {
    color: '#ccc'
  },

  MainContainer: {
    flex: 1,
    ...Platform.select({
      ios: { paddingTop: 50 },
      android: { paddingTop: 15 }
    }),
    backgroundColor: '#080808'
  }
});

export default AddChirpView;

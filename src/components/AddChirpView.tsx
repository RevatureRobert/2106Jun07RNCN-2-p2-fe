import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComponent from './HeaderComponent';

const AddChirpView: React.FC = () => {
  const [inputState, setInputState] = React.useState('');
  return (
    <SafeAreaView style={styles.MainContainer}>
      <View style={styles.AddChirpViewContainer}>
        <HeaderComponent
          currentView='addChirp'
          newChirp={{
            username: 'redoral',
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
            placeholder='Posting as @redoral'
            placeholderTextColor='#dfdfdf'
            // inputState has to be redeclared as a prop for some reason.
            // eslint-disable-next-line
            onChangeText={(inputState) => {
              setInputState(inputState);
            }}
            value={inputState}
          />
          <TouchableOpacity>
            <View style={styles.Button}>
              <Text>📎</Text>
            </View>
          </TouchableOpacity>
          <Text
            style={[
              styles.Count,
              inputState.length > 225 ? { color: '#D4B16A' } : null,
              inputState.length > 281 ? { color: '#D46A6A' } : null
            ]}
          >
            {inputState.length}/281
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AddChirpViewContainer: {
    backgroundColor: '#111',
    color: '#fff',
    flex: 1,
    flexDirection: 'column'
  },

  AddChirpContent: {
    backgroundColor: '#080808',
    color: '#fff',
    flex: 1,
    flexDirection: 'row',
    padding: 25
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
    height: '50%'
  },

  Button: {
    position: 'absolute',
    top: '51%',
    right: 10
  },

  Count: {
    color: '#ccc',
    position: 'absolute',
    top: '54.5%',
    left: 100
  },

  MainContainer: {
    flex: 1
  }
});

export default AddChirpView;

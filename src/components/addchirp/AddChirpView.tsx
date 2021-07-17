import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootStore } from '../../redux/store/store';
import HeaderComponent from '../semantic/HeaderComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AddChirpView: React.FC = () => {
  const [inputState, setInputState] = React.useState('');
  const currentUser = useSelector((state: RootStore) => state.auth);
  const placeholder = `Posting as @${currentUser.user?.username}`;

  return (
    <SafeAreaView style={styles.MainContainer}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.AddChirpViewContainer}>
          <HeaderComponent
            currentView='addChirp'
            newChirp={{
              username: currentUser.user ? currentUser.user?.username : '',
              body: inputState,
              timestamp: Date.now().toString(),
            }}
          />
          <View style={styles.AddChirpContent}>
            <Image
              source={require('../../assets/defaultUserImage.png')}
              style={{ width: 48, height: 48, borderRadius: 72 / 2 }}
            ></Image>
            <TextInput
              multiline={true}
              style={styles.input}
              placeholder={placeholder}
              placeholderTextColor='#e1e1e1'
              // inputState has to be redeclared as a prop for some reason.
              // eslint-disable-next-line
              onChangeText={(input) => {
                setInputState(input);
              }}
              value={inputState}
            />
          </View>
          <View style={styles.BottomLine}>
            <Text
              style={[
                styles.Count,
                inputState.length > 225 ? { color: '#D4B16A' } : null,
                inputState.length > 281 ? { color: '#D46A6A' } : null,
              ]}
            >
              {inputState.length}/281
            </Text>
            <TouchableOpacity>
              <View style={styles.Button}>
                <MaterialCommunityIcons
                  name='image-outline'
                  size={30}
                  color='#e1e1e1'
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AddChirpViewContainer: {
    color: '#f3f3f3',
    flex: 1,
    flexDirection: 'column',
  },

  AddChirpContent: {
    backgroundColor: '#141414',
    color: '#f3f3f3',
    flex: 0.75,
    flexDirection: 'row',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 25,
    paddingBottom: 0,
    marginBottom: 0,
  },

  input: {
    color: '#f3f3f3',
    padding: 25,
    borderWidth: 1,
    backgroundColor: '#1b1b1b',
    marginLeft: 12,
    borderColor: '#1b1b1b',
    textAlign: 'left',
    borderRadius: 15,
    textAlignVertical: 'top',
    fontSize: 16,
    flex: 1,
    paddingTop: 25,
  },

  BottomLine: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginLeft: 90,
    marginRight: 30,
    paddingTop: 5,
  },

  Button: {},

  Count: {
    color: '#e1e1e1',
  },

  MainContainer: {
    flex: 1,
    backgroundColor: '#141414',
  },

  keyboardAvoidingView: {
    flex: 1,
  },
});

export default AddChirpView;

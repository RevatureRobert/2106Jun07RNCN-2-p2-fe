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
import styles from './addchirpstyles';
import { ImageUploadComponent } from './ImageUploadComponent';

// the main screen for posting a new chirp
const AddChirpView: React.FC = () => {
  // sets input state as a listener, gets current logged in user, sets placeholder dynamically
  const [inputState, setInputState] = React.useState('');
  const [imageURL, setImageURL] = React.useState('');
  const currentUser = useSelector((state: RootStore) => state.auth);
  const placeholder = `Posting as @${currentUser.user?.username}`;

  return (
    <SafeAreaView style={styles.MainContainer}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.AddChirpViewContainer}>
          {/* passes input value, current username, and current timestamp to headerComponent
              which holds the function for posting a chirp */}
          <HeaderComponent
            currentView='addChirp'
            newChirp={{
              userImg: `https://chirps-bucket-for-pics.s3.us-east-2.amazonaws.com/public/${currentUser.user?.username}/myimages`,
              username: currentUser.user ? currentUser.user?.username : '',
              body: inputState,
              timestamp: Date.now().toString(),
              media: imageURL,
            }}
          />
          {/* main view for posting that includes user image and textbox */}
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
          {/* counter for length of input */}
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
            {/* add image to chirp button */}
            <ImageUploadComponent
              imageURL={imageURL}
              setImageURL={setImageURL}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddChirpView;

import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { PostChirp } from '../../redux/actions/ChirpActions';
import { useToast } from 'react-native-toast-notifications';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../redux/store/store';
import styles from './semanticstyles';
import { TextInput } from 'react-native-gesture-handler';

interface Props {
  currentView: string;
  newChirp: {
    userImg: string;
    username: string;
    body: string;
    timestamp: string;
    media?: string;
  };
  setSearchValue?: any;
}

// main header component, displayed on top of app
const HeaderComponent: React.FC<Props> = (Props) => {
  // initializes navigation and toast library
  const [inputState, setInputState] = React.useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();

  // gets the current user from the store
  const user = useSelector((state: RootStore) => state.auth);

  // post chirp function for when in AddChirpView
  function postChirp() {
    dispatch(PostChirp(Props.newChirp));
    toast.show('Chirp has been added.');
    navigation.goBack();
  }

  function searchBtn() {
    Props.setSearchValue(inputState);
  }

  // checks currentView
  switch (Props.currentView) {
    // displays back button and add chirp button
    case 'addChirp':
      return (
        <View style={styles.headerContainer}>
          <TouchableHighlight
            underlayColor='#111'
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name='keyboard-backspace'
              color='#fff'
              size={24}
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={postChirp}
            style={styles.button}
            disabled={
              Props.newChirp.body.length > 281 ||
              Props.newChirp.body.length < 1 ||
              Props.newChirp.media ===
                'https://chirps-bucket-for-pics.s3.us-east-2.amazonaws.com/public/default/paddedPreloader.gif'
            }
          >
            <Text style={styles.buttonText}>Post</Text>
          </TouchableHighlight>
        </View>
      );
    // displays current logged in user and chirper logo
    case 'singleChirp':
      return (
        <View style={styles.headerContainer}>
          <TouchableHighlight
            underlayColor='#111'
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name='keyboard-backspace'
              color='#fff'
              size={24}
            />
          </TouchableHighlight>
        </View>
      );
    case 'search':
      return (
        <View style={styles.headerContainer}>
          <TextInput
            style={styles.input}
            placeholder='Search by username or chirp'
            placeholderTextColor='#e1e1e1'
            // inputState has to be redeclared as a prop for some reason.
            // eslint-disable-next-line
            onChangeText={(input: string) => {
              setInputState(input);
            }}
            value={inputState}
          />
          <TouchableHighlight
            underlayColor='#1b1b1b'
            onPress={() => searchBtn()}
            style={{
              marginBottom: 4,
              backgroundColor: '#f3f3f3',
              padding: 6,
              borderRadius: 32,
              alignItems: 'center',
              width: 64,
            }}
          >
            <MaterialCommunityIcons name='magnify' color='#141414' size={20} />
          </TouchableHighlight>
        </View>
      );
    case 'settings':
      return (
        <View style={styles.headerContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableHighlight
              underlayColor='#111'
              onPress={() => navigation.goBack()}
            >
              <MaterialCommunityIcons
                name='keyboard-backspace'
                color='#fff'
                size={24}
              />
            </TouchableHighlight>
            <Text
              style={{
                color: '#fff',
                paddingRight: 15,
                fontWeight: '700',
                fontSize: 18,
                alignSelf: 'center',
                textAlign: 'center',
                flex: 1,
              }}
            >
              Settings
            </Text>
          </View>
        </View>
      );
    default:
      return (
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{
                uri: user.user?.picture + '?' + new Date(),
              }}
              style={{ width: 24, height: 24, borderRadius: 24 / 2 }}
              testID='pfp'
            ></Image>
            <Text
              style={{ color: '#e1e1e1', paddingLeft: 8, fontWeight: 'bold' }}
            >
              @{user.user?.username}
            </Text>
          </View>
          <Image
            source={require('../../assets/chirperIcon.png')}
            style={{
              width: 24,
              height: 24,
              marginLeft: 200,
              marginTop: 6,
              marginBottom: 8,
            }}
          />
        </View>
      );
  }
};

export default HeaderComponent;

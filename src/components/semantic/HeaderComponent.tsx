import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { PostChirp } from '../../redux/actions/ChirpActions';
import { useToast } from 'react-native-toast-notifications';
import { useSelector } from 'react-redux';
import { RootStore } from '../../redux/store/store';

interface Props {
  currentView: string;
  newChirp: {
    username: string;
    body: string;
    timestamp: string;
  };
}

const HeaderComponent: React.FC<Props> = (Props) => {
  const navigation = useNavigation();
  const toast = useToast();

  const user = useSelector((state: RootStore) => state.auth);

  async function postChirp() {
    const chirp = await PostChirp(Props.newChirp);
    toast.show(chirp);
    navigation.goBack();
  }

  switch (Props.currentView) {
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
            disabled={Props.newChirp.body.length > 281}
          >
            <Text style={styles.buttonText}>Post</Text>
          </TouchableHighlight>
        </View>
      );
    case 'userView':
      return <></>;
    default:
      return (
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../../assets/defaultUserImage.png')}
              style={{ width: 24, height: 24, borderRadius: 24 / 2 }}
            ></Image>
            <Text style={{ color: '#fff', paddingLeft: 8, fontWeight: 'bold' }}>
              @{user.user?.username}
            </Text>
          </View>
          <Image
            source={require('../../assets/chirperLogo.png')}
            style={{ width: 90, height: 24 }}
          />
        </View>
      );
  }
};

const styles = StyleSheet.create({
  headerContainer: {
    textAlign: 'center',
    backgroundColor: '#111',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },

  button: {
    backgroundColor: '#fff',
    padding: 8,
    width: 80,
    borderRadius: 50,
  },

  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default HeaderComponent;

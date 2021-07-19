import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { RootStore } from '../../redux/store/store';
import { LikeChirp, UnlikeChirp } from '../../redux/actions/ChirpActions';
import styles from './chirpstyles';
import { useNavigation } from '@react-navigation/native';

interface Props {
  username: string;
  body: string;
  comments: string[];
  likes: string[];
  media?: string;
  timestamp: string;
}

// component that structures and defines the text per chirp in the list
const ChirpItemComponent: React.FC<Props> = (Props) => {
  // gets current logged in user
  const currentUser = useSelector((state: RootStore) => state.auth.user);
  const navigation = useNavigation();

  // default state for liking to be used to update when liking/unliking a chirp
  const [likeState, setLikeState] = React.useState({
    isLiked: false,
    icon: 'heart-outline',
    color: '#e1e1e1',
    count: Props.likes.length - 1,
  });

  // checks if user has already liked the chirp
  React.useEffect(() => {
    if (
      Props.likes.includes(currentUser?.username ? currentUser.username : '')
    ) {
      setLikeState({
        isLiked: true,
        icon: 'heart',
        color: '#f42f42',
        count: Props.likes.length - 1,
      });
    }
  }, []);

  // function for clicking on the like button
  async function toggleLike() {
    // checks if the chirp is liked, sets function to unlike when button is clicked, updates state
    if (likeState.isLiked === true) {
      setLikeState({
        isLiked: false,
        icon: 'heart-outline',
        color: '#e1e1e1',
        count: Props.likes.length - 1,
      });

      UnlikeChirp(
        Props.timestamp,
        currentUser?.username ? currentUser.username : ''
      );
      // checks if the chirp is not liked, sets function to unlike when button is clicked, updates state
    } else if (likeState.isLiked === false) {
      setLikeState({
        isLiked: true,
        icon: 'heart',
        color: '#f42f42',
        count: Props.likes.length,
      });

      LikeChirp(
        Props.timestamp,
        currentUser?.username ? currentUser.username : ''
      );
    }
  }

  // main return statement
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('chirp', Props);
      }}
      style={styles.chirpItem}
    >
      {/* user image */}
      <View>
        <Image
          source={require('../../assets/defaultUserImage.png')}
          style={{ width: 52, height: 52, borderRadius: 52 / 2 }}
        ></Image>
      </View>
      {/* main chirp content, displays username, chirp body, timestamp, and like button */}
      <View style={styles.chirpContent}>
        <Text style={styles.chirpUser}>@{Props.username}</Text>
        <Text style={styles.chirpBody}>{Props.body}</Text>
        {/* checks if chirp has an image */}
        {Props.media ? (
          <Image
            source={{ uri: Props.media }}
            style={{
              height: 250,
              marginTop: 10,
              marginBottom: 10,
              borderRadius: 15,
            }}
            resizeMode='cover'
          />
        ) : null}
        <Text style={styles.chirpTimestamp}>
          {new Date(Number(Props.timestamp)).toLocaleString()}
        </Text>
        <Pressable
          onPress={toggleLike}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons
            name={likeState.icon}
            color={likeState.color}
            size={20}
            style={{ paddingTop: 5 }}
          ></MaterialCommunityIcons>
          <Text style={{ color: '#e1e1e1', paddingLeft: 5 }}>
            {likeState.count}
          </Text>
        </Pressable>
      </View>
      <View style={{ alignContent: 'center' }}>
        <MaterialCommunityIcons
          name='dots-horizontal'
          size={20}
          color={'#ededed'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ChirpItemComponent;

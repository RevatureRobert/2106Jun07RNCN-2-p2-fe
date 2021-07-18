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

interface Props {
  username: string;
  body: string;
  comments: string[];
  likes: string[];
  media?: string;
  timestamp: string;
}

const ChirpItemComponent: React.FC<Props> = (Props) => {
  const currentUser = useSelector((state: RootStore) => state.auth.user);
  let isLiked = false;

  if (Props.likes.includes(currentUser?.username ? currentUser.username : '')) {
    isLiked = true;
  }

  const [likeState, setLikeState] = React.useState({
    liked: isLiked,
    count: 0,
    icon: 'heart-outline',
    color: '#e1e1e1',
  });

  async function toggleLike() {
    if (likeState.liked === true) {
      isLiked = false;
      setLikeState({
        liked: isLiked,
        count: 0,
        icon: 'heart-outline',
        color: '#e1e1e1',
      });
      // function to unlike here
      console.log('Chirp has already been liked.');
    } else if (likeState.liked === false) {
      isLiked = true;
      setLikeState({
        liked: true,
        count: +1,
        icon: 'heart',
        color: '#f42f42',
      });
      // function to like here
    }
  }

  return (
    <TouchableOpacity onPress={() => null} style={styles.chirpItem}>
      <View>
        <Image
          source={require('../../assets/defaultUserImage.png')}
          style={{ width: 52, height: 52, borderRadius: 52 / 2 }}
        ></Image>
      </View>
      <View style={styles.chirpContent}>
        <Text style={styles.chirpUser}>@{Props.username}</Text>
        <Text style={styles.chirpBody}>{Props.body}</Text>
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
        <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center' }}>
          <Pressable onPress={toggleLike}>
            {likeState.liked === true ? (
              <MaterialCommunityIcons
                name='heart'
                color='#f42f42'
                size={20}
                style={{ paddingTop: 5 }}
              ></MaterialCommunityIcons>
            ) : (
              <MaterialCommunityIcons
                name='heart-outline'
                color='#e1e1e1'
                size={20}
                style={{ paddingTop: 5 }}
              ></MaterialCommunityIcons>
            )}
          </Pressable>
          <Text
            style={{ color: '#e1e1e1', alignSelf: 'center', paddingLeft: 5 }}
          >
            {Props.likes.length + likeState.count}
          </Text>
        </View>
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

const styles = StyleSheet.create({
  chirpItem: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#141414',
    borderBottomWidth: 1,
    borderBottomColor: '#1b1b1b',
    justifyContent: 'space-between',
  },

  chirpContent: {
    paddingLeft: 20,
    flex: 1,
  },

  chirpUser: {
    color: '#f3f3f3',
    fontWeight: '700',
    fontSize: 16,
  },

  chirpBody: {
    fontSize: 16,
    color: '#ffffff',
  },

  chirpTimestamp: {
    fontSize: 12,
    color: '#e1e1e1',
  },
});

export default ChirpItemComponent;

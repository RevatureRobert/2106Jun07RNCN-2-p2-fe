import React from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { RootStore } from '../../redux/store/store';
import { LikeChirp, UnlikeChirp } from '../../redux/actions/ChirpActions';
import ModalComponent from '../semantic/ModalComponent';
import styles from './chirpstyles';
import { useNavigation } from '@react-navigation/native';
import { formatTimestamp } from '../../shared/functions';
import ImageViewModal from '../semantic/ImageViewModal';

interface Props {
  userImg: string;
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
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isImgModalVisible, setImgModalVisible] = React.useState(false);
  const navigation = useNavigation();

  // set initial state for likes
  //  cant use redux on this one because we need a different one for each chirp
  const initialLikeState = {
    isLiked: false,
    icon: 'heart-outline',
    color: '#e1e1e1',
    count: Props.likes.length - 1,
  };

  // default state for liking to be used to update when liking/unliking a chirp
  const [likeState, setLikeState] = React.useState(initialLikeState);

  // checks if user has already liked the chirp
  React.useEffect(() => {
    if (
      Props.likes.includes(currentUser?.username ? currentUser.username : '')
    ) {
      setLikeState({
        isLiked: true,
        icon: 'heart',
        color: '#f42f42',
        count: likeState.count,
      });
    }

    // cleanup function
    return () => {
      setLikeState(initialLikeState);
    };
  }, []);

  // function for clicking on the like button
  function toggleLike() {
    // checks if the chirp is liked, sets function to unlike when button is clicked, updates state
    if (likeState.isLiked === true) {
      setLikeState({
        isLiked: false,
        icon: 'heart-outline',
        color: '#e1e1e1',
        count: likeState.count - 1,
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
        count: likeState.count + 1,
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
        navigation.navigate('chirp', {
          userImg: Props.userImg,
          username: Props.username,
          body: Props.body,
          comments: Props.comments,
          likes: Props.likes,
          media: Props.media,
          timestamp: Props.timestamp,
          likeState: likeState,
        });
      }}
      style={styles.chirpItem}
    >
      {/* user image */}
      <Pressable
        onPress={() => {
          navigation.navigate('user', {
            username: Props.username,
            currentUser: currentUser?.username,
          });
        }}
      >
        <Image
          source={{
            uri: Props.userImg + '?' + Date.now().toString(),
            cache: 'reload',
            headers: { Pragma: 'no-cache' },
          }}
          style={{ width: 52, height: 52, borderRadius: 52 / 2 }}
        ></Image>
      </Pressable>
      {/* main chirp content, displays username, chirp body, timestamp, and like button */}
      <View style={styles.chirpContent}>
        <Text style={styles.chirpUser}>@{Props.username}</Text>
        <Text style={styles.chirpBody}>{Props.body}</Text>
        {/* checks if chirp has an image */}
        {Props.media && Props.media !== '' ? (
          <Pressable onPress={() => setImgModalVisible(true)}>
            <Image
              source={{ uri: Props.media }}
              style={{
                height: 250,
                marginTop: 10,
                marginBottom: 10,
                borderRadius: 15,
              }}
            />
          </Pressable>
        ) : null}
        <Text style={styles.chirpTimestamp}>
          {formatTimestamp(new Date(Number(Props.timestamp)))}
        </Text>
        <Pressable
          onPress={toggleLike}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 50,
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
          <MaterialCommunityIcons
            name='comment-outline'
            color='#e1e1e1'
            size={20}
            style={{ paddingTop: 5, paddingLeft: 12 }}
          ></MaterialCommunityIcons>
          <Text style={{ color: '#e1e1e1', paddingLeft: 5 }}>
            {Props.comments.length}
          </Text>
        </Pressable>
      </View>
      <Pressable
        style={{ alignContent: 'center' }}
        onPress={() => setModalVisible(true)}
      >
        <MaterialCommunityIcons
          name='dots-horizontal'
          size={20}
          color={'#ededed'}
        />
      </Pressable>
      <ModalComponent
        modalType='chirp'
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        currentUser={currentUser?.username}
        chirpUser={Props.username}
        chirpTimestamp={Props.timestamp}
        cmtTimestamp=''
      />
      <ImageViewModal
        isModalVisible={isImgModalVisible}
        setModalVisible={setImgModalVisible}
        imgUrl={Props.media}
        username={Props.username}
        body={Props.body}
      />
    </TouchableOpacity>
  );
};

export default ChirpItemComponent;

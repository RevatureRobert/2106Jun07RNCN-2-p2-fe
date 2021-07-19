import React from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import styles from './chirpstyles';
import ChirpItemComponent from './ChirpItemComponent';
import HeaderComponent from '../semantic/HeaderComponent';
import ChirpRepliesComponent from '../replies/ChirpRepliesComponent';
import PostReplyComponent from '../replies/PostReplyComponent';

interface Props {
  route: {
    params: {
      username: string;
      body: string;
      comments: string[];
      likes: string[];
      media?: string;
      timestamp: string;
    };
  };
}

// view that displays one chirp
const SingleChirpView: React.FC<Props> = ({ route }) => {
  return (
    <SafeAreaView style={styles.chirpContainer}>
      <HeaderComponent
        currentView='singleChirp'
        newChirp={{ username: '', body: '', timestamp: '' }}
      />
      <ChirpItemComponent
        username={route.params.username}
        body={route.params.body}
        timestamp={route.params.timestamp}
        likes={route.params.likes}
        comments={route.params.comments}
      />
      <PostReplyComponent
        timestamp={route.params.timestamp}
        username={route.params.username}
      />
      <ChirpRepliesComponent
        username={route.params.username}
        timestamp={route.params.timestamp}
      />
    </SafeAreaView>
  );
};

export default SingleChirpView;

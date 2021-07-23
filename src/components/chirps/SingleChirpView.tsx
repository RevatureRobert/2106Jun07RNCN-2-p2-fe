import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, Platform } from 'react-native';
import styles from './chirpstyles';
import ChirpItemComponent from './ChirpItemComponent';
import HeaderComponent from '../semantic/HeaderComponent';
import ChirpRepliesComponent from '../replies/ChirpRepliesComponent';
import PostReplyComponent from '../replies/PostReplyComponent';

interface Props {
  route: {
    params: {
      userImg: string;
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
        newChirp={{ userImg: '', username: '', body: '', timestamp: '' }}
      />
      <ChirpItemComponent
        userImg={route.params.userImg}
        username={route.params.username}
        body={route.params.body}
        timestamp={route.params.timestamp}
        likes={route.params.likes}
        comments={route.params.comments}
        media={route.params.media}
      />
      <ChirpRepliesComponent
        username={route.params.username}
        timestamp={route.params.timestamp}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <PostReplyComponent
          timestamp={route.params.timestamp}
          username={route.params.username}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SingleChirpView;
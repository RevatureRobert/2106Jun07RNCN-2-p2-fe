import React from 'react';
import { View, TextInput, TouchableHighlight, Text } from 'react-native';
import styles from './repliesstyles';
import { PostComment } from '../../redux/actions/ChirpActions';
import { useSelector } from 'react-redux';
import { RootStore } from '../../redux/store/store';
import { useToast } from 'react-native-toast-notifications';

interface Props {
  timestamp: string;
  username: string;
}

const PostReplyComponent: React.FC<Props> = ({ timestamp, username }) => {
  const [inputState, setInputState] = React.useState('');
  const currentUser = useSelector((state: RootStore) => state.auth);
  const toast = useToast();

  async function postComment() {
    const comment = await PostComment(timestamp, username, [
      {
        userImg: `https://chirps-bucket-for-pics.s3.us-east-2.amazonaws.com/public/${currentUser.user?.username}/myimages`,
        username: currentUser.user ? currentUser.user.username : '',
        body: inputState,
        timestamp: Date.now().toString(),
      },
    ]);

    toast.show(comment);
  }

  return (
    <View style={styles.postReplyComponent}>
      <TextInput
        style={styles.input}
        placeholder='Comment on this chirp'
        placeholderTextColor='#e1e1e1'
        // inputState has to be redeclared as a prop for some reason.
        // eslint-disable-next-line
        onChangeText={(input: string) => {
          setInputState(input);
        }}
        value={inputState}
      />
      <TouchableHighlight style={styles.postReplyButton} onPress={postComment}>
        <Text style={styles.postReplyButtonText}>Post</Text>
      </TouchableHighlight>
    </View>
  );
};

export default PostReplyComponent;

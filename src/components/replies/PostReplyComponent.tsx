import React from 'react';
import { View, TextInput, TouchableHighlight, Text } from 'react-native';
import styles from './repliesstyles';

const PostReplyComponent: React.FC = () => {
  const [inputState, setInputState] = React.useState('');

  return (
    <View style={styles.postReplyComponent}>
      <TextInput
        style={styles.input}
        placeholder='Reply to this chirp'
        placeholderTextColor='#e1e1e1'
        // inputState has to be redeclared as a prop for some reason.
        // eslint-disable-next-line
        onChangeText={(input: string) => {
          setInputState(input);
        }}
        value={inputState}
      />
      <TouchableHighlight style={styles.postReplyButton}>
        <Text style={styles.postReplyButtonText}>Post</Text>
      </TouchableHighlight>
    </View>
  );
};

export default PostReplyComponent;

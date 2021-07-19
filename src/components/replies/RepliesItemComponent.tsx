import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './repliesstyles';

interface Props {
  username: string;
  body: string;
  timestamp: string;
}

// component that structures and defines the text per chirp in the list
const RepliesItemComponent: React.FC<Props> = (Props) => {
  // main return statement
  return (
    <View style={styles.chirpItem}>
      {/* user image */}
      <View>
        <Image
          source={require('../../assets/defaultUserImage.png')}
          style={{ width: 48, height: 48, borderRadius: 52 / 2 }}
        ></Image>
      </View>
      {/* main chirp content, displays username, chirp body, timestamp, and like button */}
      <View style={styles.chirpContent}>
        <Text style={styles.chirpUser}>@{Props.username}</Text>
        <Text style={styles.chirpBody}>{Props.body}</Text>
        <Text style={styles.chirpTimestamp}>
          {new Date(Number(Props.timestamp)).toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

export default RepliesItemComponent;

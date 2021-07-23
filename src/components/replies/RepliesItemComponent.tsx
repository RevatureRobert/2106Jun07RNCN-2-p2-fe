import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalComponent from '../semantic/ModalComponent';
import { useNavigation } from '@react-navigation/native';
import styles from './repliesstyles';

interface Props {
  userImg: string;
  username: string;
  body: string;
  timestamp: string;
  chirpTimestamp: string;
  currentUser: string;
}

// component that structures and defines the text per chirp in the list
const RepliesItemComponent: React.FC<Props> = (Props) => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const navigation = useNavigation();

  // main return statement
  return (
    <View style={styles.chirpItem}>
      <ModalComponent
        modalType='comment'
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        currentUser={Props.currentUser}
        chirpUser={Props.username}
        chirpTimestamp={Props.chirpTimestamp}
        cmtTimestamp={Props.timestamp}
      />
      {/* user image */}
      <Pressable
        onPress={() =>
          navigation.navigate('user', {
            username: Props.username,
            currentUser: Props.currentUser,
          })
        }
      >
        <Image
          source={{ uri: Props.userImg }}
          style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
        ></Image>
      </Pressable>
      {/* main chirp content, displays username, chirp body, timestamp, and like button */}
      <View style={styles.chirpContent}>
        <Text style={styles.chirpUser}>@{Props.username}</Text>
        <Text style={styles.chirpBody}>{Props.body}</Text>
        <Text style={styles.chirpTimestamp}>
          {new Date(Number(Props.timestamp)).toLocaleString()}
        </Text>
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
    </View>
  );
};

export default RepliesItemComponent;

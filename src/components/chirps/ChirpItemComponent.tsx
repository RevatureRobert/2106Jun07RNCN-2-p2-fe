import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

interface Props {
  username: string;
  body: string;
  media?: string;
  timestamp: string;
}

const ChirpItemComponent: React.FC<Props> = (Props) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('compose')}
      onLongPress={() => null}
      style={styles.chirpItem}
    >
      <View>
        <Image
          source={require('../assets/defaultUserImage.png')}
          style={{ width: 52, height: 52, borderRadius: 72 / 2 }}
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
        <Text style={styles.chirpTimestamp}>{Props.timestamp}</Text>
        <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center' }}>
          <MaterialCommunityIcons
            name='heart-outline'
            color='#ccc'
            size={20}
            style={{ paddingTop: 5 }}
          ></MaterialCommunityIcons>
          <Text style={{ color: '#ccc', alignSelf: 'center', paddingLeft: 5 }}>
            0
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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chirpItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#0f0f0f',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    justifyContent: 'space-between',
  },

  chirpContent: {
    paddingLeft: 20,
    flex: 1,
  },

  chirpUser: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },

  chirpBody: {
    fontSize: 16,
    color: '#FFFFFF',
  },

  chirpTimestamp: {
    fontSize: 12,
    color: '#dfdfdf',
  },
});

export default ChirpItemComponent;

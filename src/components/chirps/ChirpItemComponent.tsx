import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
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
    <TouchableOpacity
      onPress={() => navigation.navigate('compose')}
      onLongPress={() => null}
      style={styles.chirpItem}
    >
      <View>
        <Image
          source={require('../../assets/defaultUserImage.png')}
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
            color='#e1e1e1'
            size={20}
            style={{ paddingTop: 5 }}
          ></MaterialCommunityIcons>
          <Text
            style={{ color: '#e1e1e1', alignSelf: 'center', paddingLeft: 5 }}
          >
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

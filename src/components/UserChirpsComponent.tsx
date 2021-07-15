import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllChirps } from '../Redux/actions/ChirpActions';
import { GetUsersChirps } from '../Redux/actions/UserChirpActions';
import { RootStore } from '../Redux/store/store';
import { Store } from '../Redux/store/store';
import ChirpItemComponent from './ChirpItemComponent';

const UserChirpsComponent: React.FC = () => {
  const [isFetching, setIsFetching] = React.useState(false);
  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(GetUsersChirps('redoral'));
    setIsFetching(false);
  };

  const onRefresh = () => {
    setIsFetching(true);
    fetchData();
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const chirpsState = useSelector((state: RootStore) => state.userChirp);
  const renderItem = ({ item }: { item: any }) => (
    <ChirpItemComponent
      username={item.username}
      body={item.body}
      media={item.media ? item.media : undefined}
      timestamp={new Date(Number(item.timestamp)).toLocaleString()}
    />
  );

  return (
    <View style={styles.chirpsContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={chirpsState.userChirps?.sort((a, b) =>
          Number(a.timestamp) < Number(b.timestamp) ? 1 : -1
        )}
        renderItem={renderItem}
        onRefresh={onRefresh}
        refreshing={isFetching}
        keyExtractor={(item) => item.timestamp}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chirpsContainer: {
    flex: 1,
    backgroundColor: '#111',
  },

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

export default UserChirpsComponent;

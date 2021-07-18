import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllChirps } from '../../redux/actions/ChirpActions';
import { RootStore } from '../../redux/store/store';
import ChirpItemComponent from '../chirps/ChirpItemComponent';
import LoadingComponent from '../semantic/LoadingComponent';
import HeaderComponent from '../semantic/HeaderComponent';

const ChirpsComponent: React.FC = () => {
  const [isFetching, setIsFetching] = React.useState(false);
  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(GetAllChirps());
    setIsFetching(false);
  };

  const onRefresh = () => {
    setIsFetching(true);
    fetchData();
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const chirpsState = useSelector((state: RootStore) => state.chirps);
  const renderItem = ({ item }: { item: any }) => (
    <ChirpItemComponent
      username={item.username}
      body={item.body}
      comments={item.comments}
      likes={item.likes}
      media={item.media ? item.media : undefined}
      timestamp={item.timestamp}
    />
  );

  if (chirpsState.loading === true) {
    return (
      <>
        <HeaderComponent
          currentView='allChirps'
          newChirp={{
            username: '',
            body: '',
            timestamp: '',
            comments: [],
            likes: [],
          }}
        />
        <LoadingComponent />
      </>
    );
  } else {
    return (
      <View style={styles.chirpsContainer}>
        <HeaderComponent
          currentView='allChirps'
          newChirp={{
            username: '',
            body: '',
            timestamp: '',
            comments: [],
            likes: [],
          }}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={chirpsState.chirps?.sort((a, b) =>
            Number(a.timestamp) < Number(b.timestamp) ? 1 : -1
          )}
          renderItem={renderItem}
          onRefresh={onRefresh}
          refreshing={isFetching}
          keyExtractor={(item) => item.timestamp}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  chirpsContainer: {
    flex: 1,
    backgroundColor: '#111',
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

export default ChirpsComponent;

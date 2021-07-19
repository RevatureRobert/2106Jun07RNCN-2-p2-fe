import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllChirps, GetUsersChirps } from '../../redux/actions/ChirpActions';
import { RootStore } from '../../redux/store/store';
import ChirpItemComponent from '../chirps/ChirpItemComponent';
import LoadingComponent from '../semantic/LoadingComponent';
import HeaderComponent from '../semantic/HeaderComponent';
import styles from './chirpstyles';

// component that holds a list of all the chirps
const ChirpsComponent: React.FC = () => {
  const [isFetching, setIsFetching] = React.useState(false);
  const dispatch = useDispatch();

  // gets all chirps from the db
  const fetchData = () => {
    dispatch(GetAllChirps());
    setIsFetching(false);
  };

  // refresh function when pulling down on flatlist
  const onRefresh = () => {
    setIsFetching(true);
    fetchData();
  };

  // calls fetchdata once to populate on component load
  React.useEffect(() => {
    fetchData();
  }, []);

  // gets all chirps from the store, sends it to ChirpItemComponent as props
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

  // displays loading screen while chirps is fetching
  if (chirpsState.loading === true) {
    return (
      <>
        <HeaderComponent
          currentView='allChirps'
          newChirp={{
            username: '',
            body: '',
            timestamp: '',
<<<<<<< HEAD
            comments: [],
            likes: []
=======
>>>>>>> 422c11c2294df6a34887c9e38b7a5b4c6fc6cbf5
          }}
        />
        <LoadingComponent />
      </>
    );
  } else {
    // main view after loading, displays HeaderComponent and FlatList
    return (
      <View style={styles.chirpsContainer}>
        <HeaderComponent
          currentView='allChirps'
          newChirp={{
            username: '',
            body: '',
            timestamp: '',
<<<<<<< HEAD
            comments: [],
            likes: []
=======
>>>>>>> 422c11c2294df6a34887c9e38b7a5b4c6fc6cbf5
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

<<<<<<< HEAD
const styles = StyleSheet.create({
  chirpsContainer: {
    flex: 1,
    backgroundColor: '#111'
  },

  chirpContent: {
    paddingLeft: 20,
    flex: 1
  },

  chirpUser: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16
  },

  chirpBody: {
    fontSize: 16,
    color: '#FFFFFF'
  },

  chirpTimestamp: {
    fontSize: 12,
    color: '#dfdfdf'
  }
});

=======
>>>>>>> 422c11c2294df6a34887c9e38b7a5b4c6fc6cbf5
export default ChirpsComponent;

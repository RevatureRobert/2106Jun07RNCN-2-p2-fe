import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllChirps, GetUsersChirps } from '../../redux/actions/ChirpActions';
import { RootStore } from '../../redux/store/store';
import ChirpItemComponent from '../chirps/ChirpItemComponent';
import LoadingComponent from '../semantic/LoadingComponent';
import HeaderComponent from '../semantic/HeaderComponent';
import styles from './chirpstyles';
import AddChirpBtnComponent from '../addchirp/AddChirpBtnComponent';

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
      userImg={item.userImg}
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
            userImg: '',
            username: '',
            body: '',
            timestamp: '',
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
            userImg: '',
            username: '',
            body: '',
            timestamp: '',
          }}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={chirpsState.chirps?.sort((a, b) =>
            Number(a.timestamp) < Number(b.timestamp) ? 1 : -1
          )}
          renderItem={renderItem}
          ListEmptyComponent={null}
          onRefresh={onRefresh}
          refreshing={isFetching}
          keyExtractor={(item) => item.timestamp}
        />
        <AddChirpBtnComponent />
      </View>
    );
  }
};

export default ChirpsComponent;

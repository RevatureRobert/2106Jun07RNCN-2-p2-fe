import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GetUsersChirps } from '../../redux/actions/ChirpActions';
import { RootStore } from '../../redux/store/store';
import ChirpItemComponent from './ChirpItemComponent';
import LoadingComponent from '../semantic/LoadingComponent';
import CurrentUserBoxComponent from '../user/CurrentUserBoxComponent';
import styles from './chirpstyles';

// component that holds a list of all chirps by a user
const UserChirpsComponent: React.FC = () => {
  const [isFetching, setIsFetching] = React.useState(false);
  const dispatch = useDispatch();

  // gets the current user
  const currentUser = useSelector((state: RootStore) => state.auth.user);

  // gets all chirps by the current user from the db
  const fetchData = () => {
    dispatch(
      GetUsersChirps(currentUser?.username ? currentUser.username : ' ')
    );
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

  // gets all chirps by user from the store, sends it to ChirpItemComponent as props
  const chirpsState = useSelector((state: RootStore) => state.chirps);
  const renderItem = ({ item }: { item: any }) => (
    <ChirpItemComponent
      username={item.username}
      body={item.body}
      likes={item.likes}
      comments={item.comments}
      media={item.media ? item.media : undefined}
      timestamp={item.timestamp}
    />
  );

  // displays loading screen while chirps is fetching
  if (chirpsState.loading === true) {
    return (
      <View style={{ backgroundColor: '#141414', flex: 1 }}>
        <View style={{ backgroundColor: '#1b1b1b', flex: 0.2 }}></View>
        <CurrentUserBoxComponent />
        <View style={styles.userChirpsContainer}>
          <LoadingComponent />
        </View>
      </View>
    );
  } else {
    // main view after loading, displays HeaderComponent and FlatList
    return (
      <View style={{ backgroundColor: '#141414', flex: 1 }}>
        <View style={{ backgroundColor: '#1b1b1b', flex: 0.2 }}></View>
        <CurrentUserBoxComponent />
        <View style={styles.userChirpsContainer}>
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
      </View>
    );
  }
};

<<<<<<< HEAD
const styles = StyleSheet.create({
  chirpsContainer: {
    flex: 1,
    backgroundColor: '#141414',
    overflow: 'hidden'
  }
});

=======
>>>>>>> 422c11c2294df6a34887c9e38b7a5b4c6fc6cbf5
export default UserChirpsComponent;

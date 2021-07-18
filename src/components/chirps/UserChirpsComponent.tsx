import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GetUsersChirps } from '../../redux/actions/ChirpActions';
import { RootStore } from '../../redux/store/store';
import ChirpItemComponent from './ChirpItemComponent';
import LoadingComponent from '../semantic/LoadingComponent';
import CurrentUserBoxComponent from '../user/CurrentUserBoxComponent';

const UserChirpsComponent: React.FC = () => {
  const [isFetching, setIsFetching] = React.useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootStore) => state.auth.user);

  const fetchData = () => {
    dispatch(
      GetUsersChirps(currentUser?.username ? currentUser.username : ' ')
    );
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
      likes={item.likes}
      comments={item.comments}
      media={item.media ? item.media : undefined}
      timestamp={item.timestamp}
    />
  );

  if (chirpsState.loading === true) {
    return (
      <View style={{ backgroundColor: '#141414', flex: 1 }}>
        <View style={{ backgroundColor: '#1b1b1b', flex: 0.2 }}></View>
        <CurrentUserBoxComponent />
        <View style={styles.chirpsContainer}>
          <LoadingComponent />
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ backgroundColor: '#141414', flex: 1 }}>
        <View style={{ backgroundColor: '#1b1b1b', flex: 0.2 }}></View>
        <CurrentUserBoxComponent />
        <View style={styles.chirpsContainer}>
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

const styles = StyleSheet.create({
  chirpsContainer: {
    flex: 1,
    backgroundColor: '#141414',
    overflow: 'hidden',
  },
});

export default UserChirpsComponent;

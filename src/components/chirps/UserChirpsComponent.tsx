import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllChirps } from '../../redux/actions/ChirpActions';
import { RootStore } from '../../redux/store/store';
import ChirpItemComponent from './ChirpItemComponent';
import LoadingComponent from '../semantic/LoadingComponent';
import CurrentUserBoxComponent from '../user/CurrentUserBoxComponent';
import styles from './chirpstyles';
import { TabRouter } from '@react-navigation/native';
import HeaderComponent from '../semantic/HeaderComponent';
import AddChirpBtnComponent from '../addchirp/AddChirpBtnComponent';

interface Props {
  route: {
    params: {
      username: string;
      currentUser: string;
    };
  };
}

// component that holds a list of all chirps by a user
const UserChirpsComponent: React.FC<Props> = ({ route }) => {
  const [isFetching, setIsFetching] = React.useState(false);
  const dispatch = useDispatch();

  // gets all chirps by the current user from the db
  const fetchData = () => {
    dispatch(GetAllChirps());
    setIsFetching(false);
  };

  // refresh function when pulling down on flatlist
  const onRefresh = () => {
    setIsFetching(true);
    fetchData();
  };

  // gets all chirps by user from the store, sends it to ChirpItemComponent as props
  const chirpsState = useSelector((state: RootStore) => state.chirps);
  const renderItem = ({ item }: { item: any }) => (
    <ChirpItemComponent
      userImg={item.userImg}
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
        <HeaderComponent
          currentView='singleChirp'
          newChirp={{ userImg: '', username: '', body: '', timestamp: '' }}
        />
        <View style={{ backgroundColor: '#1b1b1b', flex: 0.2 }}></View>
        <CurrentUserBoxComponent
          username={route.params.username}
          currentUser={route.params.currentUser}
        />
        <View style={styles.userChirpsContainer}>
          <LoadingComponent />
        </View>
      </View>
    );
  } else {
    // main view after loading, displays HeaderComponent and FlatList
    return (
      <View style={{ backgroundColor: '#141414', flex: 1 }}>
        <HeaderComponent
          currentView='singleChirp'
          newChirp={{ userImg: '', username: '', body: '', timestamp: '' }}
        />
        <View style={{ backgroundColor: '#1b1b1b', flex: 0.2 }}></View>
        <CurrentUserBoxComponent
          username={route.params.username}
          currentUser={route.params.currentUser}
        />
        <View style={styles.userChirpsContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={chirpsState.chirps
              ?.sort((a, b) =>
                Number(a.timestamp) < Number(b.timestamp) ? 1 : -1
              )
              .filter((user) => user.username === route.params.username)}
            renderItem={renderItem}
            onRefresh={onRefresh}
            refreshing={isFetching}
            keyExtractor={(item) => item.timestamp}
          />
        </View>
        <AddChirpBtnComponent />
      </View>
    );
  }
};

export default UserChirpsComponent;

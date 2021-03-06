import React from 'react';
import { View, SafeAreaView, FlatList, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllChirps } from '../../redux/actions/ChirpActions';
import { RootStore } from '../../redux/store/store';
import ChirpItemComponent from '../chirps/ChirpItemComponent';
import LoadingComponent from '../semantic/LoadingComponent';
import styles from '../chirps/chirpstyles';
import HeaderComponent from '../semantic/HeaderComponent';

interface Props {
  testValue?: any;
}

// component that holds a list of all chirps by a user
const SearchView: React.FC<Props> = (props: Props = {testValue: ''}) => {
  const [isFetching, setIsFetching] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState(props.testValue || '');
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
          currentView='search'
          newChirp={{ userImg: '', username: '', body: '', timestamp: '' }}
          setSearchValue={setSearchValue}
        />
        <View style={styles.userChirpsContainer}>
          <LoadingComponent />
        </View>
      </View>
    );
  } else {
    // main view after loading, displays HeaderComponent and FlatList
    return (
      <SafeAreaView style={{ backgroundColor: '#141414', flex: 1 }}>
        <HeaderComponent
          currentView='search'
          newChirp={{ userImg: '', username: '', body: '', timestamp: '' }}
          setSearchValue={setSearchValue}
        />
        <View style={styles.userChirpsContainer}>
          {searchValue != '' ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={chirpsState.chirps
                ?.sort((a, b) =>
                  Number(a.timestamp) < Number(b.timestamp) ? 1 : -1
                )
                .filter(
                  (user) =>
                    user.body
                      .toLocaleLowerCase()
                      .includes(searchValue.toLocaleLowerCase()) ||
                    user.username
                      .toLowerCase()
                      .includes(searchValue.toLocaleLowerCase())
                )}
              renderItem={renderItem}
              onRefresh={onRefresh}
              refreshing={isFetching}
              ListEmptyComponent={
                <Text
                  style={{
                    flex: 1,
                    color: '#e1e1e1',
                    alignSelf: 'center',
                    textAlignVertical: 'center',
                    paddingTop: 250,
                  }}
                >
                  No results
                </Text>
              }
              keyExtractor={(item) => item.timestamp}
            />
          ) : null}
        </View>
      </SafeAreaView>
    );
  }
};

export default SearchView;

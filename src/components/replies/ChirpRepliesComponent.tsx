import React from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RepliesItemComponent from './RepliesItemComponent';
import { RootStore } from '../../redux/store/store';
import { GetReplies } from '../../redux/actions/ChirpActions';
import LoadingComponent from '../semantic/LoadingComponent';
import { Text } from 'react-native';
import PostReplyComponent from './PostReplyComponent';

interface Props {
  username: string;
  timestamp: string;
}

const ChirpRepliesComponent: React.FC<Props> = ({ username, timestamp }) => {
  const [isFetching, setIsFetching] = React.useState(false);
  const dispatch = useDispatch();

  // gets all chirps from the db
  const fetchData = () => {
    setIsFetching(false);
    dispatch(GetReplies(timestamp, username));
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
  const repliesState = useSelector((state: RootStore) => state.replies);
  const renderItem = ({ item }: { item: any }) => (
    <RepliesItemComponent
      username={item.username}
      body={item.body}
      timestamp={item.timestamp}
    />
  );

  if (repliesState.loading === true) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  } else {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={repliesState.replies?.sort((a, b) =>
          Number(a.timestamp) > Number(b.timestamp) ? 1 : -1
        )}
        renderItem={renderItem}
        ListEmptyComponent={null}
        onRefresh={onRefresh}
        refreshing={isFetching}
        style={{ flex: 1 }}
        keyExtractor={(item) => item.timestamp}
      />
    );
  }
};

export default ChirpRepliesComponent;

import React from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RepliesItemComponent from './RepliesItemComponent';
import { RootStore } from '../../redux/store/store';
import { GetReplies } from '../../redux/actions/ChirpActions';
import LoadingComponent from '../semantic/LoadingComponent';
import ChirpItemComponent from '../chirps/ChirpItemComponent';

interface Props {
  userImg: string;
  username: string;
  body: string;
  comments: string[];
  likes: string[];
  media?: string;
  timestamp: string;
}

const ChirpRepliesComponent: React.FC<Props> = (Props: Props) => {
  const [isFetching, setIsFetching] = React.useState(false);
  const dispatch = useDispatch();

  // gets all chirps from the db
  const fetchData = () => {
    setIsFetching(false);
    dispatch(GetReplies(Props.timestamp));
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
  const currentUser = useSelector((state: RootStore) => state.auth);
  const renderItem = ({ item }: { item: any }) => (
    <RepliesItemComponent
      userImg={item.userImg}
      username={item.username}
      body={item.body}
      timestamp={item.timestamp}
      chirpTimestamp={Props.timestamp}
      currentUser={currentUser.user ? currentUser.user?.username : ''}
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
        ListHeaderComponent={
          <ChirpItemComponent
            userImg={Props.userImg}
            username={Props.username}
            body={Props.body}
            timestamp={Props.timestamp}
            likes={Props.likes}
            comments={Props.comments}
            media={Props.media}
          />
        }
      />
    );
  }
};

export default ChirpRepliesComponent;

import React from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { GetReplies } from '../../redux/actions/ChirpActions';
import RepliesItemComponent from './RepliesItemComponent';
import { RootStore } from '../../redux/store/store';
import LoadingComponent from '../semantic/LoadingComponent';
import SingleChirpComponent from '../chirps/SingleChirpComponent';

interface IProps {
  userImg: string;
  username: string;
  body: string;
  comments: string[];
  likes: string[];
  media?: string;
  timestamp: string;
  likeState: any;
}

const ChirpRepliesComponent: React.FC<IProps> = (Props: IProps) => {
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
  const [likeState, setLikeState] = React.useState(Props.likeState);
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
          <SingleChirpComponent
            userImg={Props.userImg}
            username={Props.username}
            body={Props.body}
            timestamp={Props.timestamp}
            likes={Props.likes}
            comments={Props.comments}
            media={Props.media}
            likeState={likeState}
            setLikeState={setLikeState}
          />
        }
      />
    );
  }
};

export default ChirpRepliesComponent;

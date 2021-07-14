import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllChirps } from '../Redux/actions/ChirpActions';
import { RootStore } from '../Redux/store/Store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Item = ({username, body, timestamp}: {username:string, body: string, timestamp: string}) => (
        <View style={styles.chirpItem}>
            <View>
                <Image source={require('../assets/defaultUserImage.png')} style={{width: 64, height: 64, borderRadius: 72/2}}></Image>
            </View>
            <View style={styles.chirpContent}>
                <Text style={styles.chirpUser}>@{username}</Text>
                <Text style={styles.chirpBody}>{body}</Text>
                <Text style={styles.chirpTimestamp}>{timestamp}</Text>
            </View>
            <View>
                <MaterialCommunityIcons name="delete" size={20} color={'#ededed'} />
            </View>
        </View>
  );


const ChirpsComponent: React.FC = () => {
    const [isFetching, setIsFetching] = React.useState(false)
    const dispatch = useDispatch();

    const fetchData = () => {
        dispatch(GetAllChirps());
        setIsFetching(false);
    }

    const onRefresh = () => {
        setIsFetching(true);
        fetchData();
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    const chirpsState = useSelector((state: RootStore) => state.chirps);

    const renderItem = ({item}: {item: any}) => (
        <Item username={item.username} body={item.body} timestamp={new Date(Number(item.timestamp)).toLocaleString()} />
    );

    return (
        <View style={styles.chirpsContainer}>
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={chirpsState.chirps?.sort((a, b) => Number(a.timestamp) < Number(b.timestamp) ? 1 : -1)}
                renderItem={renderItem}
                onRefresh={onRefresh}
                refreshing={isFetching}
                keyExtractor={item => item.timestamp}
             />
        </View>
    );
}

const styles = StyleSheet.create({
    chirpsContainer: {
        flex: 1,
        backgroundColor: '#111',
    },

    chirpItem: {
        flex: 1,
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#080808',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        justifyContent: 'space-between'
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

export default ChirpsComponent;
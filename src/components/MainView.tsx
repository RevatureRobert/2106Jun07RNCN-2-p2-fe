import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import HeaderComponent from './HeaderComponent';
import AddChirpBtnComponent from './AddChirpBtnComponent';
import BottomNavComponent from './BottomNavComponent';

const MainView: React.FC = () => {
    return (
        <View style={styles.container}>
            <StatusBar
            backgroundColor="#111111"
            barStyle="light-content"
            />
            <HeaderComponent currentView="allChirps" newChirp={{username: "", body: "", timestamp: ""}} />
            <BottomNavComponent />
            <AddChirpBtnComponent />
        </View>
      );
}
    
    
const styles = StyleSheet.create({
    container: {
    backgroundColor: '#111111',
    flex: 1,
    overflow: 'hidden'
    },
<<<<<<< HEAD
=======

    webContainer: {
    flex: 1,
    flexDirection: 'row'
    },
>>>>>>> dag-login
});

export default MainView;
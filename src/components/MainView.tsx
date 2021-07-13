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
            barStyle="light-content" // Here is where you change the font-color
            />
            <HeaderComponent />
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

    webContainer: {
    flex: 1,
    flexDirection: 'row'
    },
});

export default MainView;
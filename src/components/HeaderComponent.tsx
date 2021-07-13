import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


const HeaderComponent: React.FC = () => {
    return (
        <View style={styles.headerContainer}>
            <View style={{flexDirection: 'row'}}>
                <Image source={require('../assets/defaultUserImage.png')} style={{width: 24, height: 24, borderRadius: 24/2}}>
                </Image>
                <Text style={{color: '#fff', paddingLeft: 8, fontWeight: 'bold'}}>@redoral</Text> {/* change this to get cognito user */}
            </View>
            <Image source={require('../assets/chirperLogo.png')} style={{width: 90, height: 24}} />
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        textAlign: 'center',
        backgroundColor: "#111",
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 0.01,
        padding: 25,
    },
});

export default HeaderComponent;
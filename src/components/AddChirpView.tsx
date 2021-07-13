import React from 'react';
import { View, StyleSheet, TextInput, Image } from 'react-native';

const AddChirpView: React.FC = () => {
    const [inputState, setInputState] = React.useState('');

    return (
        <View style={styles.AddChirpViewContainer}>
            <View style={styles.AddChirpContent}>
                <Image source={require('../assets/defaultUserImage.png')} style={{width: 64, height: 64, borderRadius: 72/2}}></Image>
                <TextInput
                    style={styles.input}
                    onChangeText={inputState => { setInputState(inputState) }}
                    value={inputState}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    AddChirpViewContainer: {
        backgroundColor: '#111',
        color: '#fff',
        flex: 1,
        flexDirection: 'column',
       },

    AddChirpContent: {
        backgroundColor: '#111',
        color: '#fff',
        flex: 1,
        flexDirection: 'row',
        padding: 25
    },

   input: {
    color: '#fff',
    height:256,
    padding: 25,
    borderWidth: 1,
    marginLeft: 12,
    marginTop: 6,
    borderColor: '#333',
    textAlign: 'left',
    textAlignVertical: 'top',
    flex: 1
   }
});

export default AddChirpView;

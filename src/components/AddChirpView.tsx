import React from 'react';
import { View, StyleSheet, TextInput, Image } from 'react-native';

const AddChirpView: React.FC = () => {
    const [inputState, setInputState] = React.useState('');

    return (
        <View style={styles.AddChirpViewContainer}>
            <Image source={require('../assets/defaultUserImage.png')} style={{width: 64, height: 64, borderRadius: 72/2}}></Image>
            <TextInput
                style={styles.input}
                onChangeText={inputState => { setInputState(inputState) }}
                value={inputState}
            />
        </View>
    );
}

const styles = StyleSheet.create({
   AddChirpViewContainer: {
    backgroundColor: '#111',
    color: '#fff',
    flex: 1,
    flexDirection: 'row'
   },

   input: {
    color: '#fff',
    height:50,
    padding: 25,
    borderWidth: 2,
    borderColor: '#fff'
   }
});

export default AddChirpView;

import React from 'react';
import { View, StyleSheet, TextInput, Image } from 'react-native';
import HeaderComponent from './HeaderComponent';

const AddChirpView: React.FC = () => {
    const [inputState, setInputState] = React.useState('');
    return (
        <View style={styles.AddChirpViewContainer}>
            <HeaderComponent currentView="addChirp" newChirp={{
                username: 'redoral',
                body: inputState,
                timestamp: Date.now().toString()
            }} />
            <View style={styles.AddChirpContent}>
                <Image source={require('../assets/defaultUserImage.png')} style={{width: 48, height: 48, borderRadius: 72/2}}></Image>
                <TextInput
                    multiline={true}
                    style={styles.input}
                    placeholder="Posting as @redoral"
                    placeholderTextColor="#dfdfdf"
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
<<<<<<< HEAD
        backgroundColor: '#080808',
=======
        backgroundColor: '#111',
>>>>>>> dag-login
        color: '#fff',
        flex: 1,
        flexDirection: 'row',
        padding: 25
    },

   input: {
    color: '#fff',
<<<<<<< HEAD
    padding: 25,
    borderWidth: 1,
    marginLeft: 12,
    borderColor: '#333',
    textAlign: 'left',
    borderRadius: 15,
=======
    height:256,
    padding: 25,
    borderWidth: 1,
    marginLeft: 12,
    marginTop: 6,
    borderColor: '#333',
    textAlign: 'left',
>>>>>>> dag-login
    textAlignVertical: 'top',
    flex: 1
   }
});

export default AddChirpView;

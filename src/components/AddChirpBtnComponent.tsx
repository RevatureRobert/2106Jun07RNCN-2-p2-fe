import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

interface props {
  newChirp?: {
    username: string;
    body: string;
    timestamp: number;
  };
}

const AddChirpBtnComponent: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.addButtonContainer}>
      <TouchableHighlight
        underlayColor='#fff'
        onPress={() => navigation.navigate('compose')}
        style={styles.buttonsContainer}
      >
        <MaterialCommunityIcons name='pencil' color='#111' size={24} />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  addButtonContainer: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 64,
    height: 64,
    bottom: 0,
    position: 'absolute',
    flex: 1,
    right: 0,
    overflow: 'hidden',
    marginRight: 15,
    marginBottom: 75,
    borderRadius: 100 / 2,
    ...Platform.select({
      ios: { marginBottom: 100 }
    })
  },

  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#FFF',
    alignSelf: 'center'
  }
});

export default AddChirpBtnComponent;

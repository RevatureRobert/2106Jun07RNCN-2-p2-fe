import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import styles from './addchirpstyles';

// floating post chirp burron
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

export default AddChirpBtnComponent;

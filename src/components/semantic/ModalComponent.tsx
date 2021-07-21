import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import styles from './semanticstyles';

interface Props {
  isModalVisible: boolean;
  setModalVisible: any;
}

const ModalComponent: React.FC<Props> = ({
  isModalVisible,
  setModalVisible,
}) => {
  return (
    <View style={styles.modalView}>
      <Modal
        isVisible={isModalVisible}
        backdropColor={'#000000'}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <Image
            source={require('../../assets/deadbird.png')}
            style={styles.deadBirdImg}
          />
          <Text style={styles.deleteText}>
            Do you want to delete this chirp?
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Wait, no.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton}>
              <MaterialCommunityIcons
                name='delete-outline'
                color='#fff'
                size={20}
              ></MaterialCommunityIcons>
              <Text style={styles.confirmText}>Yes, kill.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalComponent;

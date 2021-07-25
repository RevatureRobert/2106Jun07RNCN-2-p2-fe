import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DeleteChirp, DeleteComment } from '../../redux/actions/ChirpActions';
import { useToast } from 'react-native-toast-notifications';
import Modal from 'react-native-modal';
import styles from './semanticstyles';

interface Props {
  modalType: string;
  isModalVisible: boolean;
  setModalVisible: any;
  chirpUser: string;
  chirpTimestamp: string;
  cmtTimestamp: string;
  currentUser: any;
}

const ModalComponent: React.FC<Props> = ({
  modalType,
  isModalVisible,
  setModalVisible,
  chirpUser,
  chirpTimestamp,
  cmtTimestamp,
  currentUser,
}) => {
  const toast = useToast();

  async function deleteFunc() {
    let del = 'How did you get this message to appear?';
    if (modalType === 'chirp') {
      del = await DeleteChirp(chirpTimestamp);
    } else if (modalType === 'comment') {
      del = await DeleteComment(chirpTimestamp, cmtTimestamp);
    }
    setModalVisible(false);
    toast.show(del);
  }

  return (
    <View style={styles.modalView}>
      <Modal
        isVisible={isModalVisible}
        backdropColor={'#000000'}
        onBackdropPress={() => setModalVisible(false)}
      >
        {currentUser === chirpUser ? (
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
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={deleteFunc}
              >
                <MaterialCommunityIcons
                  name='delete-outline'
                  color='#fff'
                  size={20}
                ></MaterialCommunityIcons>
                <Text style={styles.confirmText}>Yes, kill.</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.modal}>
            <Image
              source={require('../../assets/deadbird.png')}
              style={styles.deadBirdImg}
            />
            <Text style={styles.deleteText}>
              {`Users cannot delete a ${modalType} written by another user.`} 
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Oh, okay.</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};

export default ModalComponent;

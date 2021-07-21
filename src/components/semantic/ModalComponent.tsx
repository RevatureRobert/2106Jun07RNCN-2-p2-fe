import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DeleteChirp } from '../../redux/actions/ChirpActions';
import { useToast } from 'react-native-toast-notifications';
import Modal from 'react-native-modal';
import styles from './semanticstyles';

interface Props {
  isModalVisible: boolean;
  setModalVisible: any;
  chirpUser: string;
  chirpTimestamp: string;
  currentUser: any;
}

const ModalComponent: React.FC<Props> = ({
  isModalVisible,
  setModalVisible,
  chirpUser,
  chirpTimestamp,
  currentUser,
}) => {
  const toast = useToast();

  async function deleteChirp() {
    const del = await DeleteChirp(chirpTimestamp, chirpUser);
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
                onPress={deleteChirp}
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
              There are no actions for this chirp.
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

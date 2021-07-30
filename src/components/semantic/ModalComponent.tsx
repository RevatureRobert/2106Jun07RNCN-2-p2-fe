import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  DeleteChirp,
  DeleteComment,
  GetAllChirps,
} from '../../redux/actions/ChirpActions';
import { useToast } from 'react-native-toast-notifications';
import Modal from 'react-native-modal';
import styles from './semanticstyles';
import { useDispatch } from 'react-redux';

interface IProps {
  modalType: string;
  isModalVisible: boolean;
  setModalVisible: any;
  chirpUser: string;
  chirpTimestamp: string;
  cmtTimestamp: string;
  currentUser: any;
}

const ModalComponent: React.FC<IProps> = (props: IProps) => {
  const toast = useToast();
  const dispatch = useDispatch();

  async function deleteFunc() {
    if (props.modalType === 'chirp') {
      dispatch(DeleteChirp(props.chirpTimestamp));
      toast.show('Chirp has been deleted.');
    } else if (props.modalType === 'comment') {
      dispatch(DeleteComment(props.chirpTimestamp, props.cmtTimestamp));
      toast.show('Comment has been deleted.');
    }

    props.setModalVisible(false);
  }

  return (
    <View style={styles.modalView}>
      <Modal
        isVisible={props.isModalVisible}
        backdropColor={'#000000'}
        onBackdropPress={() => props.setModalVisible(false)}
      >
        {props.currentUser === props.chirpUser ? (
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
                onPress={() => props.setModalVisible(false)}
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
              {`Users cannot delete a ${props.modalType} written by another user.`}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => props.setModalVisible(false)}
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

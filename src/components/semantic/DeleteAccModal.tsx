import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DeleteChirp, DeleteComment } from '../../redux/actions/ChirpActions';
import { useToast } from 'react-native-toast-notifications';
import { Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/AuthActions';
import Modal from 'react-native-modal';
import styles from './semanticstyles';

interface Props {
  isModalVisible: boolean;
  setModalVisible: any;
}

const DeleteAccModal: React.FC<Props> = ({
  isModalVisible,
  setModalVisible,
}) => {
  const dispatch = useDispatch();

  const deleteCurrentUser = () => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        dispatch(logout());
        user.deleteUser((err: any, result: any) => {
          if (err) {
            console.log('User deletion error: ' + err);
            return;
          }
          console.log('User deletion result: ' + result);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
            Are you sure you want to delete your account?
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
              onPress={deleteCurrentUser}
            >
              <Text style={styles.confirmText}>Yes, bye.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DeleteAccModal;

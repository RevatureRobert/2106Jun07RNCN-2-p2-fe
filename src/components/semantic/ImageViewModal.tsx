import React from 'react';
import { View, Image, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  isModalVisible: boolean;
  setModalVisible: any;
  imgUrl: any;
}

const ImageViewModal: React.FC<Props> = ({
  isModalVisible,
  setModalVisible,
  imgUrl,
}) => {
  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        backdropColor={'#000000'}
        backdropOpacity={1}
        style={{ flex: 1 }}
        onBackdropPress={() => setModalVisible(false)}
      >
        <Pressable onPress={() => setModalVisible(false)}>
          <MaterialCommunityIcons name='close' size={24} color='#f4f4f4' />
        </Pressable>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Image
            source={{ uri: imgUrl }}
            resizeMode='contain'
            style={{
              flex: 1,
              width: undefined,
              height: undefined,
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ImageViewModal;

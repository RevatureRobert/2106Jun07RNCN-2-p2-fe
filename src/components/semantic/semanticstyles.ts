import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // HeaderComponent.tsx
  headerContainer: {
    textAlign: 'center',
    backgroundColor: '#1b1b1b',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },

  input: {
    color: '#f3f3f3',
    padding: 15,
    borderWidth: 1,
    backgroundColor: '#141414',
    borderColor: '#1b1b1b',
    textAlign: 'left',
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 4,
    textAlignVertical: 'center',
    fontSize: 14,
    flex: 1,
  },

  button: {
    backgroundColor: '#f3f3f3',
    padding: 8,
    width: 80,
    borderRadius: 50,
  },

  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
  },

  // LoadingComponent.tsx
  loadingView: {
    flex: 1,
    backgroundColor: '#141414',
    justifyContent: 'center',
  },

  loadingImg: {
    height: 48,
    alignSelf: 'center',
  },

  // ModalComponent.tsx
  modalView: {
    height: 72,
  },

  modal: {
    backgroundColor: '#141414',
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },

  deadBirdImg: {
    height: 92,
    width: 92,
  },

  deleteText: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },

  modalButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: 12,
  },

  confirmButton: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#ff4242',
    borderRadius: 50,
    padding: 8,
    marginLeft: 6,
    width: 100,
    flex: 0.3,
    flexDirection: 'row',
  },

  confirmText: {
    color: '#f3f3f3',
    fontWeight: '700',
  },

  cancelButton: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#f3f3f3',
    borderRadius: 50,
    padding: 8,
    marginRight: 6,
    width: 100,
    flex: 0.3,
  },

  cancelText: {
    color: '#f3f3f3',
    fontWeight: '700',
  },
});

export default styles;

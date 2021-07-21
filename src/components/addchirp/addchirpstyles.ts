import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  // AddChirpView.tsx
  AddChirpViewContainer: {
    color: '#f3f3f3',
    flex: 1,
    flexDirection: 'column',
  },

  AddChirpContent: {
    backgroundColor: '#141414',
    color: '#f3f3f3',
    flex: 0.75,
    flexDirection: 'row',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 25,
    paddingBottom: 0,
    marginBottom: 0,
  },

  input: {
    color: '#f3f3f3',
    padding: 25,
    borderWidth: 1,
    backgroundColor: '#1b1b1b',
    marginLeft: 12,
    borderColor: '#1b1b1b',
    textAlign: 'left',
    borderRadius: 15,
    textAlignVertical: 'top',
    fontSize: 16,
    flex: 1,
    paddingTop: 25,
  },

  BottomLine: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginLeft: 90,
    marginRight: 30,
    paddingTop: 5,
  },

  Count: {
    color: '#e1e1e1',
  },

  MainContainer: {
    flex: 1,
    backgroundColor: '#141414',
  },

  keyboardAvoidingView: {
    flex: 1,
  },

  // AddChirpBtnComponent.tsx
  addButtonContainer: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    width: 64,
    height: 64,
    bottom: 0,
    position: 'absolute',
    flex: 1,
    right: 0,
    overflow: 'hidden',
    marginRight: 15,
    marginBottom: 15,
    borderRadius: 100 / 2,
  },

  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#FFF',
    alignSelf: 'center',
  },
});

export default styles;

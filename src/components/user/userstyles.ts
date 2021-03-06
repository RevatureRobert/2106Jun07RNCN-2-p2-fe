import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  // SigninComponent.tsx and SignupComponent.tsx
  signInView: {
    backgroundColor: '#141414',
    padding: 15,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },

  input: {
    color: '#fff',
    backgroundColor: '#1b1b1b',
    borderWidth: 0,
    borderColor: '#333',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 15,
    padding: 10,
    width: '85%'
  },

  loginBtn: {
    padding: 12,
    marginTop: 22,
    borderRadius: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center'
  },

  loginText: {
    fontWeight: '700'
  },

  signInText: {
    alignSelf: 'center',
    color: '#dfdfdf',
    marginTop: 22,
    width: '90%',
    textAlign: 'center'
  },

  // UserSettingComponent.tsx
  userSettingView: {
    height: 225,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#1e1e1e'
  },

  userSettingImg: {
    width: 100,
    height: 100,
    borderRadius: 50
  },

  updatePicBtn: {
    width: 125,
    alignSelf: 'center',
    padding: 10,
    marginTop: 15,
    backgroundColor: '#f3f3f3',
    borderRadius: 25
  },

  updatePicText: {
    fontWeight: '700',
    color: '#141414',
    textAlign: 'center'
  },

  deleteUserBtn: {
    width: 150,
    alignSelf: 'center',
    padding: 10,
    marginTop: 15,
    backgroundColor: '#141414',
    borderColor: '#ff4242',
    borderWidth: 2,
    borderRadius: 25
  },

  deleteUserText: {
    fontWeight: '700',
    color: '#ff4242',
    textAlign: 'center'
  },

  // UserBioComponent.tsx
  bioInput: {
    color: '#fff',
    backgroundColor: '#1b1b1b',
    borderWidth: 0,
    borderColor: '#333',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 15,
    padding: 10
  },

  updateBioView: {
    padding: 25,
    borderBottomWidth: 1,
    borderColor: '#1e1e1e'
  },

  updateBioText: {
    color: '#f4f4f4',
    fontWeight: '700',
    marginLeft: 10
  },

  updateBioBtn: {
    width: 100,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 25,
    alignSelf: 'flex-end',
    marginTop: 15
  },

  updateBioBtnText: {
    color: '#141414',
    fontWeight: '700',
    textAlign: 'center'
  },

  updateBioCount: {
    color: '#ddd',
    textAlign: 'right',
    alignSelf: 'flex-end',
    width: 45,
    marginRight: 10,
    marginTop: 5,
    fontSize: 10,
    fontVariant: ['tabular-nums']
  },

  // CurrentUserBoxComponent.tsx
  androidSafeArea: {
    width: 325,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 25,
    margin: 12,
    marginBottom: 0,
    marginTop: -60,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62
      },
      android: {
        elevation: 5
      }
    })
  },

  userImg: {
    height: 92,
    width: 92,
    borderRadius: 46,
    marginTop: -65,
    borderWidth: 2,
    borderColor: '#1b1b1b',
    backgroundColor: '#1b1b1b'
  },

  usernameText: {
    color: '#f3f3f3',
    fontWeight: '700',
    marginTop: 4,
    fontSize: 18
  },

  bioText: {
    color: '#e1e1e1',
    fontSize: 14,
    maxWidth: 200,
    textAlign: 'center',
    marginBottom: 10
  },

  logOutBtn: {
    padding: 10,
    backgroundColor: '#ff4242',
    borderRadius: 25,
    width: 124,
    marginBottom: 10
  },

  logOutText: {
    fontWeight: '700',
    color: '#fff',
    alignSelf: 'center',
    paddingRight: 10
  }
});

export default styles;

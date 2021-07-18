import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  // SigninComponent.tsx and SignupComponent.tsx
  signInView: {
    backgroundColor: '#141414',
    padding: 15,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
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
  },

  loginBtn: {
    padding: 12,
    marginTop: 22,
    borderRadius: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  loginText: {
    fontWeight: '700',
  },

  signInText: {
    alignSelf: 'center',
    color: '#dfdfdf',
    marginTop: 22,
  },

  // SignupComponent.tsx

  // CurrentUserBoxComponent.tsx
  androidSafeArea: {
    minHeight: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 25,
    margin: 12,
    marginBottom: 0,
    marginTop: -64,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  userImg: {
    height: 72,
    borderRadius: 64,
  },

  usernameText: {
    color: '#fff',
    fontWeight: '700',
    marginTop: 12,
    fontSize: 18,
  },

  bioText: {
    color: '#fff',
    fontSize: 14,
    maxWidth: 200,
    textAlign: 'center',
  },

  logOutBtn: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#ff4242',
    borderRadius: 25,
    width: 124,
  },

  logOutText: {
    fontWeight: '700',
    color: '#fff',
    alignSelf: 'center',
    paddingRight: 10,
  },
});

export default styles;

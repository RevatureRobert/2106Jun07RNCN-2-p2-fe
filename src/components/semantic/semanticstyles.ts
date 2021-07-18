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
});

export default styles;

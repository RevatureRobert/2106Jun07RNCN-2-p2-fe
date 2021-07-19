import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // ChirpsComponent.tsx
  chirpsContainer: {
    flex: 1,
    backgroundColor: '#111',
  },

  // UserChirpsComponent.tsx
  userChirpsContainer: {
    flex: 1,
    backgroundColor: '#141414',
    overflow: 'hidden',
  },

  // SingleChirpView
  chirpContainer: {
    flex: 1,
  },

  // ChirpItemComponent.tsx
  chirpItem: {
    flex: 0.2,
    flexDirection: 'row',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#141414',
    borderBottomWidth: 1,
    borderBottomColor: '#1b1b1b',
    justifyContent: 'space-between',
  },

  chirpContent: {
    paddingLeft: 20,
    flex: 1,
  },

  chirpUser: {
    color: '#f3f3f3',
    fontWeight: '700',
    fontSize: 14,
  },

  chirpBody: {
    fontSize: 14,
    color: '#ffffff',
  },

  chirpTimestamp: {
    fontSize: 10,
    color: '#e1e1e1',
  },
});

export default styles;

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // ChirpsComponent.tsx
  chirpsContainer: {
    flex: 1,
    backgroundColor: '#111',
  },

  // PostReplyComponent.tsx
  input: {
    color: '#f3f3f3',
    padding: 15,
    borderWidth: 1,
    backgroundColor: '#1b1b1b',
    borderColor: '#1b1b1b',
    textAlign: 'left',
    marginRight: 10,
    borderRadius: 15,
    marginLeft: 5,
    textAlignVertical: 'center',
    fontSize: 14,
    flex: 1,
  },

  postReplyComponent: {
    flexDirection: 'row',
    backgroundColor: '#141414',
    borderColor: '#1b1b1b',
    borderBottomWidth: 1,
    justifyContent: 'center',
    padding: 12,
  },

  postReplyButton: {
    backgroundColor: '#f4f4f4',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 75,
    borderRadius: 25,
  },

  postReplyCount: {
    color: '#ddd',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    width: 45,
    fontSize: 10,
    paddingLeft: 10,
    fontVariant: ['tabular-nums'],
  },

  postReplyButtonText: {
    fontWeight: '700',
  },

  // UserChirpsComponent.tsx
  userChirpsContainer: {
    flex: 1,
    backgroundColor: '#141414',
    overflow: 'hidden',
  },

  // RepliesItemComponent.tsx
  chirpItem: {
    flexShrink: 1,
    flexDirection: 'row',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 15,
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

import {
  User as IUser,
  AuthState as IAuth,
  SET_ERROR,
  SET_SUCCESS
} from '../redux/types/AuthActionsTypes';
import { UserAPI as IUserAPI } from '../redux/types/UserAPIActionsTypes';

class User implements IUser {
  username: string;
  password: string;
  email: string;
  bio: string;

  constructor(
    usr: string,
    pass: string = '',
    email: string = '',
    bio: string = ''
  ) {
    this.username = usr;
    this.password = pass;
    this.email = email;
    this.bio = bio;
  }
}

const defaultBio = 'Go to settings to change your bio';
class UserAPI implements IUserAPI {
  username: string;
  bio: string;
  following: string[];

  constructor(
    username: string,
    bio: string = defaultBio,
    following: string[] = []
  ) {
    this.username = username;
    this.bio = bio;
    this.following = following;
  }
}

const defaultTimestamp = '1234567890';
const defaultBody = 'This is a test chirp';
class Chirp {
  username: string;
  body: string;
  timestamp: string;
  likes: any[];

  constructor(
    username: string,
    body: string = defaultBody,
    timestamp: string = defaultTimestamp,
    likes: any[] = []
  ) {
    this.username = username;
    this.body = body;
    this.timestamp = timestamp;
    this.likes = likes;
  }
}

class Auth implements IAuth {
  user: User;
  authenticated: boolean;
  needVerification: boolean;
  loading: boolean;
  error: string;
  success: string;
  constructor(
    user: User,
    authenticated: boolean = true,
    needVerification: boolean = false,
    loading: boolean = false,
    error: string = SET_ERROR,
    success: string = SET_SUCCESS
  ) {
    this.user = user;
    this.authenticated = authenticated;
    this.needVerification = needVerification;
    this.loading = loading;
    this.error = error;
    this.success = success;
  }
}

class State {
  user: User;
  chirps: Chirp[];
  auth: Auth;
  userChirp: Chirp;

  constructor(
    user: User = new User('dummyUser'),
    chirps: Chirp[] = [],
    auth: Auth = new Auth(new User('dummyUser')),
    userChirp: Chirp = new Chirp('dummyUser')
  ) {
    this.user = user;
    this.chirps = chirps;
    this.auth = auth;
    this.userChirp = userChirp;
  }
}

export const testState = new State();

export const fileMock = 'test-file-stub';
export const styleMock = {};

//Old testState, will probably be deprecated
export const testStateOld = {
  chirps: [
    {
      username: 'dummyUser1',
      body: 'this is a chirp1',
      timestamp: '12345678901',
      likes: 'why is likes a string?1',
      comments: 'this is a comment1'
    },
    {
      username: 'dummyUser2',
      body: 'this is a chirp2',
      timestamp: '12345678902',
      likes: 'why is likes a string?2',
      comments: 'this is a comment2'
    }
  ],
  user: {
    username: 'My username',
    bio: 'My bio'
  },
  auth: {
    user: {
      username: 'myusername',
      bio: 'My bio'
    },
    authenticated: true,
    needVerification: false,
    loading: false,
    error: 'ERROR',
    success: 'SUCCESS',
    userChirp: {
      username: 'dummyUser4',
      body: 'this is a chirp4',
      timestamp: '12345678904',
      likes: 'why is likes a string?4',
      comments: 'this is a comment4'
    }
  },
  userChirp: {
    username: 'dummyUser3',
    body: 'this is a chirp3',
    timestamp: '12345678903',
    likes: 'why is likes a string?3',
    comments: 'this is a comment3'
  }
};

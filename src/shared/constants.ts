const defaultUserImg = 'https://chirps-bucket-for-pics.s3.us-east-2.amazonaws.com/public/default/defaultpicture.png';

interface IAuthUser {
  password: string;
  picture: string;
  username: string;
}

interface IAuth {
  authenticated: boolean;
  error: string;
  loading: boolean;
  needVerification: boolean;
  success: string;
  user: IAuthUser;
}

interface IChirp {
  likes: string[];
  media: string;
  timestamp: string;
  comments: Comment[]
  username: string;
}

interface IComment {
  body: string;
  timestamp: string;
  userImg: string;
  username: string;
}

interface IChirps {
  chirps: Chirp[];
  loading: boolean;
}

interface IReplies {
  loading: boolean;
}

interface IUser {
  loading: boolean;
}

class Replies implements IReplies {
  loading: boolean;
  constructor(loading:boolean = false){
    this.loading = loading;
  }
}

class User implements IUser {
  loading: boolean;

  constructor(loading:boolean = false) {
    this.loading = loading;
  }
}

class Comment implements IComment {
  body: string;
  timestamp: string;
  userImg: string;
  username: string;

  constructor(
    body: string = 'commentBody', 
    timestamp: string = Date.now().toString(), 
    userImg: string = defaultUserImg, 
    username: string = 'dummyuser'
  ){
    this.body = body;
    this.timestamp = timestamp;
    this.userImg = userImg;
    this.username = username;
  }
}

class Chirp implements IChirp {
  username: string;
  body: string;
  timestamp: string;
  likes: any[];
  media: string;
  comments: Comment[];

  constructor(
    username: string = 'dummyuser',
    body: string = 'chirpBody',
    timestamp: string = Date.now().toString(),
    likes: any[] = [],
    media: string = '',
    comments: Comment[] = [new Comment()]
  ) {
    this.username = username;
    this.body = body;
    this.timestamp = timestamp;
    this.likes = likes;
    this.media = media;
    this.comments = comments;
  }
}

class Chirps implements IChirps {
  chirps: Chirp[];
  loading: boolean;

  constructor(
    chirps: Chirp[] = [new Chirp()],
    loading: boolean = false
  ){
    this.chirps = chirps;
    this.loading = loading;
  }
}

class AuthUser implements IAuthUser {
  password: string;
  picture: string;
  username: string;

  constructor(
    password: string = '@Test000',
    picture: string = defaultUserImg,
    username: string = 'dummyuser'
  ){
    this.password = password;
    this.picture = picture;
    this.username = username;
  }
}

class Auth implements IAuth {
  authenticated: boolean;
  error: string;
  loading: boolean;
  needVerification: boolean;
  success: string;
  user: AuthUser;
  constructor(
    user: AuthUser = new AuthUser(),
    authenticated: boolean = true,
    needVerification: boolean = false,
    loading: boolean = false,
    error: string = 'SET_ERROR',
    success: string = 'SET_SUCCESS'
  ) {
    this.user = user;
    this.authenticated = authenticated;
    this.needVerification = needVerification;
    this.loading = loading;
    this.error = error;
    this.success = success;
  }
}

interface IState {
  auth: Auth;
  chirps: Chirps;
  replies: Replies;
  user: User;
}

export class State implements IState{
  auth: Auth;
  chirps: Chirps;
  replies: Replies;
  user: User;

  constructor(
    auth: Auth = new Auth(),
    chirps: Chirps = new Chirps(),
    replies: Replies = new Replies(),
    user: User = new User()
  ){
    this.auth = auth;
    this.chirps = chirps;
    this.replies = replies;
    this.user = user;
  }
  
}

export const testState = new State();

const _auth = new Auth();
const _chirps = new Chirps([new Chirp()], true);
const _replies = new Replies();
const _user = new User(); 
export const testStateChirpsLoading = new State(_auth, _chirps, _replies, _user);
const defaultUserImg = 'https://chirps-bucket-for-pics.s3.us-east-2.amazonaws.com/public/default/defaultpicture.png';

interface IAuthUser {
  password: string;
  picture: string;
  username: string;
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


interface IAuth {
  authenticated: boolean;
  error: string;
  loading: boolean;
  needVerification: boolean;
  success: string;
  user: IAuthUser;
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


interface IChirp {
  likes: string[];
  media: string;
  timestamp: string;
  comments: Comment[]
  username: string;
  body: string;
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


interface IComment {
  body: string;
  timestamp: string;
  userImg: string;
  username: string;
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


interface IChirps {
  chirps: Chirp[];
  loading: boolean;
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

interface IReply {
  userImg: string;
  username: string;
  body: string;
  timestamp: string;
  likes: string[];
}
class Reply implements IReply {
  userImg: string;
  username: string;
  body: string;
  timestamp: string;
  likes: string[];
  constructor(
    userImg: string = defaultUserImg,
    username: string = 'dummyuser',
    body: string = 'replyBody',
    timestamp: string = Date.now().toString(),
    likes: string[] = [''],
  ){
    this.userImg = userImg;
    this.username = username;
    this.body = body;
    this.timestamp = timestamp;
    this.likes = likes;
  }
}


interface IReplies {
  loading: boolean;
  replies: Reply[];
}
class Replies implements IReplies {
  loading: boolean;
  replies: Reply[];
  constructor(
    loading: boolean = false,
    replies: Reply[] = [new Reply()]
  ){
    this.loading = loading;
    this.replies = replies;
  }
}


interface IUser {
  loading: boolean;
}
class User implements IUser {
  loading: boolean;
  constructor(loading:boolean = false) {
    this.loading = loading;
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

export const testStateChirpsLoading = new State(
  new Auth(),
  new Chirps([new Chirp()], true),
  new Replies(),
  new User(),
);

export const testStateNotLoggedIn = new State(
  new Auth(new AuthUser(), false),
  new Chirps(),
  new Replies(),
  new User(),
);

export const testStateRepliesLoading = new State(
  new Auth(),
  new Chirps(),
  new Replies(true),
  new User(),
);
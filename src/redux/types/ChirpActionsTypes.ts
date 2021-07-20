export const CHIRPS_LOADING = 'CHIRPS_LOADING';
export const CHIRPS_FAIL = 'CHIRPS_FAIL';
export const CHIRPS_SUCCESS = 'CHIRPS_SUCCESS';
export const CHIRPS_POST = 'CHIRPS_POST';

export type ChirpsType = [
  {
    userImg: string;
    username: string;
    body: string;
    timestamp: string;
    likes: {};
    comments: [];
    media?: string;
  }
];

export type Chirps = {
  userImg: string;
  username: string;
  body: string;
  timestamp: string;
  likes: {};
  comments: [];
  media?: string;
};

export interface ChirpsLoading {
  type: typeof CHIRPS_LOADING;
}

export interface ChirpsFail {
  type: typeof CHIRPS_FAIL;
}

export interface ChirpsSuccess {
  type: typeof CHIRPS_SUCCESS;
  payload: ChirpsType;
}

export interface ChirpsPost {
  type: typeof CHIRPS_POST;
}

export type ChirpsActionsTypes =
  | ChirpsLoading
  | ChirpsFail
  | ChirpsSuccess
  | ChirpsPost;

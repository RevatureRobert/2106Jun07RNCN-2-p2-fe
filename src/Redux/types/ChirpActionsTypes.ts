export const CHIRPS_LOADING = 'CHIRPS_LOADING';
export const CHIRPS_FAIL = 'CHIRPS_FAIL';
export const CHIRPS_SUCCESS = 'CHIRPS_SUCCESS';

export type ChirpsType = [
  {
    username: string;
    body: string;
    timestamp: string;
    likes: [];
    comments: [];
    media?: string;
  }
];

export type Chirps = {
  username: string;
  body: string;
  timestamp: string;
  likes: [];
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

export type ChirpsActionsTypes = ChirpsLoading | ChirpsFail | ChirpsSuccess;

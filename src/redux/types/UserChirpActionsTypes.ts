export const USER_CHIRPS_LOADING = 'CHIRPS_LOADING';
export const USER_CHIRPS_FAIL = 'CHIRPS_FAIL';
export const USER_CHIRPS_SUCCESS = 'CHIRPS_SUCCESS';

export type UserChirpsType = [
  {
    username: string;
    body: string;
    timestamp: string;
    likes: [''];
  }
];

export type UserChirps = {
  username: string;
  body: string;
};

export interface UserChirpsLoading {
  type: typeof USER_CHIRPS_LOADING;
}

export interface UserChirpsFail {
  type: typeof USER_CHIRPS_FAIL;
}

export interface UserChirpsSuccess {
  type: typeof USER_CHIRPS_SUCCESS;
  payload: UserChirpsType;
}

export type UserChirpsActionsTypes =
  | UserChirpsLoading
  | UserChirpsFail
  | UserChirpsSuccess;

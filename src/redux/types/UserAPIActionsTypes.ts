export const USER_LOADING = 'USER_LOADING';
export const USER_FAIL = 'USER_FAIL';
export const USER_SUCCESS = 'USER_SUCCESS';

export interface UserAPI {
  username: string;
  bio: string;
  following: string[];
}

export type UserAPIType = {
  username: string;
  bio: string;
};

export interface UserLoading {
  type: typeof USER_LOADING;
}

export interface UserFail {
  type: typeof USER_FAIL;
}

export interface UserSuccess {
  type: typeof USER_SUCCESS;
  payload: UserAPIType;
}

export type UserAPIActionTypes = UserLoading | UserFail | UserSuccess;

export const REPLIES_LOADING = 'REPLIES_LOADING';
export const REPLIES_FAIL = 'REPLIES_FAIL';
export const REPLIES_SUCCESS = 'REPLIES_SUCCESS';
export const REPLIES_POST = 'REPLIES_POST';
export const REPLIES_DELETE = 'REPLIES_DELETE';

export type RepliesType = [
  {
    userImg: string;
    username: string;
    body: string;
    timestamp: string;
    likes: [];
  }
];

export type Replies = [
  { username: string; body: string; timestamp: string; likes: [] }
];

export interface RepliesLoading {
  type: typeof REPLIES_LOADING;
}

export interface RepliesFail {
  type: typeof REPLIES_FAIL;
}

export interface RepliesSuccess {
  type: typeof REPLIES_SUCCESS;
  payload: RepliesType;
}

export interface RepliesPost {
  type: typeof REPLIES_POST;
  payload: RepliesType;
}

export interface RepliesDelete {
  type: typeof REPLIES_DELETE;
  payload: RepliesType;
}

export type RepliesActionTypes =
  | RepliesLoading
  | RepliesFail
  | RepliesSuccess
  | RepliesDelete
  | RepliesPost;

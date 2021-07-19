export const REPLIES_LOADING = 'REPLIES_LOADING';
export const REPLIES_FAIL = 'REPLIES_FAIL';
export const REPLIES_SUCCESS = 'REPLIES_SUCCESS';
export const REPLIES_POST = 'REPLIES_POST';

export type RepliesType = [
  {
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
}

export type RepliesActionTypes =
  | RepliesLoading
  | RepliesFail
  | RepliesSuccess
  | RepliesPost;

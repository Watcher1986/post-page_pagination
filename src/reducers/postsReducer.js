
const SET_POSTS = 'SET_POSTS';
const SET_IS_FETCHING = 'SET_IS_FETCHING';

const initialState = {
  items: [],
  isFetching: true,
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        items: action.payload,
        isFetching: false,
      };
    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    default:
      return state;
  }
}

export const setPosts = posts => ({
  type: SET_POSTS,
  payload: posts,
});

export const setIsFetching = bool => ({
  type: SET_IS_FETCHING,
  payload: bool,
});

import axios from 'axios';
import { setIsFetching, setPosts } from '../../reducers/postsReducer';

const baseUrl = 'https://jsonplaceholder.typicode.com/posts';

export const getPosts = id => {
  let param;
  if (id === undefined || '') {
    param = baseUrl
  } else {param = `${baseUrl}?userId=${id}`}
  // const param = id == undefined ? baseUrl : `${baseUrl}?userId=${id}`;
  return async dispatch => {
    dispatch(setIsFetching(true));
    const response = await axios.get(param);
    dispatch(setPosts(response.data));
  };
};

// export const getPost = (id) => {
//   return async dispatch => {
//     dispatch(setIsFetching(true))
//     const response = await axios.get(`${baseUrl}/${id}`)
//     dispatch()
//   }
// }

/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPostsFromStorage } from '../utils/utils';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!response.ok) {
      throw new Error('Server Error!');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Can't delete post. Server error.");
      }

      dispatch(removePost({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const editCurrPost = createAsyncThunk(
  'posts/editCurrPost',
  async (data, { rejectWithValue, dispatch }) => {
    // const post = getState().posts.posts.find(post => post.id === id);
    const { id, title, text } = data;

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          body: text,
        }),
      });

      if (!response.ok) {
        throw new Error("Can't update post. Server error.");
      }

      dispatch(editPost({ id, title, text }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (postData, { rejectWithValue, dispatch }) => {
    const { title, body, userId } = postData;
    try {
      const post = {
        title,
        userId,
        body,
      };

      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw new Error("Can't add task. Server error.");
      }

      const data = await response.json();
      dispatch(addPost(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    currentPage: 1,
    itemsPerPage: 10,
    status: null,
    error: null,
  },
  reducers: {
    addPost(state, action) {
      state.posts.push(action.payload);
    },
    editPost(state, action) {
      const currentPost = state.posts.find(post => post.id === action.payload.id);
      currentPost.title = action.payload.title;
      currentPost.body = action.payload.text;
    },
    findPosts(state, action) {
      // const { posts } = getPostsFromStorage();
      state.posts.filter(post => post.title.includes(action.payload.text));
    },
    removePost(state, action) {
      const { posts } = getPostsFromStorage();
      const filteredPosts = posts.filter(post => post.id !== action.payload.id);
      state.posts = filteredPosts;
    },
    incrementCurPage(state) {
      state.currentPage += 1;
    },
    decrementCurPage(state) {
      state.currentPage -= 1;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [fetchPosts.pending]: state => {
      state.status = 'loading';
      state.error = null;
      state.itemsPerPage = 10;
      state.currentPage = 1;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.posts = action.payload;
      state.currentPage = 1;
    },
    [fetchPosts.rejected]: setError,
    [deletePost.rejected]: setError,
    [editCurrPost.rejected]: setError,
    [addNewPost.rejected]: setError,
  },
});

export const {
  addPost,
  findPosts,
  removePost,
  editPost,
  incrementCurPage,
  decrementCurPage,
  setCurrentPage,
} = postsSlice.actions;

export default postsSlice.reducer;

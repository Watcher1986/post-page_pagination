import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async function (text, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      // if (text != '' || undefined) {
      //   dispatch(findPosts(text));
      // }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async function (id, { rejectWithValue, dispatch }) {
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

export const toggleStatus = createAsyncThunk(
  'todos/toggleStatus',
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todos.todos.find(todo => todo.id === id);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Can't toggle status. Server error.");
      }

      dispatch(toggleComplete({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addNewPost = createAsyncThunk(
  'todos/addNewTodo',
  async function (text, { rejectWithValue, dispatch }) {
    try {
      const todo = {
        title: text,
        userId: 1,
        id: new Date().toISOString(),
      };

      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        throw new Error("Can't add task. Server error.");
      }

      const data = await response.json();
      dispatch(addTodo(data));
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
    status: null,
    error: null,
  },
  reducers: {
    addPost(state, action) {
      state.posts.push(action.payload);
    },
    findPosts(state, action) {
      state.posts = state.posts.filter(post => post.title.includes(action.payload.text));
    },
    removePost(state, action) {
      state.posts = state.posts.filter(post => post.id !== action.payload.id);
    },
  },
  extraReducers: {
    [fetchPosts.pending]: state => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.posts = action.payload;
    },
    [fetchPosts.rejected]: setError,
    [deletePost.rejected]: setError,
    [toggleStatus.rejected]: setError,
  },
});

export const { addPost, findPosts, removePost } = postsSlice.actions;

export default postsSlice.reducer;

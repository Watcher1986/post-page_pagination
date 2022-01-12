import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPosts, findPosts, removePost } from './store/postsSlice';
import Main from './components/posts/Main';
import PostsForm from './components/posts/postsForm/PostsForm';

import './app.scss';

const App = () => {
  const [text, setText] = useState('');
  const { status, error } = useSelector(state => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const searchHandler = () => {
    if (text.trim().length) {
      dispatch(findPosts(text));
      setText('');
    }
  };

  return (
    <div className="container">
      <PostsForm setText={setText} searchHandler={searchHandler} value={text} />
      {status === 'loading' && <div className="fetching"></div>}
      {error && <h2>An error occured: {error}</h2>}
      <Main />
    </div>
  );
};

export default App;

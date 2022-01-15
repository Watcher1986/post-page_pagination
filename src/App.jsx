import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPosts } from './store/postsSlice';
import Main from './components/posts/Main';
import PostsForm from './components/postsForm/PostsForm';
import AddPostForm from './components/addPostForm/AddPostForm';
import Pagination from './components/pagination/Pagination';

import './app.scss';

const App = () => {
  const [text, setText] = useState('');
  const [addNewPost, setAddNewPost] = useState(false);
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.posts);
  const [findPosts, setFindPosts] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const searchHandler = () => {
    if (text.trim().length) {
      setFindPosts(true);
    }
  };

  return (
    <div className="container">
      {addNewPost && <AddPostForm setAddNewPost={setAddNewPost} />}
      <PostsForm
        setAddNewPost={setAddNewPost}
        searchHandler={searchHandler}
        value={text}
        setText={setText}
      />
      <Pagination />
      {status === 'loading' && <div className="fetching"></div>}
      {error && <h2>An error occured: {error}</h2>}
      <Main findPosts={findPosts} text={text} />
      <Pagination />
    </div>
  );
};

export default App;

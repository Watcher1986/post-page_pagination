import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/posts';
import './main.scss';
import Post from './post/Post';

const Main = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.items);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <div className="main">
      <input type="text" placeholder="find post" />
      <button>Find</button>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Main;

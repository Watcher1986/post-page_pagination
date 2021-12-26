import React from 'react';
import { useSelector } from 'react-redux';
import Post from './post/Post';
import './main.scss';

const Main = () => {
  const posts = useSelector(state => state.posts.posts);

  return (
    <div className="main">
      {posts.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default Main;

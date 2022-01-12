import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Post from './post/Post';
import './main.scss';

const Main = () => {
  const posts = useSelector(state => state.posts.posts);

  useEffect(() => {
    const mosts = localStorage.getItem('persist:root');
    console.log(mosts)
    const nost = JSON.parse(mosts)
    const bost = nost.posts
    console.log(bost)
    const lost = JSON.parse(bost)
    const lsPosts = lost.posts;
    lsPosts.push('name')
    console.log(lsPosts)
  }, []);

  return (
    <div className="main">
      {posts.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default Main;

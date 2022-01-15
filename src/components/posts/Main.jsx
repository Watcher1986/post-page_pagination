import React from 'react';
import { useSelector } from 'react-redux';
import Post from './post/Post';
import './main.scss';

const Main = ({ findPosts, text }) => {
  const { posts, itemsPerPage, currentPage } = useSelector(state => state.posts);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const postsToRender = posts.slice(startIndex, startIndex + itemsPerPage)

  let filteredPosts = [];
  if (findPosts) {
    filteredPosts = posts.filter(post => post.title.includes(text));
  }

  const curPosts = findPosts && text ? filteredPosts : postsToRender;

  return (
    <div className="main">
      {curPosts.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default Main;

import React, { useState } from 'react';
import './index.scss';

const PostsForm = ({ setText, searchHandler, value }) => {
  return (
    <div className="search">
      <input
        value={value}
        onChange={e => setText(e.target.value)}
        className="search-input"
        type="text"
        placeholder="find post"
      />
      <button onClick={searchHandler} className="search-btn">
        Find post
      </button>
      <button className="create-btn">Create new post</button>
    </div>
  );
};

export default PostsForm;

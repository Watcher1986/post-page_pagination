import React from 'react';
import './index.scss';

const PostsForm = ({ value, setText, searchHandler, setAddNewPost }) => (
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
    <button className="create-btn" onClick={() => setAddNewPost(true)}>
      Create new post
    </button>
  </div>
);

export default PostsForm;

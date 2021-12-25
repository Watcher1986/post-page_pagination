import React from 'react';
import './post.scss';

const Post = (props) => {
  const post = props.post

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-id">
          {post.userId}
        </div>
        <div className="post-title">{post.title}</div>
      </div>
      <p className="post-body">{post.body}</p>
    </div>
  );
};

export default Post;

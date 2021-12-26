import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../store/postsSlice';
import './index.scss';

const Post = ({ id, title, body }) => {
  const dispatch = useDispatch();

  return (
    <div className="post">
      <div className="post-header">
        <span className="post-id">{id}</span>
        <span className="post-title">{title}</span>
      </div>
      <p className="post-body">{body}</p>
      <span className="post-delete" onClick={() => dispatch(deletePost(id))}>
        delete post
      </span>
    </div>
  );
};

export default Post;

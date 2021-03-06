import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../store/postsSlice';
import Modal from '../modal/Modal';
import './index.scss';

const Post = ({ id, title, body }) => {
  const [active, setActive] = useState(false)
  const dispatch = useDispatch();

  return (
    <div className="post">
      {active && <Modal setActive={setActive} id={id} />}
      <div className="post-header">
        <span className="post-id">{id}</span>
        <span className="post-title">{title}</span>
      </div>
      <p className="post-body">{body}</p>
      <div className="edit_block">
        <button className="post-edit" onClick={() => setActive(true)}>
          edit post
        </button>
        <button className="post-delete" onClick={() => dispatch(deletePost(id))}>
          delete post
        </button>
      </div>
    </div>
  );
};

export default Post;

/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewPost } from '../../store/postsSlice';
import './index.scss';

const AddPostForm = ({ setAddNewPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch();

  return (
    <div className="form" onClick={() => setAddNewPost(false)}>
      <div className="form__content" onClick={e => e.stopPropagation()}>
        <div className="form__header">
          <span className="form__name">Create new post</span>
          <span className="form__close" onClick={() => setAddNewPost(false)}>
            &times;
          </span>
        </div>
        <div className="form__block">
          <label className="form__label" htmlFor="title">
            Title
          </label>
          <input
            className="form__input"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="form__block">
          <label className="form__label" htmlFor="userid">
            User id
          </label>
          <input
            className="form__input"
            type="text"
            value={userId}
            onChange={e => setUserId(e.target.value)}
          />
        </div>
        <div className="form__block">
          <label className="form__label" htmlFor="maintext">
            Main text
          </label>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            className="form__txa"
            name="post"
            id="post"
            cols="30"
            rows="10"
          />
        </div>
        <span
          className="form__btn"
          onClick={() => dispatch(addNewPost({ title, body, userId }))}
        >
          Create
        </span>
      </div>
    </div>
  );
};

export default AddPostForm;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editCurrPost } from '../../../store/postsSlice';
import './modal.scss';

const Modal = ({ setActive, id }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const onEditPost = () => {
    dispatch(editCurrPost({ id, title, text }));
  };

  return (
    <React.StrictMode>
      <div className="modal-form" onClick={() => setActive(false)}>
        <div
          className="modal-form__content"
          onClick={e => e.stopPropagation()}
        >
          <div className="modal-form__header">
            <span className="modal-form__name">Post editing</span>
            {/* <span className="modal-form__close" onClick={() => setActive(false)}>
            &times;
          </span> */}
          </div>
          <div className="modal-form__block">
            <label className="modal-form__label" htmlFor="title">
              Title
            </label>
            <input
              className="modal-form__input"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="modal-form__block">
            <label className="modal-form__label" htmlFor="maintext">
              Main text
            </label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              className="modal-form__txa"
              name="post"
              id="post"
              cols="30"
              rows="10"
            />
          </div>
          <span className="modal-form__btn" onClick={onEditPost}>
            Submit editing
          </span>
        </div>
      </div>
    </React.StrictMode>
  );
};

export default Modal;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editCurrPost } from '../../../store/postsSlice';
import './modal.scss';

const Modal = ({ setIsModal, id }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  return (
    <div className="modal-form">
      <div className="modal-form__header">
        <span className="modal-form__name">Post editing</span>
        <span className="modal-form__close" onClick={() => setIsModal(false)}>
          &times;
        </span>
      </div>
      <div className="modal-form__block">
        <label className="modal-form__label" htmlFor="title">Title</label>
        <input
          className="modal-form__input"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="modal-form__block">
        <label className="modal-form__label" htmlFor="maintext">Main text</label>
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
      <span className="modal-form__btn" onClick={() => dispatch(editCurrPost(id, title, text))}>
        Submit editing
      </span>
    </div>
  );
};

export default Modal;

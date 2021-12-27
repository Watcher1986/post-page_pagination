import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editCurrPost } from '../../../store/postsSlice';
import './modal.scss';

const Modal = ({ setIsModal, id }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  return (
    <div className="modal_form">
      <div className="modal_form-header">
        <span className="modal_form-name">Post editing</span>
        <span className="modal_form-close" onClick={() => setIsModal(false)}>
          &times;
        </span>
      </div>
      <input
        className="modal_form-input"
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        className="modal_form-txa"
        name="post"
        id="post"
        cols="30"
        rows="10"
      ></textarea>
      <span className="modal_form-btn" onClick={() => dispatch(editCurrPost(id, title, text))}>
        Submit editing
      </span>
    </div>
  );
};

export default Modal;

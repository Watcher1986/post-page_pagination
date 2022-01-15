import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementCurPage, incrementCurPage, setCurrentPage } from '../../store/postsSlice';
import { createPages } from '../../utils/utils';

import './pagination.scss';

const Pagination = () => {
  const { currentPage, itemsPerPage, posts } = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const totalItems = posts.length;
  const pagesCount = Math.ceil(totalItems / itemsPerPage);
  const isPrevPageAvailable = currentPage > 1;
  const isNextPageAvailable = currentPage < Math.ceil(totalItems / itemsPerPage);

  const pages = [];
  createPages(pages, pagesCount, currentPage);

  return (
    <div className="pagination">
      <button
        className="btn"
        onClick={() => dispatch(decrementCurPage())}
        disabled={!isPrevPageAvailable}
      >
        {isPrevPageAvailable && '←'}
      </button>
      <div className="pages">
        {pages.map((page, index) => (
          <span
            key={Math.random() * index}
            className={page === currentPage ? "page__active" : "page"}
            onClick={() => dispatch(setCurrentPage(page))}
          >
            {page}
          </span>
        ))}
      </div>
      {/* <span className="pagination__page">{currentPage}</span> */}
      <button
        className="btn"
        onClick={() => dispatch(incrementCurPage())}
        disabled={!isNextPageAvailable}
      >
        {isNextPageAvailable && '→'}
      </button>
    </div>
  );
};

export default Pagination;

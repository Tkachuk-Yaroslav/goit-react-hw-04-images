import React from 'react';

const Button = ({ handleLoadMore }) => {
  return (
    <button type="button" onClick={handleLoadMore} className="Button">
      Load more
    </button>
  );
};

export default Button;

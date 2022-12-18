import React from 'react';
import cn from 'classnames';

const Button = (props) => {
  const {
    text, isSpinned, handler, wide, outline,
  } = props;
  const className = cn('btn', {
    'btn-outline-primary': outline,
    'btn-danger': !outline,
    'w-100 mb-3': wide,
    disabled: isSpinned,
  });
  return (
    <button type="submit" onClick={handler} className={className}>
      {(isSpinned) && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
      {text}
    </button>
  );
};

export default Button;

/*

btn btn-danger disabled

*/

import React from 'react';
import cn from 'classnames';

const Button = (props) => {
  const {
    text, disabled, handler, wide, outline,
  } = props;

  const className = cn('btn', {
    'btn-outline-primary': outline,
    'btn-danger': !outline,
    'w-100 mb-3': wide,
    disabled,
  });

  return (
    <button type="submit" onClick={handler} className={className}>
      {(disabled) && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
      {text}
    </button>
  );
};

export default Button;

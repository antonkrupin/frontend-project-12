import React from 'react';

const ModalButton = (props) => {
  const {
    buttonHandler, buttonText, className, loading,
  } = props;

  return (
    <button type="submit" onClick={buttonHandler} className={className}>
      {(loading) && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
      {buttonText}
    </button>
  );
};

export default ModalButton;

import React from 'react';

const Errors = (props) => {
  const { errorText } = props;
  return (
    <div className="mb-4 text-danger">
      {errorText}
    </div>
  );
};

export default Errors;

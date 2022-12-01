import React from 'react';

const Errors = (props) => {
  const { errorText } = props;
  return (
    <div className="text-danger">
      {errorText}
    </div>
  );
};

export default Errors;

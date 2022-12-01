import React from 'react';
import { Overlay } from 'react-bootstrap';

const ErrorOverlay = (pr) => {
  const { overlayText, overlayRef, show } = pr;
  return (
    <Overlay target={overlayRef.current} show={show} placement="bottom">
      {({
        placement, arrowProps, show: _show, popper, ...props
      }) => (
        <div
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          style={{
            position: 'relative',
            backgroundColor: 'rgba(255, 100, 100, 1)',
            padding: '2px 10px',
            color: 'white',
            borderRadius: 3,
            ...props.style,
          }}
        >
          {overlayText}
        </div>
      )}
    </Overlay>
  );
};

export default ErrorOverlay;

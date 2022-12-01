import { Overlay } from 'react-bootstrap';

const ErrorOverlay = (props) => {
  const {overlayText} = props.overlayText;
  return (
    <Overlay target={props.overlayRef.current} show={props.show} placement="bottom">
      {({
        placement, arrowProps, show: _show, popper, ...props
      }) => (
        <div
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
          {text}
        </div>
      )}
    </Overlay>
  );
};

export default ErrorOverlay;

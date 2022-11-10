import { Modal, Form, InputGroup } from 'react-bootstrap';

import ErrorsDiv from '../errors/ErrorsDiv';

const ModalBody = (props) => {
  const {
    modalType,
    onChange,
    errorText,
    channelName,
    ref,
    bodyText = null,
  } = props;

  switch(modalType) {
    case 'Add': {
      return (
        <Modal.Body>
          <form>
            <input 
              onChange={onChange}
              required
              id="channelName"
              className="form-control"
              defaultValue={channelName}
              ref={ref}
            />
            <ErrorsDiv errorText={errorText}/>
          </form>
        </Modal.Body>
      )
    }
    case 'Rename': {
      return (
        <Modal.Body>
          <form>
            <input 
              onChange={onChange}
              required
              id="channelName"
              className="form-control"
              defaultValue={channelName}
              ref={ref}
            />
            <ErrorsDiv errorText={errorText}/>
          </form>
        </Modal.Body>
      )
    }
    case 'Delete': {
      return (
        <Modal.Body>
          {bodyText}
        </Modal.Body>
      )
    }
    default: {
      throw new Error('Unexpected modal type');
    }
  }
};

export default ModalBody;

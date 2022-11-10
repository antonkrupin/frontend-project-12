import { Modal } from "react-bootstrap";

import CancelButton from '../buttons/CancelButton';
import ModalButtons from '../buttons/ModalButtons';
import ModalButton from '../buttons/ModalButton';

const ModalFooter = (props) => {
  const {
		modalType,
    buttonText,
    buttonAdditionalText,
    buttonHandler,
    status
  } = props;

  return (
    <Modal.Footer className="border-top-0">
      <CancelButton modalType={modalType}/>
      <ModalButtons
				modalType={modalType}
        buttonText={buttonText}
        buttonAdditionalText={buttonAdditionalText}
        buttonHandler={buttonHandler}
        status={status}
      />
			<ModalButton modalType={modalType}/>
    </Modal.Footer>
  )
};

export default ModalFooter;

/*

rename
<Modal.Footer className="border-top-0">
				<CancelButton 
					onClick={cancelRenameChannelHandler}
					text={i18n.t('ui.buttons.cancel')}
				/>
				<ModalButtons
					buttonText={i18n.t('ui.buttons.rename')}
					buttonAdditionalText={i18n.t('ui.buttons.renaming')}
					buttonHandler={renameChannelHandler}
					status={channelStatus}
				/>
			</Modal.Footer>
add
<Modal.Footer className="border-top-0">
				<CancelButton
					onClick={() => dispatch(addChannelModalShow())}
					text={i18n.t('ui.buttons.cancel')}
				/>
				<ModalButtons
					buttonText={i18n.t('ui.buttons.add')}
					buttonAdditionalText={i18n.t('ui.buttons.adding')}
					buttonHandler={addChannelHanlder}
					status={channelStatus}
				/>
			</Modal.Footer>

delete
<Modal.Footer className="border-top-0">
				<CancelButton
					onClick={() => dispatch(deleteChannelModalShow())}
					text={i18n.t('ui.buttons.cancel')}
				/>
				<ModalButtons
					buttonText={i18n.t('ui.buttons.delete')}
					buttonAdditionalText={i18n.t('ui.buttons.deleting')}
					buttonHandler={deleteChannelHandler}
					status={channelStatus}
				/>
			</Modal.Footer>

*/
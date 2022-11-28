import { useSelector } from 'react-redux';

import ModalButton from './ModalButton';

import { fetchChannelStatus } from '../../slices/selectors';

/*
<ModalButtons
					buttonText={i18n.t('ui.buttons.add')}
					buttonAdditionalText={i18n.t('ui.buttons.adding')}
					buttonHandler={addChannelHanlder}
					status={channelStatus}
				/>
*/
const ModalButtons = (props) => {
	const { 
		buttonText,
		buttonAdditionalText,
		buttonHandler,
	} = props;

	const status = useSelector(fetchChannelStatus);

	switch(status) {
		case null: {
			return <ModalButton
							className="btn btn-primary"
							buttonHandler={buttonHandler}
							buttonText={buttonText}
							loading={false}
						/>
		}
		case 'adding': {
			return <ModalButton
							className="btn btn-primary disabled"
							buttonText={buttonAdditionalText}
							loading={true}
						/>
		}
		case 'added': {
			return <ModalButton
							className="btn btn-primary"
							buttonHandler={buttonHandler}
							buttonText={buttonText}
							loading={false}
						/>
		}
		case 'renaming': {
			return <ModalButton
							className="btn btn-primary disabled"
							buttonText={buttonAdditionalText}
							loading={true}
						/>
		}
		case 'renamed': {
			return <ModalButton
							className="btn btn-primary"
							buttonHandler={buttonHandler}
							buttonText={buttonText}
							loading={false}
						/>
		}
		case 'delete': {
			return <ModalButton
							className="btn btn-danger"
							buttonHandler={buttonHandler}
							buttonText={buttonText}
							loading={false}
						/>
		}
		case 'deleting': {
			return <ModalButton
							className="btn btn-danger disabled"
							buttonText={buttonAdditionalText}
							loading={true}
						/>
		}
		case 'deleted': {
			return <ModalButton
							className="btn btn-danger"
							buttonHandler={buttonHandler}
							buttonText={buttonText}
							loading={false}
						/>
		}
		default:
			throw new Error('Unknow status');
	}
};

export default ModalButtons;

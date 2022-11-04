import ModalButton from './ModalButton';


const ModalButtons = (props) => {
	const { 
		buttonText,
		buttonAdditionalText,
		buttonHandler,
		status,
	} = props;

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

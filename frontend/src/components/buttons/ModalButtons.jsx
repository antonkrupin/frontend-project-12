const ModalButtons = (props) => {
	const { 
		buttonText,
		buttonAdditionalText,
		buttonHandler,
		status,
	} = props;

	let button;
	switch(status) {
		case null: {
			button = (
				<button className="btn btn-primary" onClick={buttonHandler}>{buttonText}</button>
			)
			break;
		}
		case 'added': {
			button = (
				<button className="btn btn-primary" onClick={buttonHandler}>{buttonText}</button>
			)
			break;
		}
		case 'renamed': {
			button = (
				<button className="btn btn-primary" onClick={buttonHandler}>{buttonText}</button>
			)
			break;
		}
		case 'deleted': {
			button = (
				<button className="btn btn-danger" onClick={buttonHandler}>{buttonText}</button>
			)
			break;
		}
		case 'adding': {
			button = (
				<button type="submit" className="btn btn-primary disabled">
					<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
					{buttonAdditionalText}
				</button>
			)
			break;
		}
		case 'renaming': {
			button = (
				<button type="submit" className="btn btn-primary disabled">
					<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
					{buttonAdditionalText}
				</button>
			)
			break;
		}
		case 'deleting': {
			button = (
				<button type="submit" className="btn btn-danger disabled">
					<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
					{buttonAdditionalText}
				</button>
			)
			break;
		}
		default:
			throw new Error('Unknow status');
	}
	return button;
};

export default ModalButtons;

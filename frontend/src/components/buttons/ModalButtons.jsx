import ButtonPimary from './ButtonPrimary';
import ButtonDanger from './ButtonDanger';
import ButtonPrimaryDisabled  from './ButtonPrimaryDisabled';
import ButtonDangerDisabled from './ButtonDangerDisabled';


const ModalButtons = (props) => {
	const { 
		buttonText,
		buttonAdditionalText,
		buttonHandler,
		status,
	} = props;

	switch(status) {
		case null: {
			/*button = (
				<button className="btn btn-primary" onClick={buttonHandler}>{buttonText}</button>
			)*/
			return <ButtonPimary buttonHandler={buttonHandler} buttonText={buttonText}/>
			//break;
		}
		case 'added': {
			/*button = (
				<button className="btn btn-primary" onClick={buttonHandler}>{buttonText}</button>
			)*/
			return <ButtonPimary buttonHandler={buttonHandler} buttonText={buttonText}/>
			//break;
		}
		case 'renamed': {
			/*button = (
				<button className="btn btn-primary" onClick={buttonHandler}>{buttonText}</button>
			)
			break;*/
			return <ButtonPimary buttonHandler={buttonHandler} buttonText={buttonText}/>
		}
		case 'deleted': {
			/*button = (
				<button className="btn btn-danger" onClick={buttonHandler}>{buttonText}</button>
			)
			break;*/
			return <ButtonDanger buttonHandler={buttonHandler} buttonText={buttonText}/>
		}
		case 'adding': {
			/*button = (
				<button type="submit" className="btn btn-primary disabled">
					<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
					{buttonAdditionalText}
				</button>
			)
			break;*/
			return <ButtonPrimaryDisabled buttonText={buttonAdditionalText} />
		}
		case 'renaming': {
			/*button = (
				<button type="submit" className="btn btn-primary disabled">
					<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
					{buttonAdditionalText}
				</button>
			)
			break;*/
			return <ButtonPrimaryDisabled buttonText={buttonAdditionalText} />
		}
		case 'deleting': {
			/*button = (
				<button type="submit" className="btn btn-danger disabled">
					<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
					{buttonAdditionalText}
				</button>
			)
			break;*/
			return <ButtonDangerDisabled buttonText={buttonAdditionalText} />
		}
		default:
			throw new Error('Unknow status');
	}
};

export default ModalButtons;

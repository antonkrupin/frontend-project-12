const ButtonPrimary = (props) => {
	const { buttonText, buttonHandler } = props;
	return (
		<button className="btn btn-primary" onClick={buttonHandler}>{buttonText}</button>
	)
};

export default ButtonPrimary;
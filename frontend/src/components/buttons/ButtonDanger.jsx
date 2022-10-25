const ButtonDanger = (props) => {
	const { buttonText, buttonHandler } = props;
	return (
		<button className="btn btn-danger" onClick={buttonHandler}>{buttonText}</button>
	)
};

export default ButtonDanger;
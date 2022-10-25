const ButtonPrimaryDisabled = (props) => {
	const { buttonText } = props;
	return (
		<button type="submit" className="btn btn-primary disabled">
			<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
			{buttonText}
		</button>
	)
};

export default ButtonPrimaryDisabled;
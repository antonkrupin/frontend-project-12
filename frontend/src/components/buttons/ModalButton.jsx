const ModalButton = (props) => {
	const { modalType, buttonHandler, buttonText, className, loading } = props;

	switch(modalType) {
		case 'add': {
			const addChannelHanlder = (e) => {
				e.preventDefault();
				if (!_.includes(channelsNames, name)) {
					dispatch(setChannelStatus('adding'));
					socket.emit('newChannel', { name });
					dispatch(addChannelModalShow());
				} else {
					setError(i18n.t('errors.channels.createChannel'));
				}
			}
			break;
		}
		case 'rename': {
			break;
		}
		case 'delete': {
			break;
		}
		default: {
			throw new Error('Unexpected modal type. Modal buttons');
		}
	}
	
	return (
		<button type="submit" onClick={buttonHandler} className={className}>
      {(loading) && <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></>}
			{buttonText}
		</button>
	)
};

export default ModalButton;

/*
const addChannelHanlder = (e) => {
		e.preventDefault();
		if (!_.includes(channelsNames, name)) {
			dispatch(setChannelStatus('adding'));
			socket.emit('newChannel', { name });
			dispatch(addChannelModalShow());
		} else {
			setError(i18n.t('errors.channels.createChannel'));
		}
	}

	const renameChannelHandler = (e) => {
		e.preventDefault();
		dispatch(setChannelStatus('renaming'));
		if (!_.includes(channelsNames, name)) {
			socket.emit('renameChannel', { id: channel.id, name });
			setChannelName('');
			setError('');
			dispatch(renameChannelModalShow());
		} else {
			dispatch(setChannelStatus(null));
			//const className = cn('form-control', 'is-invalid');
			ref.current.className = changeClassName('form-control is-invalid');
			setError(i18n.t('errors.channels.renameChannel'));
		}
	}

const deleteChannelHandler = (e) => {
		e.preventDefault();
		dispatch(setChannelStatus('deleting'));
		socket.emit('removeChannel', { id: channelId });
		dispatch(deleteMessages({ channelId }));
		dispatch(setActiveChannel(channels[0]));
		dispatch(deleteChannelModalShow());
	}

*/
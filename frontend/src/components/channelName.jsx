import { useSelector } from 'react-redux';

const ChannelName = () => {
	const test = useSelector((state) => state.channels.activeChannel);
	
	let activeChannel;
	if (test.length !== 0) {
		activeChannel = test[0].name;
	} else {
		activeChannel = test.name;
	}
	console.log('active channel', activeChannel);
	const activeChannelMessages = useSelector((state) => state.channels.activeChannelMessages);
	
	let messagesCountBlock;
	if (activeChannelMessages.length === 0) {
		messagesCountBlock = (
			<span className="text-muted">0 сообщений</span>
		);
	}
	return (
		<>
		<p className="m-0"><b># {activeChannel}</b></p>
		{ messagesCountBlock }
		</>
	)
}

export default ChannelName;
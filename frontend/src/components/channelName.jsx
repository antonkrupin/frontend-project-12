import { useSelector } from 'react-redux';

const ChannelName = () => {
	const activeChannel = useSelector((state) => state.channels.activeChannel);

	const messages = useSelector((state) => state.messages.messages);

	const channelMessages = messages[activeChannel.id];

	let messagesCounter;
	
	if (!channelMessages) {
		messagesCounter = (
			<span className="text-muted">0 сообщений</span>
		)
	} else {
		messagesCounter = (
			<span className="text-muted">{ channelMessages.length } сообщений</span>
		)
	}
	
	return (
		<>
		<p className="m-0"><b># {activeChannel.name}</b></p>
			{messagesCounter}
		</>
	)
}

export default ChannelName;
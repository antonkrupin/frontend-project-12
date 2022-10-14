import { useSelector } from 'react-redux';

const ChannelMessages = () => {
	const activeChannel = useSelector((state) => state.channels.activeChannel);

	const messages = useSelector((state) => state.messages.messages);

	const channelMessages = messages[activeChannel.id];

	let renderedMessages;

	if (channelMessages) {
		renderedMessages = (
			<>
			{ channelMessages.map((message, index) => <div key={index} className="text-break mb-2"><b>{message}</b></div>) }
			</>
		)
	}

	return (
		<>
		{renderedMessages}
		</>
	);
}

export default ChannelMessages;

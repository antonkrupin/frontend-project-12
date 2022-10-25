import { useSelector } from 'react-redux';


const ChannelMessages = () => {
	const channelId = useSelector((state) => state.channels.activeChannel.id);

	const messages = useSelector((state) => state.messages.messages);

	const channelMessages = messages.filter((message) => message.channelId === channelId);

	return (
		<>
			{ channelMessages.map((message, index) => <div key={index} className="text-break mb-2"><b>{message.username}: {message.body}</b></div>) }
		</>
	);
}

export default ChannelMessages;

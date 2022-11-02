import { useSelector } from 'react-redux';
import { selectMessagesByChannel } from '../slices/selectors';


const ChannelMessages = () => {
	/*const channelId = useSelector((state) => state.channels.activeChannel.id);

	const messages = useSelector((state) => state.messages.messages);

	const channelMessages = messages.filter((message) => message.channelId === channelId);*/

	const channelMessages = useSelector(selectMessagesByChannel);
	
	return (
		<>
			{ channelMessages.map((message) => 
				<div
					key={message.id}
					className="text-break mb-2">
						<b>{message.username}: {message.body}</b>
				</div>)
			}
		</>
	);
}

export default ChannelMessages;

import { useSelector } from 'react-redux';
import { selectMessagesByChannel } from '../slices/selectors';


const ChannelMessages = () => {
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

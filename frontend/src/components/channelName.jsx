import { useSelector } from 'react-redux';
import i18 from '../asserts/i18';


const ChannelName = () => {
	const activeChannel = useSelector((state) => state.channels.activeChannel);
	
	const messages = useSelector((state) => state.messages.messages);

	const channelMessages = messages.filter((message) => message.channelId === activeChannel.id);

	return (
		<>
		<p className="m-0"><b># {activeChannel.name}</b></p>
			<span className="text-muted">{i18.t('messages.counter.count', {count: channelMessages.length})}</span>
		</>
	)
}

export default ChannelName;
import { useSelector } from 'react-redux';

const ChannelMessages = () => {
	const activeChannel = useSelector((state) => state.channels.activeChannel.name);
	
	const allMessages = useSelector((state) => state.messages.messages);

	const messagesToRender = allMessages.map((elem) => {
		if (elem.channelName === activeChannel) {
			return elem.messages;
		}
	})

	return (
		<>
		{ messagesToRender.flat().map((message, index) => <div key={index} className="text-break mb-2"><b>{message}</b></div>) }
		</>
	)
}

export default ChannelMessages;

//{ channels.map((item) => <li key={item.id} className="nav-item w-100" onClick={getChannelName}><button type="button" className="w-100 rounded-0 text-start btn"><span className="me-1">#</span> {item.name}</button></li> ) }

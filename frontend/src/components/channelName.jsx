import { useSelector } from 'react-redux';

const ChannelName = () => {
	const activeChannel = useSelector((state) => state.channels.activeChannel);
	return (
		<h4>This is channel name {activeChannel}</h4>
	)
}

export default ChannelName;
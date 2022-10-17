import { useSelector } from 'react-redux';

const Channel = (props) => {
	const { channel, onClick } = props;

	const channelId = useSelector((state) => state.channels.activeChannel.id);

	let channelClassName = "w-100 rounded-0 text-start btn";
	if (channelId === channel.id) {
		channelClassName = "w-100 rounded-0 text-start btn btn-secondary";
	}

	let channelItem = (
		<>
			<li className="nav-item w-100" onClick={onClick}>
				<button type="button" className={channelClassName}>
					<span className="me-1">#</span> {channel.name}
				</button>
			</li>
		</>
	)
	if (channel.removable) {
		channelItem = (
			<>
				<li className="nav-item w-100" onClick={onClick}>
					<div role="group" className="d-flex dropdown btn-group">
						<button type="button" className={channelClassName}>
							<span className="me-1">#</span> {channel.name}
						</button>
						<button type="button" id="react-aria6822532583-1" aria-expanded="false" class="flex-grow-0 dropdown-toggle dropdown-toggle-split btn"><span class="visually-hidden">Управление каналом</span></button>
					</div>
				</li>
			</>
		)
	}

	return (
		<>
			{channelItem}
		</>
	)
};

export default Channel;
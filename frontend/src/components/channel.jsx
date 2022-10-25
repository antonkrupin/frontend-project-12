import { useSelector } from 'react-redux';
import cn from 'classnames';

import DropDownMenu from './dropDownMenu';


const Channel = (props) => {
	const { channel, onClick } = props;

	const channelId = useSelector((state) => state.channels.activeChannel.id);

	const isActiveChannel = channelId === channel.id ? true : false;

	const channelNameClass = cn('w-100 rounded-0 text-start btn', {
		'btn-secondary': isActiveChannel,
	});

	const test = cn('w-100 rounded-0 text-start text-truncate', {
		'btn-secondary': isActiveChannel,
	})

	const dropDownClass = cn('flex-grow-0 dropdown-toggle dropdown-toggle-split btn', {
		'btn-secondary': isActiveChannel,
	});

	const dropDownId = `dropDown-${channel.id}`;
	
	let channelItem = (
		<>
			<li className="nav-item w-100" onClick={onClick}>
				<button type="button" className={channelNameClass}>
					<span className="me-1">#</span> {channel.name}
				</button>
			</li>
		</>
	)
	if (channel.removable) {
		channelItem = (
			<>
			<li className="nav-item w-100" >
				<DropDownMenu onClick={onClick} id={channel.id} dropDownId={dropDownId} dropDownClass={dropDownClass} channelNameClass={test} channelName={channel.name}/>
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

import { useSelector } from 'react-redux';
import cn from 'classnames';

import changeClassName from '../asserts/classNames';

import DropDownMenu from './dropDownMenu';


const Channel = (props) => {
	const { channel, onClick } = props;

	const channelId = useSelector((state) => state.channels.activeChannel.id);

	const isActiveChannel = channelId === channel.id ? true : false;

	/*const channelNameClass = cn('w-100 rounded-0 text-start btn', {
		'btn-secondary': isActiveChannel,
	});*/

	//changeClassName1('btn-secondary', isActiveChannel, 'w-100 rounded-0 text-start btn');

	/*const test = cn('w-100 rounded-0 text-start text-truncate', {
		'btn-secondary': isActiveChannel,
	})*/
	//changeClassName('btn-secondary', isActiveChannel, 'w-100 rounded-0 text-start text-truncate');

	/*const dropDownClass = cn('flex-grow-0 dropdown-toggle dropdown-toggle-split btn', {
		'btn-secondary': isActiveChannel,
	});*/
	//changeClassName('btn-secondary', isActiveChannel, 'flex-grow-0 dropdown-toggle dropdown-toggle-split btn')

	const dropDownId = `dropDown-${channel.id}`;
	
	let channelItem = (
		<>
			<li className="nav-item w-100" onClick={onClick}>
				<button type="button" className={changeClassName('btn-secondary', isActiveChannel, 'w-100 rounded-0 text-start btn')}>
					<span className="me-1">#</span> {channel.name}
				</button>
			</li>
		</>
	)
	if (channel.removable) {
		channelItem = (
			<>
			<li className="nav-item w-100" >
				<DropDownMenu 
					onClick={onClick}
					id={channel.id}
					dropDownId={dropDownId}
					dropDownClass={changeClassName('btn-secondary', isActiveChannel, 'flex-grow-0 dropdown-toggle dropdown-toggle-split border-0 btn')}
					channelNameClass={changeClassName('btn-secondary', isActiveChannel, 'w-100 rounded-0 text-start text-truncate border-0 btn')}
					channelName={channel.name}
				/>
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

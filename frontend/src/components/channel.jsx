import { useSelector } from 'react-redux';
import cn from 'classnames';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

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
				{/*<li className="nav-item w-100" onClick={onClick}>
					<div role="group" className="d-flex dropdown btn-group">
						<button type="button" className={channelNameClass}>
							<span className="me-1">#</span> {channel.name}
						</button>
						<button type="button" id={dropDownId} aria-expanded="false" className={dropDownClass}><span className="visually-hidden">Управление каналом</span></button>
						<DropDownMenu dropDownId={dropDownId} dropDownClass={dropDownClass}/>
					</div>
				</li>*/}
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

/*

/*

const BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger'];

function renderDropdownButton(title, i) {
  return (
    <SplitButton
      bsStyle={title.toLowerCase()}
      title={title}
      key={i}
      id={`split-button-basic-${i}`}
    >
      <MenuItem eventKey="1">Action</MenuItem>
      <MenuItem eventKey="2">Another action</MenuItem>
      <MenuItem eventKey="3">Something else here</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4">Separated link</MenuItem>
    </SplitButton>
  );
}

const buttonsInstance = (
  <ButtonToolbar>{BUTTONS.map(renderDropdownButton)}</ButtonToolbar>
);

render(buttonsInstance);

*/

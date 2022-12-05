import React from 'react';
import { useSelector } from 'react-redux';

import changeClassName from '../asserts/classNames';

import DropDownMenu from './dropDownMenu';

import { fetchActiveChannelId } from '../slices/selectors';

const Channel = (props) => {
  const { channel, onClick } = props;

  const channelId = useSelector(fetchActiveChannelId);

  const isActiveChannel = channelId === channel.id;

  const dropDownId = `dropDown-${channel.id}`;
  const dropDownClassName = changeClassName('btn-secondary', isActiveChannel, 'flex-grow-0 dropdown-toggle dropdown-toggle-split border-0 btn');
  const channelClassName = changeClassName('btn-secondary', isActiveChannel, 'w-100 rounded-0 text-start text-truncate border-0 btn');

  // eslint-disable-next-line functional/no-let
  let channelItem = (
    <li className="nav-item w-100">
      <button
        type="button"
        onClick={onClick}
        className={changeClassName('btn-secondary', isActiveChannel, 'w-100 rounded-0 text-start btn')}
      >
        <span className="me-1 text-break"># {channel.name}</span>
      </button>
    </li>
  );
  if (channel.removable) {
    channelItem = (
      <li className="nav-item w-100">
        <DropDownMenu
          onClick={onClick}
          channel={channel}
          dropDownId={dropDownId}
          dropDownClassName={dropDownClassName}
          channelClassName={channelClassName}
        />
      </li>
    );
  }

  return (
    channelItem
  );
};

export default Channel;

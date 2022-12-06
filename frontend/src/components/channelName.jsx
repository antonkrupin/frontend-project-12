import React from 'react';
import { useSelector } from 'react-redux';

import i18 from '../asserts/i18';
import { selectMessagesByChannel } from '../slices/selectors';

const ChannelName = () => {
  const activeChannel = useSelector((state) => state.channels.activeChannel);

  const channelMessages = useSelector(selectMessagesByChannel);

  return (
    <>
      <p className="m-0">
        <b className="text-break">
          #
          {' '}
          {activeChannel.name}
        </b>
      </p>
      <span className="text-muted">{i18.t('messages.counter.count', { count: channelMessages.length })}</span>
    </>
  );
};

export default ChannelName;

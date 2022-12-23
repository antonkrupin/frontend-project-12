import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import i18n from '../../asserts/i18';

import { fetchChannelStatus } from '../../slices/selectors';

const CancelButton = (props) => {
  const { onClick } = props;

  const buttonText = i18n.t('ui.buttons.cancel');

  const channelStatus = useSelector(fetchChannelStatus);

  return (
    <Button variant="secondary" onClick={onClick} disabled={channelStatus === 'processing'}>
      { buttonText }
    </Button>
  );
};

export default CancelButton;

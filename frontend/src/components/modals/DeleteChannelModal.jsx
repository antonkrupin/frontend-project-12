import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';

import i18n from '../../asserts/i18';
import { useSocket } from '../../hooks';

import ModalButtons from '../buttons/ModalButtons';
import CancelButton from '../buttons/CancelButton';

import {
  channelForDeleteId,
  fetchChannels,
  fetchChannelStatus,
} from '../../slices/selectors';

import { deleteMessages } from '../../slices/messagesReducer';
import { deleteChannelModalShow } from '../../slices/modalsReducer';
import { setActiveChannel, setChannelStatus } from '../../slices/channelsReducer';
import { showNotify } from '../notify';

const DeleteChannelModal = () => {
  const dispatch = useDispatch();

  const socket = useSocket();

  const channels = useSelector(fetchChannels);

  const channelId = useSelector(channelForDeleteId);

  const channelStatus = useSelector(fetchChannelStatus);

  const isDeleteChannelModalShow = useSelector((state) => state.modals.isDeleteChannelModalShow);

  const deleteChannelHandler = (e) => {
    e.preventDefault();
    dispatch(setChannelStatus('deleting'));
    socket.emit(
      'removeChannel',
      { id: channelId },
      () => showNotify(i18n.t('ui.toasts.channelDeleted'), dispatch(deleteChannelModalShow())),
    );
    dispatch(deleteMessages({ channelId }));
    dispatch(setActiveChannel(channels[0]));
  };

  return (
    <Modal show={isDeleteChannelModalShow} onHide={() => dispatch(deleteChannelModalShow())}>
      <Modal.Header closeButton>
        <Modal.Title>{i18n.t('ui.modals.delete.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {i18n.t('ui.modals.delete.text')}
      </Modal.Body>
      <Modal.Footer className="border-top-0">
        <CancelButton />
        <ModalButtons
          buttonText={i18n.t('ui.buttons.delete')}
          buttonAdditionalText={i18n.t('ui.buttons.deleting')}
          buttonHandler={deleteChannelHandler}
          status={channelStatus}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannelModal;

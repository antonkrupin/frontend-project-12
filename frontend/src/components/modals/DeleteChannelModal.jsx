import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';

import i18n from '../../asserts/i18';
import { useSocket } from '../../hooks';

import CancelButton from '../buttons/CancelButton';
import Button from '../buttons/Button';

import {
  channelForDeleteId,
  fetchChannels,
  fetchChannelStatus,
  fetchModalType,
} from '../../slices/selectors';

import { deleteMessages } from '../../slices/messagesReducer';
import {
  // deleteChannelModalShow,
  setModalShow,
} from '../../slices/modalsReducer';
import { setActiveChannel, setChannelStatus } from '../../slices/channelsReducer';
import { showNotify } from '../notify';

const DeleteChannelModal = () => {
  const dispatch = useDispatch();

  const socket = useSocket();

  const channels = useSelector(fetchChannels);

  const channelId = useSelector(channelForDeleteId);

  const channelStatus = useSelector(fetchChannelStatus);

  const isDeleteChannelModalShow = useSelector((state) => state.modals.isModalShow);

  const modalType = useSelector(fetchModalType);

  const deleteChannelHandler = (e) => {
    e.preventDefault();
    dispatch(setChannelStatus('deleting'));
    socket.emit(
      'removeChannel',
      { id: channelId },
      () => showNotify(i18n.t('ui.toasts.channelDeleted'), dispatch(setModalShow())),
    );
    dispatch(deleteMessages({ channelId }));
    dispatch(setActiveChannel(channels[0]));
  };

  return modalType === 'delete' && (
    <Modal show={isDeleteChannelModalShow} onHide={() => dispatch(setModalShow())}>
      <Modal.Header closeButton>
        <Modal.Title>{i18n.t('ui.modals.delete.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {i18n.t('ui.modals.delete.text')}
      </Modal.Body>
      <Modal.Footer className="border-top-0">
        <CancelButton />
        {channelStatus === 'deleting'
          ? <Button text={i18n.t('ui.buttons.deleting')} disabled />
          : <Button text={i18n.t('ui.buttons.delete')} handler={deleteChannelHandler} />}
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannelModal;

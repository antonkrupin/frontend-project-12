import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';

import i18n from '../../asserts/i18';
import { useSocket } from '../../hooks';

import CancelButton from '../buttons/CancelButton';
import Button from '../buttons/Button';

import {
  channelForDeleteId,
  // fetchChannels,
  fetchChannelStatus,
  fetchModalType,
  // fetchActiveChannelId,
  fetchIsModalShow,
} from '../../slices/selectors';

import { deleteMessages } from '../../slices/messagesReducer';
import { setModalShow } from '../../slices/modalsReducer';
import {
  // setActiveChannel,
  setChannelStatus,
} from '../../slices/channelsReducer';
import { showNotify } from '../notify';

const DeleteChannelModal = () => {
  const dispatch = useDispatch();

  const socket = useSocket();

  // const channels = useSelector(fetchChannels);

  const channelId = useSelector(channelForDeleteId);

  // const activeChannelId = useSelector(fetchActiveChannelId);

  const channelStatus = useSelector(fetchChannelStatus);

  const isModalShow = useSelector(fetchIsModalShow);

  const modalType = useSelector(fetchModalType);

  const deleteChannelHandler = (e) => {
    e.preventDefault();
    dispatch(setChannelStatus('processing'));
    socket.emit(
      'removeChannel',
      { id: channelId },
      () => {
        dispatch(setModalShow());
        showNotify(i18n.t('ui.toasts.channelDeleted'));
        dispatch(deleteMessages({ channelId }));
        /* if (channelId === activeChannelId) {
          dispatch(setActiveChannel(...channels));
        } */
        // dispatch(setActiveChannel(...channels));
        dispatch(setChannelStatus('processed'));
        /* dispatch(setActiveChannel(...channels)); */
      },
    );
    // dispatch(deleteMessages({ channelId }));
    // dispatch(setActiveChannel(channels[0]));
  };

  const cancelHandler = () => {
    dispatch(setModalShow());
    dispatch(setChannelStatus(null));
  };

  return modalType === 'delete' && (
    <Modal
      show={isModalShow}
      onHide={cancelHandler}
    >
      <Modal.Header closeButton>
        <Modal.Title>{i18n.t('ui.modals.delete.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {i18n.t('ui.modals.delete.text')}
      </Modal.Body>
      <Modal.Footer className="border-top-0">
        <CancelButton onClick={cancelHandler} />
        {channelStatus === 'processing'
          ? <Button text={i18n.t('ui.buttons.deleting')} disabled />
          : <Button text={i18n.t('ui.buttons.delete')} handler={deleteChannelHandler} />}
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannelModal;

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Modal } from 'react-bootstrap';

import i18n from '../../asserts/i18';
import { useSocket } from '../../hooks';
import changeClassName from '../../asserts/classNames';

import ModalButtons from '../buttons/ModalButtons';
import CancelButton from '../buttons/CancelButton';
import ErrorsDiv from '../errors/ErrorsDiv';

import {
  fetchError,
  fetchChannelsNames,
  fetchChannelStatus,
  fetchChannelForRename,
} from '../../slices/selectors';

import { setError } from '../../slices/errorsReducer';
import { renameChannelModalShow } from '../../slices/modalsReducer';
import { setChannelStatus } from '../../slices/channelsReducer';
import { showNotify } from '../notify';

const RenameChannelModal = () => {
  const dispatch = useDispatch();

  const socket = useSocket();

  const inputRef = useRef();

  const channel = useSelector(fetchChannelForRename);

  const channelStatus = useSelector(fetchChannelStatus);

  const channelsNames = useSelector(fetchChannelsNames);

  const isRenameChannelModalShow = useSelector((state) => state.modals.isRenameChannelModalShow);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const renameChannelHandler = (e) => {
    e.preventDefault();
    const name = inputRef.current.value;
    dispatch(setChannelStatus('renaming'));
    if (name !== '') {
      if (!_.includes(channelsNames, name)) {
        socket.emit(
          'renameChannel',
          { id: channel.id, name },
          () => showNotify(i18n.t('ui.toasts.channelRenamed'), dispatch(renameChannelModalShow())),
        );
        dispatch(setError(null));
      } else {
        dispatch(setChannelStatus(null));
        inputRef.current.className = changeClassName('form-control is-invalid');
        dispatch(setError(i18n.t('errors.channels.renameChannel')));
      }
    } else {
      dispatch(setChannelStatus(null));
      inputRef.current.className = changeClassName('form-control is-invalid');
      dispatch(setError(i18n.t('errors.channels.notNull')));
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      renameChannelHandler(e);
    }
  };

  const cancelRenameChannelHandler = () => {
    dispatch(setError(null));
    dispatch(setChannelStatus(null));
    dispatch(renameChannelModalShow());
  };

  return (
    <Modal
      show={isRenameChannelModalShow}
      onHide={cancelRenameChannelHandler}
      onKeyDown={(e) => onKeyDown(e)}
    >
      <Modal.Header closeButton>
        <Modal.Title>{i18n.t('ui.modals.rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <input
            id="channelName"
            className="form-control"
            defaultValue={channel.name}
            ref={inputRef}
            required
          />
          <label className="visually-hidden" htmlFor="channelName">Имя канала</label>
          <ErrorsDiv errorText={useSelector(fetchError)} />
        </form>
      </Modal.Body>
      <Modal.Footer className="border-top-0">
        <CancelButton />
        <ModalButtons
          buttonText={i18n.t('ui.buttons.rename')}
          buttonAdditionalText={i18n.t('ui.buttons.renaming')}
          buttonHandler={renameChannelHandler}
          status={channelStatus}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default RenameChannelModal;

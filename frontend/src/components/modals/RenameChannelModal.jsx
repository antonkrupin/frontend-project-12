/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Modal } from 'react-bootstrap';

import i18n from '../../asserts/i18';
import { useSocket } from '../../hooks';
import changeClassName from '../../asserts/classNames';

import CancelButton from '../buttons/CancelButton';
import ErrorsDiv from '../errors/ErrorsDiv';
import Button from '../buttons/Button';

import {
  fetchChannelsNames,
  fetchChannelStatus,
  fetchChannelForRename,
} from '../../slices/selectors';

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

  const [error, setError] = useState(null);

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
        setError(null);
      } else {
        dispatch(setChannelStatus(null));
        inputRef.current.className = changeClassName('form-control is-invalid');
        setError(i18n.t('errors.channels.renameChannel'));
      }
    } else {
      dispatch(setChannelStatus(null));
      inputRef.current.className = changeClassName('form-control is-invalid');
      setError(i18n.t('errors.channels.notNull'));
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
    setError(null);
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
          <ErrorsDiv errorText={error} />
        </form>
      </Modal.Body>
      <Modal.Footer className="border-top-0">
        <CancelButton />
        {channelStatus === 'renaming'
          ? <Button text={i18n.t('ui.buttons.renaming')} disabled outline />
          : <Button text={i18n.t('ui.buttons.rename')} handler={renameChannelHandler} outline />}
      </Modal.Footer>
    </Modal>
  );
};

export default RenameChannelModal;

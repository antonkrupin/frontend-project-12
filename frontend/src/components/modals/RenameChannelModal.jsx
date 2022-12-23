/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Modal } from 'react-bootstrap';

import i18n from '../../asserts/i18';
import { useSocket } from '../../hooks';

import CancelButton from '../buttons/CancelButton';
import ErrorsDiv from '../errors/ErrorsDiv';
import Button from '../buttons/Button';

import {
  fetchChannelsNames,
  fetchChannelStatus,
  fetchChannelForRename,
  fetchModalType,
  fetchIsModalShow,
} from '../../slices/selectors';

import { setModalShow } from '../../slices/modalsReducer';
import { setChannelStatus } from '../../slices/channelsReducer';
import { showNotify } from '../notify';

const RenameChannelModal = () => {
  const dispatch = useDispatch();

  const socket = useSocket();

  const inputRef = useRef();

  const channel = useSelector(fetchChannelForRename);

  const channelStatus = useSelector(fetchChannelStatus);

  const channelsNames = useSelector(fetchChannelsNames);

  const isModalShow = useSelector(fetchIsModalShow);

  const modalType = useSelector(fetchModalType);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const renameChannelHandler = (e) => {
    e.preventDefault();
    const name = inputRef.current.value;
    dispatch(setChannelStatus('processing'));
    if (name.trim() !== '' && !_.includes(channelsNames, name)) {
      socket.emit(
        'renameChannel',
        { id: channel.id, name: name.trim() },
        () => {
          showNotify(i18n.t('ui.toasts.channelRenamed'));
          dispatch(setModalShow());
          dispatch(setChannelStatus('processed'));
        },
      );
      setError(null);
    } else {
      dispatch(setChannelStatus(null));
      setError(i18n.t('errors.channels.renameChannel'));
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      renameChannelHandler(e);
    }
  };

  const cancelHandler = () => {
    dispatch(setModalShow());
    dispatch(setChannelStatus(null));
    setError(null);
  };

  return modalType === 'rename' && (
    <Modal
      show={isModalShow}
      onHide={cancelHandler}
      onKeyDown={(e) => onKeyDown(e)}
    >
      <Modal.Header closeButton>
        <Modal.Title>{i18n.t('ui.modals.rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <input
            id="channelName"
            className={error ? 'form-control is-invalid' : 'form-control'}
            defaultValue={channel.name}
            ref={inputRef}
            required
          />
          <label className="visually-hidden" htmlFor="channelName">{i18n.t('ui.label.channelName')}</label>
          <ErrorsDiv errorText={error} />
        </form>
      </Modal.Body>
      <Modal.Footer className="border-top-0">
        <CancelButton onClick={cancelHandler} />
        {channelStatus === 'processing'
          ? <Button text={i18n.t('ui.buttons.renaming')} disabled outline />
          : <Button text={i18n.t('ui.buttons.rename')} handler={renameChannelHandler} outline />}
      </Modal.Footer>
    </Modal>
  );
};

export default RenameChannelModal;

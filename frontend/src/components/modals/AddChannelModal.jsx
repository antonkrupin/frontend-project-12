/* eslint-disable jsx-a11y/label-has-associated-control */
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';

import i18n from '../../asserts/i18';
import { useSocket } from '../../hooks';

import CancelButton from '../buttons/CancelButton';
import ErrorsDiv from '../errors/ErrorsDiv';
import changeClassName from '../../asserts/classNames';
import Button from '../buttons/Button';

import {
  fetchChannelsNames,
  fetchChannelStatus,
  fetchModalType,
  fetchIsModalShow,
} from '../../slices/selectors';

import { setChannelStatus, setActiveChannel } from '../../slices/channelsReducer';
import { setModalShow } from '../../slices/modalsReducer';

import { showNotify } from '../notify';

const AddChannelModal = () => {
  const dispatch = useDispatch();

  const socket = useSocket();

  const inputRef = useRef(null);

  const channelsNames = useSelector(fetchChannelsNames);

  const channelStatus = useSelector(fetchChannelStatus);

  const isModalShow = useSelector(fetchIsModalShow);

  const modalType = useSelector(fetchModalType);

  const [error, setError] = useState();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const addChannelHanlder = (e) => {
    e.preventDefault();
    const name = inputRef.current.value;
    if (name.trim() !== '' && !_.includes(channelsNames, name)) {
      dispatch(setChannelStatus('adding'));
      socket.emit(
        'newChannel',
        { name: name.trim() },
        (data) => {
          dispatch(setActiveChannel(data.data));
          dispatch(setModalShow());
          showNotify(i18n.t('ui.toasts.channelCreated'));
          dispatch(setChannelStatus('added'));
        },
      );
      setError(null);
    } else {
      inputRef.current.className = changeClassName('form-control is-invalid');
      setError(i18n.t('errors.channels.createChannel'));
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      addChannelHanlder(e);
      setError(null);
    }
  };

  const cancelHandler = () => {
    dispatch(setModalShow());
    dispatch(setChannelStatus(null));
    setError(null);
  };

  return modalType === 'add' && (
    <Modal
      show={isModalShow}
      onHide={cancelHandler}
      onKeyDown={(e) => onKeyDown(e)}
    >
      <Modal.Header closeButton>
        <Modal.Title>{i18n.t('ui.modals.add.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <input
            id="channelName"
            className="form-control"
            name="channelName"
            ref={inputRef}
          />
          <label className="visually-hidden" htmlFor="channelName">{i18n.t('ui.label.channelName')}</label>
          <ErrorsDiv errorText={error} />
        </form>
      </Modal.Body>
      <Modal.Footer className="border-top-0">
        <CancelButton onClick={cancelHandler} />
        {channelStatus === 'adding'
          ? <Button text={i18n.t('ui.buttons.adding')} disabled outline />
          : <Button text={i18n.t('ui.buttons.add')} handler={addChannelHanlder} outline />}
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannelModal;

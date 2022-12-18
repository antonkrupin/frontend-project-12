/* eslint-disable jsx-a11y/label-has-associated-control */
import _ from 'lodash';
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';

import i18n from '../../asserts/i18';
import { useSocket } from '../../hooks';

import CancelButton from '../buttons/CancelButton';
import ErrorsDiv from '../errors/ErrorsDiv';
import changeClassName from '../../asserts/classNames';
import Button from '../buttons/Button';

import {
  fetchError,
  fetchChannelsNames,
  fetchChannelStatus,
} from '../../slices/selectors';

import { setChannelStatus } from '../../slices/channelsReducer';
import { addChannelModalShow } from '../../slices/modalsReducer';
import { setError } from '../../slices/errorsReducer';

import { showNotify } from '../notify';

const AddChannelModal = () => {
  const socket = useSocket();

  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const channelsNames = useSelector(fetchChannelsNames);

  const channelStatus = useSelector(fetchChannelStatus);

  const isAddChannelModalShow = useSelector((state) => state.modals.isAddChannelModalShow);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const addChannelHanlder = (e) => {
    e.preventDefault();
    const name = inputRef.current.value;
    if (name !== '') {
      if (!_.includes(channelsNames, name)) {
        dispatch(setChannelStatus('adding'));
        socket.emit(
          'newChannel',
          { name },
          () => showNotify(i18n.t('ui.toasts.channelCreated'), dispatch(addChannelModalShow())),
        );
        dispatch(setError(null));
      } else {
        inputRef.current.className = changeClassName('form-control is-invalid');
        dispatch(setError(i18n.t('errors.channels.createChannel')));
      }
    } else {
      inputRef.current.className = changeClassName('form-control is-invalid');
      dispatch(setError(i18n.t('errors.channels.notNull')));
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      addChannelHanlder(e);
    }
  };

  const closeModal = () => {
    dispatch(addChannelModalShow());
    dispatch(setError(null));
  };

  return (
    <Modal
      show={isAddChannelModalShow}
      onHide={closeModal}
      onKeyDown={(e) => onKeyDown(e)}
    >
      <Modal.Header closeButton>
        <Modal.Title>{i18n.t('ui.modals.add.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <label className="visually-hidden" htmlFor="channelName">Имя канала</label>
          <input
            id="channelName"
            className="form-control"
            name="channelName"
            ref={inputRef}
          />
          <ErrorsDiv errorText={useSelector(fetchError)} />
        </form>
      </Modal.Body>
      <Modal.Footer className="border-top-0">
        <CancelButton />
        {channelStatus === 'adding'
          ? <Button text={i18n.t('ui.buttons.adding')} disabled outline />
          : <Button text={i18n.t('ui.buttons.add')} handler={addChannelHanlder} outline />}
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannelModal;

import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';

import i18n from '../asserts/i18';
import { useSocket } from '../hooks';
import IconSendMessage from './svgIcons/IconSendMessage';
import {
  fetchActiveChannelId,
  fetchUserName,
} from '../slices/selectors';

const ChannelWindow = () => {
  const socket = useSocket();

  const channelId = useSelector(fetchActiveChannelId);

  const username = useSelector(fetchUserName);

  const inputRef = useRef(null);

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const messageHandler = (e) => {
    setMessage(filter.clean(e.target.value));
  };

  const addMessageToChannel = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('newMessage', { body: message, channelId, username });
    }
    inputRef.current.value = '';
    setMessage('');
  };

  return (
    <form className="py-1 border rounded-2">
      <div className="input-group">
        <input
          name="body"
          aria-label="Новое сообщение"
          placeholder={i18n.t('ui.text.enterNewMessage')}
          className="border-0 p-0 ps-2 form-control"
          ref={inputRef}
          onChange={messageHandler}
          value={message}
        />
        <button type="submit" className="btn btn-group-vertical border-0" onClick={addMessageToChannel}>
          <IconSendMessage />
        </button>
        <span className="visually-hidden">{i18n.t('ui.span.sendMessage')}</span>
      </div>
    </form>
  );
};

export default ChannelWindow;

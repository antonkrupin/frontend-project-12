import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { useSocket } from '../hooks';
import i18n from '../asserts/i18';
import ChannelsList from '../components/channelsList';
import ChannelName from '../components/channelName';
import ChannelWindow from '../components/channelWindow';
import ChannelMessages from '../components/channelMessages';
import {
  loadingChannelsStatus,
  fetchMessagesStatus,
  fetchChannelsError,
} from '../slices/selectors';

import {
  fetchMessages,
  setUserName,
} from '../slices/messagesReducer';

import { fetchChannels } from '../slices/channelsReducer';

const Chat = () => {
  const dispatch = useDispatch();

  const socket = useSocket();

  const channelsStatus = useSelector(loadingChannelsStatus);

  const messagesStatus = useSelector(fetchMessagesStatus);

  const error = useSelector(fetchChannelsError);

  useEffect(() => {
    const { username } = JSON.parse(localStorage.getItem('userId'));

    dispatch(setUserName(username));
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch, socket]);

  return (
    <>
      {error === 401 && (
      <div className="d-flex align-items-center align-content-center flex-column text-danger m-5">
        <h4>{i18n.t('errors.session.expiredSession')}</h4>
        <h4>{i18n.t('errors.session.relogin')}</h4>
      </div>
      )}
      {(channelsStatus === 'loading' || messagesStatus === 'loading') && (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status" />
          <span className="sr-only text-primary">{i18n.t('ui.text.loading')}</span>
        </div>
      )}
      {(channelsStatus === 'resolved' && messagesStatus === 'resolved') && (
      <>
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
              <ChannelsList />
            </div>
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                  <ChannelName />
                </div>
                <div id="messages-box" className="chat-messages overflow-auto px-5">
                  <ChannelMessages />
                </div>
                <div className="mt-auto px-5 py-3">
                  <ChannelWindow socket={socket} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </>
      )}
    </>
  );
};

export default Chat;

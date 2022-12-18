import { createSelector } from '@reduxjs/toolkit';

export const fetchActiveChannelId = (state) => state.channels.activeChannel.id;

export const channelForDeleteId = (state) => state.channels.channelForDelete.id;

export const fetchChannelForRename = (state) => state.channels.channelForRename;

export const loadingChannelsStatus = (state) => state.channels.loadingChannelsStatus;

export const fetchChannelStatus = (state) => state.channels.channelStatus;

export const fetchChannels = (state) => state.channels.channels;

export const fetchChannelsNames = (state) => state.channels.channels.map(({ name }) => name);

export const fetchMessages = (state) => state.messages.messages;

export const fetchMessagesStatus = (state) => state.messages.messagesStatus;

export const fetchUserName = (state) => state.messages.username;

export const fetchModalType = (state) => state.modals.modalType;

export const fetchError = (state) => state.errors.error;

export const fetchChannelsError = (state) => state.channels.error;

export const fetchStatus = (state) => state.status.status;

export const selectMessagesByChannel = createSelector(
  [fetchMessages, fetchActiveChannelId],
  (messages, channelId) => messages.filter((message) => message.channelId === channelId),
);

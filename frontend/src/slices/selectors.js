import { createSelector } from '@reduxjs/toolkit';

export const channelId = state => state.channels.activeChannel.id;
export const messages = state => state.messages.messages;

export const selectMessagesByChannel = createSelector(
  [messages, channelId],
  (messages, channelId) => messages.filter((message) => message.channelId === channelId),
);

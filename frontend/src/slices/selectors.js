import { createSelector } from '@reduxjs/toolkit';

export const channelId = state => state.channels.activeChannel.id;

export const channelForDeleteId = state => state.channels.channelForDelete.id;

export const fetchChannelForRename = state => state.channels.channelForRename;

export const loadingChannelsStatus = state => state.channels.loadingChannelsStatus;

export const fetchChannelStatus = state => state.channels.channelStatus;

export const fetchChannels = state => state.channels.channels;

export const fetchChannelsNames = state => state.channels.channels.map(({name}) => name);

export const messages = state => state.messages.messages;

export const fetchMessagesStatus = state => state.messages.messagesStatus;

export const modalType = state => state.modals.modalType;

export const fetchError = state => state.errors.error;

/*export const isAddChannelModalShow = state => state.modals.isAddChannelModalShow;
export const isRenameChannelModalShow = state => state.modals.isRenameChannelModalShow;
export const isDeleteChannelModalShow = state => state.modals.isDeleteChannelModalShow;*/

export const selectModal = createSelector(
  [modalType],
  (modalType) => {
    switch(modalType) {
      case 'add': {
        return state => state.modals.isAddChannelModalShow;
      }
      case 'rename': {
        return state => state.modals.isRenameChannelModalShow;
      }
      case 'delete': {
        return state => state.modals.isDeleteChannelModalShow;
      }
      default: {
        throw new Error('Unexpected modal type');
      }
    }
  }
)

export const selectMessagesByChannel = createSelector(
  [messages, channelId],
  (messages, channelId) => messages.filter((message) => message.channelId === channelId),
);

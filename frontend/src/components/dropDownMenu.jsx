import React from 'react';
import { useDispatch } from 'react-redux';

import i18n from '../asserts/i18';

import {
  setChannelStatus,
  channelForRename,
  channelForDelete,
} from '../slices/channelsReducer';
import {
  setModalShow,
  setModalType,
} from '../slices/modalsReducer';

const DropDownMenu = (props) => {
  const {
    channel,
    onClick,
    dropDownId,
    channelClassName,
    dropDownClassName,
  } = props;

  const dispatch = useDispatch();

  const renameChannelHandler = () => {
    dispatch(channelForRename(channel));
    dispatch(setModalType('rename'));
    dispatch(setModalShow());
  };

  const deleteChannelHandler = () => {
    dispatch(channelForDelete(channel));
    dispatch(setChannelStatus('delete'));
    dispatch(setModalType('delete'));
    dispatch(setModalShow());
  };

  return (
    <div className="d-flex border-0 btn-group">
      <button
        type="button"
        onClick={onClick}
        className={channelClassName}
      >
        <span className="me-1 text-wrap text-break">
          #
          {' '}
          {channel.name}
        </span>
      </button>
      <button
        type="button"
        className={dropDownClassName}
        id={dropDownId}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className="visually-hidden">{i18n.t('ui.span.channelManagement')}</span>
      </button>
      <ul className="dropdown-menu">
        <li>
          <button
            type="button"
            onClick={deleteChannelHandler}
            className="dropdown-item"
            href="#"
          >
            {i18n.t('ui.dropDownMenu.delete')}
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={renameChannelHandler}
            className="dropdown-item"
            href="#"
          >
            {i18n.t('ui.dropDownMenu.rename')}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DropDownMenu;

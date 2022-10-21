import { useRef } from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { renameChannelId, deleteChannelId } from '../slices/channelsReducer';
import { renameChannelModalShow, deleteChannelModalShow } from '../slices/modalsReducer';

const DropDownMenu = (props) => {
	const dispatch = useDispatch();

	const renameChannelHandler = () => {
		dispatch(renameChannelId(props.id));
		dispatch(renameChannelModalShow());
	}

	const deleteChannelHandler = () => {
		dispatch(deleteChannelId(props.id));
		dispatch(deleteChannelModalShow());
	}

  return (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button onClick={props.onClick} id={props.dropDownId} className={props.channelNameClass}># {props.channelName}</Button>

      <Dropdown.Toggle split className={props.dropDownClass} id={props.dropDownId} />

      <Dropdown.Menu>
        <Dropdown.Item onClick={deleteChannelHandler} href="#">Удалить</Dropdown.Item>
        <Dropdown.Item onClick={renameChannelHandler} href="#">Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
};

export default DropDownMenu;

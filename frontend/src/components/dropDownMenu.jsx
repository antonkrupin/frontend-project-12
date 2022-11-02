import { useDispatch } from 'react-redux';

import i18n from '../asserts/i18';

import { channelForRename, channelForDelete } from '../slices/channelsReducer';
import { renameChannelModalShow, deleteChannelModalShow } from '../slices/modalsReducer';


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
		dispatch(renameChannelModalShow());
	}

	const deleteChannelHandler = () => {
		dispatch(channelForDelete(channel));
		dispatch(deleteChannelModalShow());
	}

  {/*return (
    <Dropdown as={ButtonGroup} className="d-flex border-0">
      <button onClick={props.onClick} id={props.dropDownId} className={props.channelNameClass}># {props.channelName}</button>

      <Dropdown.Toggle split className={props.dropDownClass} id={props.dropDownId} />

      <Dropdown.Menu>
        <Dropdown.Item onClick={deleteChannelHandler} href="#">{i18n.t('ui.dropDownMenu.delete')}</Dropdown.Item>
        <Dropdown.Item onClick={renameChannelHandler} href="#">{i18n.t('ui.dropDownMenu.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
	)*/}
	{/*return (
		<div className="d-flex border-0 btn-group">
			<button onClick={props.onClick} id={props.dropDownId} className={props.channelNameClass}># {props.channelName}</button>
			<button type="button" className={props.dropDownClass} id={props.dropDownId} data-bs-toggle="dropdown" aria-expanded="false">
				<span className="visually-hidden">Toggle Dropdown</span>
			</button>
			<ul className="dropdown-menu">
				<li><button onClick={deleteChannelHandler} className="dropdown-item" href="#">{i18n.t('ui.dropDownMenu.delete')}</button></li>
				<li><button onClick={renameChannelHandler} className="dropdown-item" href="#">{i18n.t('ui.dropDownMenu.rename')}</button></li>
			</ul>
		</div>
	)*/}
	
	return (
		<div className="d-flex border-0 btn-group">
			<button 
				onClick={onClick}
				id={dropDownId}
				className={channelClassName}>
				# {channel.name}
			</button>
			<button 
				type="button"
				className={dropDownClassName}
				id={dropDownId}
				data-bs-toggle="dropdown"
				aria-expanded="false">
				<span className="visually-hidden">{i18n.t('ui.span.channelManagement')}</span>
			</button>
			<ul className="dropdown-menu">
				<li>
					<button
						onClick={deleteChannelHandler}
						className="dropdown-item"
						href="#">
							{i18n.t('ui.dropDownMenu.delete')}
					</button>
				</li>
				<li>
					<button
						onClick={renameChannelHandler}
						className="dropdown-item"
						href="#">
							{i18n.t('ui.dropDownMenu.rename')}
					</button>
				</li>
			</ul>
		</div>
	)
};

export default DropDownMenu;

/*

<button type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
    <span className="visually-hidden">Toggle Dropdown</span>
  </button>

*/

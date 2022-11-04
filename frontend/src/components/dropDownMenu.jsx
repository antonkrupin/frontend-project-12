import { useDispatch } from 'react-redux';

import i18n from '../asserts/i18';

import { setChannelStatus, channelForRename, channelForDelete } from '../slices/channelsReducer';
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
		dispatch(setChannelStatus('delete'));
		dispatch(deleteChannelModalShow());
	}
	
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

import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';

import i18n from '../asserts/i18';
import IconSendMessage from '../components/svgIcons/IconSendMessage';


const ChannelWindow = (props) => {
	const socket = props.socket;
	
	const channelId = useSelector((state) => state.channels.activeChannel.id);

	const username = useSelector((state) => state.messages.username);
	
	const target = useRef(null);

	const [message, setMessage] = useState('');

	useEffect(() => {
		if (target.current) {
			target.current.focus();
		}
	});

	const messageHandler = (e) => {
		//filter.getDictionary('ru', 'en');
		//filter.loadDictionary('ru', 'en');
		setMessage(filter.clean(e.target.value));
	};
	
	const addMessageToChannel = (e) => {
		e.preventDefault();
		if(message) {
			socket.emit('newMessage', { body: message, channelId, username });
		}
		target.current.value = '';
		setMessage('');
	};

	return (
		<form className="py-1 border rounded-2">
			<div className="input-group">
				<input 
					name="body" 
					aria-label="Новое сообщение" 
					placeholder="Введите сообщение..." 
					className="border-0 p-0 ps-2 form-control"
					ref={target}
					onChange={messageHandler}
					defaultValue={target.current.value}
				/>
				<button type="submit" className="btn btn-group-vertical border-0" onClick={addMessageToChannel}>
					<IconSendMessage />
				</button>
				<span className="visually-hidden">{i18n.t('ui.span.sendMessage')}</span>
			</div>
		</form>
	)
}

export default ChannelWindow;
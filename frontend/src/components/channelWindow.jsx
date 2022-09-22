import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from "../slices/messagesReducer";

const ChannelWindow = () => {
	const dispatch = useDispatch();
	const activeChannelName = useSelector((state) => state.channels.activeChannel.name);
	const messages = useSelector((state) => state.messages.messages);
	/*
	{
		name: 'channelName',
		messages: {
			userName: 'message'
		}
	}
	JSON.parse(localStorage.getItem('messages'))

	const activeChannel = channels.filter((channel) => channel.name === channelName ?? channel);
	*/
	const target = useRef();
	const addMessageToChannel = (e) => {
		e.preventDefault();
		const message = target.current.value;
		dispatch(addMessage({ activeChannelName, message }));
	}

	return (
		<>
			<form className="py-1 border rounded-2">
				<div className="input-group has-validation">
					<input 
						name="body" 
						aria-label="Новое сообщение" 
						placeholder="Введите сообщение..." 
						className="border-1 p-0 ps-2 form-control"
						ref={target}
					/>
					<button type="submit" className="btn btn-group-vertical" onClick={addMessageToChannel}>
					<svg 
						xmlns="http://www.w3.org/2000/svg" 
						viewBox="0 0 16 16" 
						width="20" 
						height="20" 
						fill="currentColor">
							<path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path>
					</svg>
					</button>
					<span className="visually-hidden">Отправить</span>
				</div>
			</form>
		</>
	)
}

export default ChannelWindow;
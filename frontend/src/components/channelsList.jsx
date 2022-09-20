const ChannelsList = () => {
	const channels = JSON.parse(localStorage.getItem('channels'));
	console.log(channels);
	return (
		<>
		<h4>Каналы</h4>
		{ channels.map((item) => <li key={item.id}># {item.name}</li> )}
		</>
	)
}

export default ChannelsList;
const Main = () => {
	const userId = JSON.parse(localStorage.getItem('userId'));
	console.log(userId);
  return <h2>Main page of the App</h2>
}

export default Main;
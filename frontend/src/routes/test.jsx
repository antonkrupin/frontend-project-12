import axios from 'axios';

const Test = () => {
	axios.post('/api/v1/signup', { username: 'newuser', password: '123456' });
	return <h1>Test page</h1>
}

export default Test;
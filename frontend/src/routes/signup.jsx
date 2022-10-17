import { useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';


const SignUp = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	//axios.post('/api/v1/signup', { username: 'newuser', password: '123456' });

	const createNewUser = () => {
		axios.post('/api/v1/signup', { username, password });
		setUsername('');
		setPassword('');
	}

	return (
		<div className="container-fluid h-100">
			<div className="row justify-content-center align-content-center h-100">
				<div className="col-12 col-md-8 col-xxl-6">
					<div className="card shadow-sm">
						<div className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
							{/*<div>
								<img src="/static/media/avatar_1.6084447160acc893a24d.jpg" className="rounded-circle" alt="Регистрация" />
							</div>*/}
							<Form className="w-50">
									<h1 className="text-center mb-4">Регистрация</h1>
									<div className="htmlForm-floating mb-3">
										<input 
											placeholder="От 3 до 20 символов" 
											name="username" 
											autoComplete="username" 
											required="" 
											id="username" 
											className="htmlForm-control"
											onChange={(e) => setUsername(e.target.value)}
										/>
										<label className="htmlForm-label" htmlFor="username">Имя пользователя</label>
										<div placement="right" className="invalid-tooltip">Обязательное поле</div>
									</div>
									<div className="htmlForm-floating mb-3">
										<input 
											placeholder="Не менее 6 символов"
											name="password"
											aria-describedby="passwordHelpBlock"
											required=""
											autoComplete="new-password"
											type="password"
											id="password"
											className="htmlForm-control"
											onChange={(e) => setPassword(e.target.value)}
										/>
										<div className="invalid-tooltip">Обязательное поле</div>
										<label className="htmlForm-label" htmlFor="password">Пароль</label>
									</div>
									<div className="htmlForm-floating mb-4">
										<input placeholder="Пароли должны совпадать" name="confirmPassword" required="" autoComplete="new-password" type="password" id="confirmPassword" className="htmlForm-control" />
										<div className="invalid-tooltip"></div>
										<label className="htmlForm-label" htmlFor="confirmPassword">Подтвердите пароль</label>
									</div>
									<button onClick={createNewUser} type="submit" className="w-100 btn btn-outline-primary">Зарегистрироваться</button>
								</Form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};

export default SignUp;
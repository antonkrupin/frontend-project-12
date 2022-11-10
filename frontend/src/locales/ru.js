// eslint-disable-next-line import/no-anonymous-default-export
export default {
	translation: {
		errors: {
			username: {
				length: 'От 3 до 20 символов',
				required: 'Поле обязательно для заполнения',
				maxLength: 'От 3 до 20 символов',
			},
			password : {
				length: 'Не менее 6 символов',
				required: 'Поле обязательно для заполнения',
				number: 'Пароль должен содержать цифру',
				lowerCaseLetter: 'Пароль должен содеражть букву',
				upperCaseLetter: 'Пароль должен содержать заглавную букву',
			},
			authorization: {
				wrong: 'Неверные имя пользователя или пароль',
				confirmPassword: 'Пароли должны совпадать',
				userExist: 'Такой пользователь уже существует',
			},
			channels: {
				createChannel: 'Имя канала должно быть уникальным',
				renameChannel: 'Имя канала должно быть уникальным',
			}
		},
		messages: {
      counter: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
      reset: 'Сбросить',
    },
		ui: {
			modals: {
				add: {
					title: 'Добавить канал',
				},
				rename: {
					title: 'Переименовать канал',
				},
				delete: {
					title: 'Удалить канал',
					text: 'Уверены ?',
				}
			},
			signupForm: {
				title: 'Регистрация',
				name: 'Имя пользователя',
				password: 'Пароль',
				confirmPassword: 'Подтвердите пароль',
				button: 'Зарегистрироваться',
				buttonClicked: 'Регистрация'
			},
			loginForm: {
				title: 'Войти',
				name: 'Ваш ник',
				password: 'Пароль',
				button: 'Войти',
				buttonClicked: 'Вход',
				newUser: 'Нет аккаунта?',
				registration: 'Регистрация',
			},
			toasts: {
				channelCreated: 'Канал создан',
				channelRenamed: 'Канал переименован',
				channelDeleted: 'Канал удален',
				networkError: 'Ошибка соединения',
			},
			buttons: {
				cancel: 'Отменить',
				delete: 'Удалить',
				deleting: 'Удаление',
				add: 'Отправить',
				adding: 'Создание',
				rename: 'Отправить',
				renaming: 'Переименование',
				login: 'Войти',
				logout: 'Выйти',
				registration: 'Зарегистрироваться',
				registrated: 'Регистрация',
				sendMessage: 'Отправить',
			},
			span: {
				sendMessage: 'Отправить',
				channelManagement: 'Управление каналами',
			},
			dropDownMenu: {
				rename: 'Переименовать',
				delete: 'Удалить',
			},
			chatName: 'Hexlet Chat',
			channels: 'Каналы',
		}
	},
};
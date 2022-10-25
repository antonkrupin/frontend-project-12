// eslint-disable-next-line import/no-anonymous-default-export
export default {
	translation: {
		errors: {
			username: {
				length: 'Имя пользователя меньше 5 знаков',
				required: 'Поле обязательно для заполнения',
				maxLength: 'Имя пользователя не больше 20 знаков',
			},
			password : {
				length: 'Пароль должен быть не меньше 6 знаков',
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
				titles: {
					addChannel: 'Добавить канал',
					renameChannel: 'Переименовать канал',
					deleteChannel: 'Удалить канал',
				}
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
			},
			dropDownMenu: {
				rename: 'Переименовать',
				delete: 'Удалить',
			}
		}
	},
};
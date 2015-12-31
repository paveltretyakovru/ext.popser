'use strict';

import Backbone from 'backbone';
import Home 	from '../routes/home';

import { checkAuth }		from '../libs/functions/checkauth';
import { Auth as authview }	from '../views/auth';

class Desktop extends Backbone.Router {
	
	// Маршруты приложения
	get routes() {
		return {
			''	: 'home'
		}
	}
	
	constructor() {
		super();

		// Проверяем, авторизован ли пользователь
		checkAuth(
			// Если авторизован - инициализируем маршрутизатор
			( response ) => {
				
			} ,
			
			// Иначе рендерим вьюху аутентификации
			( response ) => {
				let AuthView = new authview();
				AuthView.render( response );
			}
		);

		super();
	}

	home() { new Home(); }
}	

export default Desktop;
'use strict';

import Backbone 	from 'backbone';
import Home 		from '../routes/home';
import { checkAuth }from '../modules/functions/checkauth';

class Desktop extends Backbone.Router {
	constructor() {
		super();
		
		// Проверяем авторизован ли пользователь
		checkAuth(
			// Пользователь авторизован
			() => { this.routes = { ''	: 'home' } } ,
			// Пользователь не авторизован
			() => {}
		);

		super();
	}

	home() { new Home(); }
}

export default Desktop;
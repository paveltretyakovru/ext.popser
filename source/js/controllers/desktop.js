'use strict';

import Backbone from 'backbone';
import Home 	from '../routes/home';

import { checkAuth }		from '../libs/functions/checkauth';
import { Auth as authview }	from '../views/auth';

class Desktop extends Backbone.Router {
	constructor() {
		super();

		let AuthView = new authview();

		checkAuth(
			// Пользователь авторизован
			() => { this.routes = { ''	: 'home' } } ,
			// Пользователь не авторизован
			() => { AuthView.render(); }
		);

		super();
	}

	home() { new Home(); }
}	

export default Desktop;
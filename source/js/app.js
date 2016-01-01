'user strict'

import $ 		from 'jquery';
import Backbone from 'backbone';

import FrameworksExtender 	from './modules/frameworks-extender';
import InitChromeSettings 	from './modules/chrome/init-settings';
import checkAuth 			from './modules/user/check-auth';
import initRoutes 			from './routes/init-routes';
import Auth 				from './views/auth';

window.app = {};

// Проверка, авторизован ли пользователь
checkAuth(
	
	( response ) => {
		initRoutes();
	} ,

	( response ) => {
		app.Auth = new Auth( response );
	}

);
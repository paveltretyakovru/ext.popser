'user strict'

import $ 		from 'jquery';
import Backbone from 'backbone';

import FrameworksExtender 	from './modules/frameworks-extender';
import InitChromeSettings 	from './modules/chrome/init-settings';
import checkAuth 			from './modules/user/check-auth';
import Router 				from './router';
import AuthView				from './views/auth';
import compile				from './modules/compile';

window.app 	= {};
app.compile = compile;

function historyStart( response ){
	app.token 	= ( 'token' in response ) ? response.token : '';
	app.Router 	= new Router({ app : app });
	Backbone.history.start({ pushState : false });
}

checkAuth(	
	( response ) => { // был авторизован
		historyStart( response );
		app.Router.navigate( 'home' , true );
	} ,

	( response ) => { // не был авторизован
		historyStart( response );
		app.Auth = new AuthView({ app : app });
	}
);
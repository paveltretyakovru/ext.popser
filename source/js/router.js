'use strict';

import Backbone from 'backbone';

import Home from './views/home';
import Auth from './views/auth';

class Router extends Backbone.Router {

	get routes (){return {
		'home'	: 'Home' ,
		'auth'	: 'Auth'
	};}

	constructor( options ){
		super();

		if ( 'app' in options ){ this.app = options.app; }
	}

	get options(){return {
		app : this.app
	};}

	get Home(){return () => {
		if( 'Home' in this.app ){
			this.app.Home.render();
		} else {
			this.app.Home = new Home({ app : this.app });
		}
	};}

	get Auth(){return () => {
		if( 'Auth' in this.app ){
			this.app.Auth.render();
		} else {
			this.app.Auth = new Auth({ app : this.app });
		}
	};}

}

export default Router;
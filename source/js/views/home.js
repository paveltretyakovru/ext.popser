'use strict';

import Backbone from 'backbone';
import Template from '../../hbs/home.hbs';
import logout 	from '../modules/user/logout';

class Home extends Backbone.View {
	get el()		{ return '#wrapper' }
	get template()	{ return Template; }
	
	get events(){return {
		'click .js-link-logout' : 'userLogout' , // Выход из приложения
	};}

	constructor( options ){
		super();

		if( 'app' in options ){ this.app = options.app; }
		this.render();
	}

	get render(){ return () => {
		document.querySelectorAll(this.el)[0].innerHTML = this.template;
	}}

	get userLogout(){return ( e ) => {
		e.preventDefault();
		logout({ app : this.app });
	};}
}

export default Home;
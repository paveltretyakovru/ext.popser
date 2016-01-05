'use strict';

import Backbone 	from 'backbone';
import Template 	from '../../hbs/home.hbs';
import logout 		from '../modules/user/logout';
import Model		from '../models/Home';
import bodySizeUpd 	from '../modules/bodysize';
import SerialsView	from '../views/serials';
import SerialView 	from '../views/serial';
import template 	from '../modules/template';

class Home extends Backbone.View {
	
	constructor( options ){
		super({
			el 		: '#wrapper' ,
			model 	: new Model() ,
			events 	: { 'click .js-link-logout' : 'userLogout' } , // Выход из приложения
		});

		// Init vars
		this.app 		= options.app;
		this.template 	= template( Template );

		// Draw page
		this.render();
		this.renderSerialsList();

		// Update body sise
		bodySizeUpd();

		// Set listeners
		// Событие отрабатывает, когда в представлении списка сриалов выбирают сериал
		this.listenTo( this.app.Serials , 'serialSelected' , this.serialSelected );
	}

	/**
	 * Рендериг представления страницы
	 */
	render(){
		// Render page
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	}

	/**
	 * Рендеринг представления списка своих сериалов
	 */
	renderSerialsList(){
		this.app.Serials = new SerialsView({ app : this.app });
		this.app.Serials.render();
	}

	userLogout( e ){
		e.preventDefault();
		logout({ app : this.app });
	}

	serialSelected( options ){
		console.log('Serial selected :) ' , options.model.toJSON() );
	}
}

export default Home;
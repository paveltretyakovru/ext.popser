'use strict';

import $ 				from 'jquery';
import _ 				from 'underscore';
import Backbone 		from 'backbone';
import TemplateSerial 	from '../../hbs/serial.hbs';
import template 		from '../modules/template';

class Serial extends Backbone.View{
	constructor( options ){
		super({
			 el 	: '.js-serial' ,
			 events : {
			 	'click .js-show-serial-settings' : 'toggleSerialSettings'
			 }
		});

		this.app 		= options.app;
		this.model 		= this.app.model;
		this.template 	= template( TemplateSerial );
		this.$settings 	= $('.js-serial-settings');
	}

	render( options ){
		this.$el.hide( 300 , () => {
			this.$el.html( this.template( options.model.toJSON() ) );
		
			if( options.model.isNew() ){
				$('.js-serial-settings').css('display' , 'block');
			}

			this.$el.show( 300 );
		});
		return this;
	}

	toggleSerialSettings( e ){
		e.preventDefault();
		console.log('toggleSerialSettings');

		$('.js-serial-settings').toggle(300);
	}
};

export default Serial;
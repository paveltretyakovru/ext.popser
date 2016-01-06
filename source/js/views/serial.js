'use strict';

import $ 				from 'jquery';
import _ 				from 'underscore';
import Backbone 		from 'backbone';
import rivets 			from 'rivets';
import rivets_backbone	from 'rivets-backbone-adapter';
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
		console.log('RIVETS' , rivets);

		this.$el.hide( 300 , () => {
			// this.$el.html( this.template( options.model.toJSON() ) );
		
			this.$el.html( TemplateSerial );

			if( options.model.isNew() ){
				$('.js-serial-settings').css('display' , 'block');
			}

			this.$el.show( 300 );

			this.binding = rivets.bind( this.el , { model : options.model } );
		});
		return this;
	}

	remove(){
		console.log('Remove view');
	}

	toggleSerialSettings( e ){
		e.preventDefault();
		console.log('toggleSerialSettings');

		$('.js-serial-settings').toggle(300);
	}
};

export default Serial;
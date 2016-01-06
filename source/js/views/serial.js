'use strict';

import $ 				from 'jquery';
import _ 				from 'underscore';
import Backbone 		from 'backbone';
import rivets 			from 'rivets';
import rivets_backbone	from 'rivets-backbone-adapter';
import TemplateSerial 	from '../../hbs/serial.hbs';


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
		this.$settings 	= $('.js-serial-settings');
	}

	render( options ){

		this.$el.hide( 300 , () => {
			this.$el.html( TemplateSerial );
			if( options.model.isNew() ){ $('.js-serial-settings').css('display' , 'block'); }
			this.$el.show( 300 );
			this.binding = rivets.bind( this.el , { model : options.model } );
		});
		return this;
	}

	toggleSerialSettings( e ){
		e.preventDefault();
		$('.js-serial-settings').toggle(300);
	}
};

export default Serial;
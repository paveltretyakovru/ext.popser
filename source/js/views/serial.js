'use strict';

import $				from 'jquery';
import jQuery 			from 'jquery';
import _ 				from 'underscore';
import bootstrap 		from 'bootstrap-browserify';
import Backbone 		from 'backbone';
import rivets 			from 'rivets';
import rivets_backbone	from 'rivets-backbone-adapter';
import TemplateSerial 	from '../../hbs/serial.hbs';


class Serial extends Backbone.View{
	constructor( options ){
		super({
			 el 	: '#serial' ,
			 events : {
			 	'click .js-show-serial-settings' : 'toggleSerialSettings'
			 }
		});

		this.app 		= options.app;
		this.model 		= this.app.model;
		this.$settings 	= $('.js-serial-settings');
	}

	render( options ){
		console.log('render serial view');

		this.model = options.model;

		this.$el.hide( 300 , () => {
			this.$el.html( TemplateSerial );
			if( this.model.isNew() ){ $('.js-serial-settings').css('display' , 'block'); }
			this.$el.show( 300 );
			this.binding = rivets.bind( this.el , { model : this.model } );
		});
		return this;
	}

	toggleSerialSettings( e ){
		e.preventDefault();
		$('.js-serial-settings').toggle(300);
	}
};

export default Serial;
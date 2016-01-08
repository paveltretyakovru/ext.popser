'use strict';

import $				from 'jquery';
import jQuery 			from 'jquery';
import _ 				from 'underscore';
import bootstrap 		from 'bootstrap-browserify';
import Backbone 		from 'backbone';
import rivets 			from 'rivets';
import rivets_backbone	from 'rivets-backbone-adapter';
import TemplateSerial 	from '../../hbs/serial.hbs';

// Расширение для риветс - добавляет класс active если модель НЕ новая
rivets.binders.noactive = ( el , value ) => { if( !value ){ $( el ).addClass('active') } }

class Serial extends Backbone.View{
	constructor( options ){
		super({
			 el 	: '#serial' ,
			 events : {
			 	'click .js-show-serial-settings' : 'toggleSerialSettings' ,
			 	'click #button-save-serial-title': 'saveSerial'
			 }
		});

		this.app 		= options.app;
		this.model 		= this.app.model;
		this.$settings 	= $('.js-serial-settings');
	}

	render( options ){
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

	saveSerial( e ){
		//console.log( 'Save serial event' , this.model.toJSON() );
		this.model.save();
	}
};

export default Serial;